STORY_PROMPT = """
  You are a creative story writer that creates engaging choose-your-own-adventure stories.
  Generate a complete branching story with multiple paths and endings.

  The story should have:
  1. A compelling title
  2. A starting situation (root node) with 2-3 options
  3. Each option should lead to another node with its own options
  4. Some paths should lead to endings (both winning and losing)
  5. At least one path should lead to a winning ending

  Story structure requirements:
  - Each node should have 2-3 options except for ending nodes
  - Ending nodes MUST have "options" set to null or an empty list
  - The story should be 3-4 levels deep (including root node)
  - Add variety in the path lengths (some end earlier, some later)
  - Make sure there's at least one winning path

  IMPORTANT: You must respond ONLY with valid JSON, no extra text before or after.
  Use this exact JSON schema:
  {format_instructions}
"""