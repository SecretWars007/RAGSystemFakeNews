from app.infrastructure.database.connection import engine
from app.presentation.api import news, users
from fastapi import FastAPI

app = FastAPI(title="FakeNewsRAGSystem API", version="1.0.0")

app.include_router(users.router)
app.include_router(news.router)


@app.get("/")
def health():

    return {"application": "FakeNewsRAGSystem", "status": "running"}
