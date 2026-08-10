from app.domain.entities.news import News
from app.domain.repositories.retriever_repository import (
    IRetrieverRepository,
)
from app.infrastructure.models.embedding_model import EmbeddingModel
from app.infrastructure.models.knowledge_document_model import (
    KnowledgeDocumentEmbeddingModel,
    KnowledgeDocumentModel,
)
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

        distance = EmbeddingModel.vector.cosine_distance(vector)

        news_results = (
            self.session.query(NewsModel, distance.label("distance"))
            .join(
                EmbeddingModel,
                EmbeddingModel.news_id == NewsModel.id,
            )
            .filter(
                EmbeddingModel.provider == provider,
                EmbeddingModel.model == model,
            )
            .order_by(distance)
            .limit(limit)
            .all()
        )

        knowledge_distance = KnowledgeDocumentEmbeddingModel.vector.cosine_distance(vector)
        knowledge_results = (
            self.session.query(KnowledgeDocumentModel, knowledge_distance.label("distance"))
            .join(
                KnowledgeDocumentEmbeddingModel,
                KnowledgeDocumentEmbeddingModel.document_id == KnowledgeDocumentModel.id,
            )
            .filter(
                KnowledgeDocumentEmbeddingModel.provider == provider,
                KnowledgeDocumentEmbeddingModel.model == model,
                KnowledgeDocumentModel.validation_status.in_(["ingested", "approved"]),
            )
            .order_by(knowledge_distance)
            .limit(limit)
            .all()
        )

        retrieved_news = [
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
                similarity=max(0.0, min(1.0, 1.0 - float(distance))),
            )
            for news, distance in news_results
        ]

        retrieved_documents = [
            News(
                id=document.id,
                title=document.title,
                content=document.content,
                source="trusted_knowledge",
                url=document.canonical_url,
                published_at=document.published_at,
                created_at=document.fetched_at,
                similarity=max(0.0, min(1.0, 1.0 - float(distance))),
            )
            for document, distance in knowledge_results
        ]

        return sorted(
            [*retrieved_news, *retrieved_documents],
            key=lambda item: item.similarity or 0.0,
            reverse=True,
        )[:limit]
