import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware


# pyrefly: ignore [missing-import]
from core.config import settings

# pyrefly: ignore [missing-import]
from routers.story_routes import router as story_router

# pyrefly: ignore [missing-import]
from routers.job_routes import router as job_router

# pyrefly: ignore [missing-import]
from db.database import create_tables

create_tables()

app = FastAPI(
    title="Story Mode Adventure Game",
    description="An AI-powered adventure game",
    version="0.1.0",
    docs_url="/docs",
    redoc_url="/redoc"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.ALLOWED_ORIGINS,
    allow_methods=["*"],
    allow_headers=["*"],
    allow_credentials=True
)

app.include_router(story_router, prefix=settings.API_PREFIX)

app.include_router(job_router, prefix=settings.API_PREFIX)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)