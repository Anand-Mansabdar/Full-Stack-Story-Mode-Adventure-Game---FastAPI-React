from langchain_core.output_parsers import format_instructions
from sqlalchemy.orm import Session
from typing import List, Dict
from langchain_groq import ChatGroq
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import PydanticOutputParser
from dotenv import load_dotenv
import time

load_dotenv()

# pyrefly: ignore [missing-import]
from core.models import StoryNodeLLM

# pyrefly: ignore [missing-import]
from core.config import settings

# pyrefly: ignore [missing-import]
from core.models import StoryLLMResponse

# pyrefly: ignore [missing-import]
from core.prompts import STORY_PROMPT

# pyrefly: ignore [missing-import]
from models.story_model import Story

# pyrefly: ignore [missing-import]
from models.story_model import StoryNode

class StoryGenerator:

  @classmethod
  def _get_llm(cls):
    return ChatGroq(
      model="llama-3.3-70b-versatile",
      temperature=0,
      max_retries=2
    )
  
  @classmethod
  def generate_story(cls, db: Session, session_id: str, theme: str = "fantasy") -> Story:
    llm = cls._get_llm()
    story_parser = PydanticOutputParser(pydantic_object=StoryLLMResponse)
    prompt = ChatPromptTemplate.from_messages(
      [
        ("system", STORY_PROMPT),
        ("human", f"Create the story with this theme: {theme}")
      ]
    ).partial(format_instructions=story_parser.get_format_instructions())


    # Retry logic: attempt up to 3 times to get a valid response
    last_error = None
    for attempt in range(3):
      try:
        raw_response = llm.invoke(prompt.invoke({}))

        response_text = raw_response

        if hasattr(raw_response, "content"):
          response_text = raw_response.content

        if not response_text or response_text.strip() == "":
          raise ValueError(f"LLM returned empty response on attempt {attempt + 1}")

        story_structure = story_parser.parse(response_text)
        break  # Success - exit retry loop
      except Exception as e:
        last_error = e
        print(f"Attempt {attempt + 1} failed: {e}")
        if attempt < 2:
          time.sleep(2)  # Brief delay before retry
        continue
    else:
      # All retries exhausted
      raise RuntimeError(f"Failed to generate story after 3 attempts. Last error: {last_error}")

    story_db = Story(title=story_structure.title, session_id=session_id)
    db.add(story_db)
    db.flush()

    root_node_data = story_structure.rootNode

    if isinstance(root_node_data, dict):
      root_node_data = StoryNodeLLM.model_validate(root_node_data)

    cls._process_story_node(db, story_db.id, root_node_data, is_root=True)
    
    db.commit()
    return story_db

  
  @classmethod
  def _process_story_node(cls, db: Session, story_id: int, node_data:StoryNodeLLM, is_root: bool = False) -> StoryNode:
    node = StoryNode(
      story_id = story_id, 
      content = node_data.content if hasattr(node_data, "content") else node_data["content"],
      is_root = is_root,
      is_ending = node_data.isEnding if hasattr(node_data, "isEnding") else node_data["isEnding"],
      is_winning_ending = node_data.isWinningNode if hasattr(node_data, "isWinningNode") else node_data["isWinningNode"],
      options = []
    )

    db.add(node)
    db.flush()

    if not node.is_ending and (hasattr(node_data, "options") and node_data.options):
      options_list = []
      for option_data in node_data.options:
        next_node = option_data.nextNode
        if isinstance(next_node, dict):
          next_node = StoryNodeLLM.model_validate(next_node)
        
        child_node = cls._process_story_node(db, story_id, next_node, is_root=False)
        options_list.append({
          "text": option_data.text,
          "node_id": child_node.id
        })
      
      node.options = options_list
    
    db.flush()
    return node