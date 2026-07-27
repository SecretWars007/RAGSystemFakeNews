from datetime import datetime
from uuid import uuid4

from app.application.services.embedding_service import (
    EmbeddingService,
)
from app.domain.entities.embedding import (
    Embedding,
)

from tests.fakes.fake_embedding_repository import (
    FakeEmbeddingRepository,
)


def create_embedding() -> Embedding:

    return Embedding(
        id=uuid4(),
        news_id=uuid4(),
        provider="gemini",
        model="models/gemini-embedding-001",
        dimensions=3,
        vector=[
            0.1,
            0.2,
            0.3,
        ],
        created_at=datetime.now(),
    )


def test_save_embedding():

    repository = FakeEmbeddingRepository()

    service = EmbeddingService(repository)

    embedding = create_embedding()

    result = service.save(embedding)

    assert result == embedding

    assert len(repository.embeddings) == 1


def test_get_embedding_by_news():

    repository = FakeEmbeddingRepository()

    service = EmbeddingService(repository)

    embedding = create_embedding()

    service.save(embedding)

    result = service.get_by_news(embedding.news_id)

    assert result == embedding


def test_search_embeddings_limit():

    repository = FakeEmbeddingRepository()

    service = EmbeddingService(repository)

    result = service.search_embeddings(
        vector=[0.1, 0.2, 0.3],
        provider="gemini",
        model="models/gemini-embedding-001",
        limit=0,
    )

    assert result == []
