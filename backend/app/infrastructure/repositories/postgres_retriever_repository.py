from app.domain.entities.news import News
from app.domain.repositories.retriever_repository import (
    IRetrieverRepository,
)
from app.infrastructure.models.embedding_model import EmbeddingModel
from app.infrastructure.models.news_model import NewsModel
from sqlalchemy.orm import Session


class PostgresRetrieverRepository(IRetrieverRepository):
    """
    Implementación PostgreSQL + pgvector
    para recuperación semántica RAG.
    """

    def __init__(
        self,
        session: Session,
    ):
        self.session = session

    def retrieve(
        self,
        vector: list[float],
        provider: str,
        model: str,
        limit: int = 5,
    ) -> list[News]:

        results = (
            self.session.query(NewsModel)
            .join(
                EmbeddingModel,
                EmbeddingModel.news_id == NewsModel.id,
            )
            .filter(
                EmbeddingModel.provider == provider,
                EmbeddingModel.model == model,
            )
            .order_by(EmbeddingModel.vector.cosine_distance(vector))
            .limit(limit)
            .all()
        )

        return [
            News(
                id=news.id,
                title=news.title,
                content=news.content,
                source=news.source,
                author=news.author,
                url=news.url,
                language=news.language,
                country=news.country,
                published_at=news.published_at,
                is_fake=news.is_fake,
                created_at=news.created_at,
                updated_at=news.updated_at,
            )
            for news in results
        ]
