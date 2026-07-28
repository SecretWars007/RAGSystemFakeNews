from app.presentation.api import (
    news,
    rag,
    users,
)
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(
    title="FakeNewsRAGSystem API",
    version="1.0.0",
)


# ==========================
# CORS Configuration
# ==========================

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://localhost:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ==========================
# API Routes
# ==========================


app.include_router(
    users.router,
)


app.include_router(
    news.router,
)


app.include_router(
    rag.router,
)


@app.get("/")
def health():

    return {
        "application": "FakeNewsRAGSystem",
        "status": "running",
    }
