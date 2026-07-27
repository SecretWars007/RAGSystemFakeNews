from uuid import UUID

from app.domain.entities.news import News
from app.domain.repositories.news_repository import INewsRepository


class NewsService:
    def __init__(self, repository: INewsRepository):
        self.repository = repository

    def create(self, news: News) -> News:
        return self.repository.create(news)

    def get_by_id(self, news_id: UUID) -> News | None:
        return self.repository.get_by_id(news_id)

    def get_all(self) -> list[News]:
        return self.repository.get_all()

    def update(self, news: News) -> News:
        return self.repository.update(news)

    def delete(self, news_id: UUID) -> None:
        self.repository.delete(news_id)
