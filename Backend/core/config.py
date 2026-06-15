from typing import List
from dotenv import load_dotenv
from pydantic import field_validator
from pydantic_settings import BaseSettings

load_dotenv()

class Settings(BaseSettings):
  API_PREFIX: str = "/api"

  DEBUG: bool = False

  DATABASE_URL: str

  ALLOWED_ORIGINS: str = ""

  GROQ_API_KEY: str

  @field_validator("ALLOWED_ORIGINS")
  def parse_allowed_origins(cls, origin: str) -> List[str]:
    return origin.split(",") if origin else []

  class Config:
    env_file = ".env"
    env_file_encoding = "utf-8"
    case_sensitive = True


settings = Settings()