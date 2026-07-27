from app.domain.entities.news import News
from app.domain.repositories.news_repository import INewsRepository
from app.infrastructure.models.news_model import NewsModel
from sqlalchemy.orm import Session


class PostgresNewsRepository(INewsRepository):
    def __init__(self, session: Session):

        self.session = session

    def create(self, news: News) -> News:

        model = NewsModel(
            id=news.id, title=news.title, content=news.content, source=news.source
        )

        self.session.add(model)

        self.session.commit()

        self.session.refresh(model)

        return News(
            id=model.id, title=model.title, content=model.content, source=model.source
        )

    def get_by_id(self, news_id) -> News | None:

        model = self.session.query(NewsModel).filter(NewsModel.id == news_id).first()

        if not model:
            return None

        return News(
            id=model.id, title=model.title, content=model.content, source=model.source
        )
