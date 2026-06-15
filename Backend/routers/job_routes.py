from uuid import uuid4
from typing import Optional
from fastapi import APIRouter, Depends, HTTPException, Cookie
from sqlalchemy.orm import Session

# pyrefly: ignore [missing-import]
from db.database import get_db
# pyrefly: ignore [missing-import]
from models.job_model import StoryJob
# pyrefly: ignore [missing-import]
from schemas.job_schemas import StoryJobResponse


router = APIRouter(
  prefix="/jobs",
  tags=["jobs"]
)

def get_session_id(session_id: Optional[str] = Cookie(None)):
  if not session_id:
    session_id = str(uuid4())
  
  return session_id

@router.get("/{job_id}", response_model=StoryJobResponse)
def get_job_status(
  job_id: str,
  db: Session = Depends(get_db)
):
  job = db.query(StoryJob).filter(StoryJob.job_id == job_id).first()
  if not job:
    raise HTTPException(status_code=404, detail="Job not found")
  
  return job