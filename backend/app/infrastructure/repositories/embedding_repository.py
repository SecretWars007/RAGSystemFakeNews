from uuid import UUID

from app.domain.entities.embedding import Embedding
from app.domain.repositories.embedding_repository import (
    IEmbeddingRepository,
)
from app.infrastructure.models.embedding_model import (
    EmbeddingModel,
)
from sqlalchemy.orm import Session


class PostgresEmbeddingRepository(IEmbeddingRepository):
    """
    Implementación PostgreSQL del repositorio
    de embeddings.

    Responsabilidades:

    - Persistir vectores.
    - Consultar embeddings por noticia.
    - Buscar embeddings similares.

    No recupera noticias para RAG.
    Esa responsabilidad pertenece a:

    PostgresRetrieverRepository
    """

    def __init__(
        self,
        session: Session,
    ):
        self.session = session

    def create(
        self,
        embedding: Embedding,
    ) -> Embedding:
        """
        Guarda un embedding.
        """

        model = EmbeddingModel(
            id=embedding.id,
            news_id=embedding.news_id,
            provider=embedding.provider,
            model=embedding.model,
            dimensions=embedding.dimensions,
            vector=embedding.vector,
            created_at=embedding.created_at,
        )

        self.session.add(model)

        self.session.commit()

        self.session.refresh(model)

        return Embedding(
            id=model.id,
            news_id=model.news_id,
            provider=model.provider,
            model=model.model,
            dimensions=model.dimensions,
            vector=model.vector,
            created_at=model.created_at,
        )

    def get_by_news_id(
        self,
        news_id: UUID,
    ) -> Embedding | None:
        """
        Obtiene el embedding asociado
        a una noticia.
        """

        model = (
            self.session.query(EmbeddingModel)
            .filter(EmbeddingModel.news_id == news_id)
            .first()
        )

        if model is None:
            return None

        return Embedding(
            id=model.id,
            news_id=model.news_id,
            provider=model.provider,
            model=model.model,
            dimensions=model.dimensions,
            vector=model.vector,
            created_at=model.created_at,
        )

    def search_similar(
        self,
        vector: list[float],
        provider: str,
        model: str,
        limit: int = 5,
    ) -> list[Embedding]:
        """
        Busca embeddings similares.

        Nota:
        Este método retorna embeddings.

        Para recuperar noticias completas
        utilizar:

        PostgresRetrieverRepository
        """

        if limit <= 0:
            limit = 5

        if limit > 50:
            limit = 50

        models = (
            self.session.query(EmbeddingModel)
            .filter(
                EmbeddingModel.provider == provider,
                EmbeddingModel.model == model,
            )
            .order_by(EmbeddingModel.vector.cosine_distance(vector))
            .limit(limit)
            .all()
        )

        return [
            Embedding(
                id=item.id,
                news_id=item.news_id,
                provider=item.provider,
                model=item.model,
                dimensions=item.dimensions,
                vector=item.vector,
                created_at=item.created_at,
            )
            for item in models
        ]
