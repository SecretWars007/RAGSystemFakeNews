from uuid import UUID

from fastapi import APIRouter, Depends, HTTPException

from app.application.services.news_service import (
    NewsService,
)

from app.application.dependencies import (
    get_news_service,
)

from app.infrastructure.agents.graph import (
    create_news_rag_graph,
)


router = APIRouter(
    prefix="/rag",
    tags=["RAG"],
)


@router.post(
    "/analyze/{news_id}",
)
def analyze_news(
    news_id: UUID,
    service: NewsService = Depends(
        get_news_service,
    ),
):

    news = service.get_by_id(news_id)

    if news is None:
        raise HTTPException(
            status_code=404,
            detail="News not found",
        )

    rag_graph = create_news_rag_graph()

    result = rag_graph.invoke(
        {
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
    )

    return {
        "news_id": str(news.id),
        "status": result.get("status"),
        "analysis": result.get("analysis"),
        "score": result.get("score"),
    }
