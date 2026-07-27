from uuid import UUID

from app.application.dependencies import (
    get_news_service,
)
from app.application.services.news_service import (
    NewsService,
)

from app.infrastructure.agents.graph import (
    create_news_rag_graph,
)

from app.infrastructure.agents.state import (
    NewsRAGState,
)

from fastapi import (
    APIRouter,
    Depends,
    HTTPException,
    status,
)


router = APIRouter(
    prefix="/rag",
    tags=["RAG"],
)


@router.post(
    "/analyze/{news_id}",
    status_code=status.HTTP_200_OK,
)
def analyze_news(
    news_id: UUID,
    service: NewsService = Depends(
        get_news_service,
    ),
):
    """
    Analiza una noticia utilizando el motor RAG.

    Flujo:

    PostgreSQL
        |
        v
    NewsService
        |
        v
    LangGraph
        |
        +--> Gemini Embedding
        |
        +--> pgvector Retrieval
        |
        +--> Gemini LLM
        |
        v
    Resultado
    """

    news = service.get_by_id(
        news_id,
    )

    if news is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="News not found",
        )

    rag_graph = create_news_rag_graph()

    initial_state: NewsRAGState = {
        "news_id": news.id,
        "title": news.title,
        "content": news.content,
        "source": news.source,
        "provider": "google",
        "model": "models/gemini-embedding-001",
        "embedding": [],
        "similar_news": [],
        "analysis": "",
        "score": 0.0,
        "status": "started",
    }

    result = rag_graph.invoke(
        initial_state,
    )

    return {
        "news_id": str(news.id),
        "status": result.get(
            "status",
        ),
        "analysis": result.get(
            "analysis",
        ),
        "score": result.get(
            "score",
        ),
    }
