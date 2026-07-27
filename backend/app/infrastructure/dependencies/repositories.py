from app.infrastructure.dependencies.database import (
    get_database_session,
)
from app.infrastructure.repositories.embedding_repository import (
    PostgresEmbeddingRepository,
)
from app.infrastructure.repositories.postgres_history_repository import (
    PostgresHistoryRepository,
)
from app.infrastructure.repositories.postgres_news_repository import (
    PostgresNewsRepository,
)
from app.infrastructure.repositories.postgres_retriever_repository import (
    PostgresRetrieverRepository,
)
from app.infrastructure.repositories.postgres_user_repository import (
    PostgresUserRepository,
)
from fastapi import Depends
from sqlalchemy.orm import Session


def get_user_repository(
    session: Session = Depends(get_database_session),
) -> PostgresUserRepository:
    """
    Dependency para repositorio de usuarios.
    """

    return PostgresUserRepository(session)


def get_news_repository(
    session: Session = Depends(get_database_session),
) -> PostgresNewsRepository:
    """
    Dependency para repositorio de noticias.
    """

    return PostgresNewsRepository(session)


def get_history_repository(
    session: Session = Depends(get_database_session),
) -> PostgresHistoryRepository:
    """
    Dependency para historial RAG.
    """

    return PostgresHistoryRepository(session)


def get_embedding_repository(
    session: Session = Depends(get_database_session),
) -> PostgresEmbeddingRepository:
    """
    Dependency para almacenamiento
    de embeddings.
    """

    return PostgresEmbeddingRepository(session)


def get_retriever_repository(
    session: Session = Depends(get_database_session),
) -> PostgresRetrieverRepository:
    """
    Dependency para recuperación semántica RAG.

    Utiliza:
    PostgreSQL + pgvector

    Retorna:
    Noticias similares.
    """

    return PostgresRetrieverRepository(session)
