from uuid import UUID
import json
from hashlib import sha256

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
from app.presentation.schemas.rag_schema import RagQueryRequest
from app.infrastructure.database.session import get_db
from app.infrastructure.models.refresh_request_model import RefreshRequestModel

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
from sqlalchemy.exc import IntegrityError
from sqlalchemy.orm import Session


def _response_from_result(result: NewsRAGState, news_id: str | None = None) -> dict:
    analysis = result.get("analysis", "")
    details: dict = {}
    try:
        details = json.loads(analysis)
    except (TypeError, json.JSONDecodeError):
        pass

    return {
        "news_id": news_id,
        "status": result.get("status"),
        "analysis": analysis,
        "score": result.get("score"),
        "label": details.get("label"),
        "reason": details.get("reason"),
        "evidence": details.get("evidence", []),
        "decision_source": details.get("decision_source"),
        "similar_news": [
            {"id": str(item.id), "title": item.title, "source": item.source, "url": item.url, "similarity": item.similarity}
            for item in result.get("relevant_news", [])
        ],
    }


@router.post("/analyze")
def analyze_query(data: RagQueryRequest, session: Session = Depends(get_db)):
    """Analyzes a free-text claim without persisting it as a news article."""
    query = data.query.strip()
    graph = create_news_rag_graph()
    result = graph.invoke({
        "news_id": None,
        "title": query[:500],
        "content": query,
        "source": "user_query",
        "provider": "google",
        "model": "models/gemini-embedding-001",
        "embedding": [],
        "similar_news": [],
        "analysis": "",
        "score": 0.0,
        "status": "started",
        "persist_embedding": False,
    })
    response = _response_from_result(result)
    if response.get("label") == "UNVERIFIED":
        try:
            session.add(RefreshRequestModel(
                query_hash=sha256(query.casefold().encode("utf-8")).hexdigest(),
                query=query,
            ))
            session.commit()
            response["knowledge_refresh"] = "queued"
        except IntegrityError:
            session.rollback()
            response["knowledge_refresh"] = "already_queued"
    return response


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

    return _response_from_result(result, news_id=str(news.id))
