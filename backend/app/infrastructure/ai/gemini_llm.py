from app.core.config import settings
from langchain_google_genai import ChatGoogleGenerativeAI


def get_llm():

    llm = ChatGoogleGenerativeAI(
        model="gemini-1.5-flash",
        google_api_key=settings.GOOGLE_API_KEY,
        temperature=0.0,
    )

    return llm
