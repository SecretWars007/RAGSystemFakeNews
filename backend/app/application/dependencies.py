from app.application.services.auth_service import (
    AuthService,
)
from app.application.services.embedding_service import (
    EmbeddingService,
)
from app.application.services.rag_service import (
    RAGService,
)
from app.application.services.trusted_source_service import TrustedSourceService
from app.application.use_cases.create_news import (
    CreateNewsUseCase,
)
from app.domain.repositories.embedding_repository import (
    IEmbeddingRepository,
)
from app.domain.repositories.news_repository import (
    INewsRepository,
)
from app.domain.repositories.retriever_repository import (
    IRetrieverRepository,
)
from app.domain.repositories.user_repository import (
    IUserRepository,
)
from app.domain.repositories.trusted_source_repository import ITrustedSourceRepository
from app.infrastructure.dependencies.repositories import (
    get_embedding_repository,
    get_news_repository,
    get_retriever_repository,
    get_user_repository,
    get_trusted_source_repository,
)
from fastapi import Depends

# ============================
# News
# ============================


def get_create_news_use_case(
    repository: INewsRepository = Depends(
        get_news_repository,
    ),
):

    return CreateNewsUseCase(repository)


# ============================
# News Service
# ============================


from app.application.services.news_service import (
    NewsService,
)


def get_news_service(
    repository: INewsRepository = Depends(
        get_news_repository,
    ),
) -> NewsService:
    """
    Dependency para operaciones CRUD
    de noticias.
    """

    return NewsService(repository)


# ============================
# Authentication
# ============================


def get_auth_service(
    repository: IUserRepository = Depends(
        get_user_repository,
    ),
):

    return AuthService(repository)


# ============================
# Embeddings
# ============================


def get_embedding_service(
    repository: IEmbeddingRepository = Depends(
        get_embedding_repository,
    ),
):

    return EmbeddingService(repository)


# ============================
# RAG
# ============================


def get_rag_service(
    retriever_repository: IRetrieverRepository = Depends(
        get_retriever_repository,
    ),
):

    return RAGService(
        retriever_repository=retriever_repository,
    )


def get_trusted_source_service(
    repository: ITrustedSourceRepository = Depends(get_trusted_source_repository),
) -> TrustedSourceService:
    return TrustedSourceService(repository)
