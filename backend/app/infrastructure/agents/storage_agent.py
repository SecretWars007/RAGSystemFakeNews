from datetime import datetime
from uuid import uuid4

from app.application.services.embedding_service import (
    EmbeddingService,
)
from app.domain.entities.embedding import (
    Embedding,
)
from app.infrastructure.agents.state import (
    NewsRAGState,
)
from app.infrastructure.dependencies.agent_dependencies import (
    get_agent_embedding_repository,
)


def save_embedding(
    state: NewsRAGState,
) -> NewsRAGState:
    """
    Guarda el embedding generado por Gemini
    en PostgreSQL + pgvector.
    """

    vector = state.get("embedding")

    news_id = state.get("news_id")

    provider = state.get("provider")

    model = state.get("model")

    if vector is None:
        raise ValueError("No existe embedding generado")

    if news_id is None or not state.get("persist_embedding", True):
        return state

    if not provider:
        raise ValueError("provider es obligatorio")

    if not model:
        raise ValueError("model es obligatorio")

    repository = get_agent_embedding_repository()

    service = EmbeddingService(repository)

    embedding = Embedding(
        id=uuid4(),
        news_id=news_id,
        provider=provider,
        model=model,
        dimensions=len(vector),
        vector=vector,
        created_at=datetime.utcnow(),
    )

    service.save_if_not_exists(embedding)

    # Preserve the decision made by the evidence gate or analyzer. Persisting an
    # embedding is a side effect, not the user-facing result of the analysis.
    if state.get("status") not in {"insufficient_evidence", "completed"}:
        state["status"] = "embedding_stored"

    return state
