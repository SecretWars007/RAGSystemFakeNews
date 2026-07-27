from app.core.config import settings
from langchain_google_genai import ChatGoogleGenerativeAI


def get_llm():

    return ChatGoogleGenerativeAI(
        model="gemini-2.5-flash",
        google_api_key=settings.GOOGLE_API_KEY,
        temperature=0,
    )
