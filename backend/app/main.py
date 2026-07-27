from app.presentation.api import (
    news,
    rag,
    users,
)
from fastapi import FastAPI

app = FastAPI(
    title="FakeNewsRAGSystem API",
    version="1.0.0",
)


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
