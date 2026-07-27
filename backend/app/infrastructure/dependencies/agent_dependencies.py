from app.infrastructure.database.session import (
    SessionLocal,
)

from app.infrastructure.repositories.embedding_repository import (
    PostgresEmbeddingRepository,
)

from app.infrastructure.repositories.postgres_retriever_repository import (
    PostgresRetrieverRepository,
)


def get_agent_embedding_repository() -> PostgresEmbeddingRepository:
    """
    Dependency para agentes LangGraph.

    Crea una sesión independiente porque
    LangGraph no utiliza FastAPI Depends().
    """

    session = SessionLocal()

    return PostgresEmbeddingRepository(session)


def get_agent_retriever_repository() -> PostgresRetrieverRepository:
    """
    Dependency para recuperación vectorial
    dentro del flujo RAG.
    """

    session = SessionLocal()

    return PostgresRetrieverRepository(session)
