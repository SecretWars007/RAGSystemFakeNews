from uuid import UUID

from app.domain.entities.news import News
from app.domain.repositories.news_repository import INewsRepository
from app.infrastructure.models.news_model import NewsModel
from sqlalchemy.orm import Session


class PostgresNewsRepository(INewsRepository):
    """
    Implementación PostgreSQL del repositorio de noticias.

    Adapta:
        SQLAlchemy ORM Model

    hacia:

        Domain Entity News
    """

    def __init__(
        self,
        session: Session,
    ):
        self.session = session

    def _to_entity(
        self,
        model: NewsModel,
    ) -> News:
        """
        Convierte un modelo SQLAlchemy
        en una entidad de dominio.
        """

        return News(
            id=model.id,
            title=model.title,
            content=model.content,
            source=model.source,
            author=model.author,
            url=model.url,
            language=model.language,
            country=model.country,
            published_at=model.published_at,
            is_fake=model.is_fake,
            created_at=model.created_at,
            updated_at=model.updated_at,
        )

    def create(
        self,
        news: News,
    ) -> News:
        """
        Persiste una nueva noticia.
        """

        model = NewsModel(
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
        )

        self.session.add(model)

        self.session.commit()

        self.session.refresh(model)

        return self._to_entity(model)

    def get_by_id(
        self,
        news_id: UUID,
    ) -> News | None:
        """
        Obtiene una noticia por UUID.
        """

        model = self.session.query(NewsModel).filter(NewsModel.id == news_id).first()

        if model is None:
            return None

        return self._to_entity(model)

    def get_all(
        self,
        skip: int = 0,
        limit: int = 100,
    ) -> list[News]:
        """
        Obtiene noticias paginadas.
        """

        if skip < 0:
            skip = 0

        if limit <= 0:
            limit = 100

        models = (
            self.session.query(NewsModel)
            .order_by(NewsModel.created_at.desc())
            .offset(skip)
            .limit(limit)
            .all()
        )

        return [self._to_entity(model) for model in models]

    def update(
        self,
        news: News,
    ) -> News:
        """
        Actualiza una noticia existente.
        """

        model = self.session.query(NewsModel).filter(NewsModel.id == news.id).first()

        if model is None:
            raise ValueError("News not found")

        model.title = news.title
        model.content = news.content
        model.source = news.source
        model.author = news.author
        model.url = news.url
        model.language = news.language
        model.country = news.country
        model.published_at = news.published_at
        model.is_fake = news.is_fake

        self.session.commit()

        self.session.refresh(model)

        return self._to_entity(model)

    def delete(
        self,
        news_id: UUID,
    ) -> None:
        """
        Elimina una noticia.
        """

        model = self.session.query(NewsModel).filter(NewsModel.id == news_id).first()

        if model is None:
            raise ValueError("News not found")

        self.session.delete(model)

        self.session.commit()
