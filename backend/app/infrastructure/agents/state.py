from typing import Any, TypedDict
from uuid import UUID


class NewsRAGState(TypedDict, total=False):
    """
    Estado compartido del flujo RAG utilizando agentes.

    Este objeto viaja entre:

    - news_agent
    - embedding_agent
    - retriever_agent
    - analyzer_agent
    - storage_agent


    Los campos son opcionales porque LangGraph
    construye el estado progresivamente.
    """

    news_id: UUID | None

    title: str

    content: str

    source: str

    provider: str

    model: str

    embedding: list[float]

    similar_news: list[Any]

    analysis: str

    score: float

    status: str
