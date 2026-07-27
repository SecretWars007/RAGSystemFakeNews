from app.domain.entities.news import News
from app.domain.repositories.news_repository import INewsRepository


class CreateNewsUseCase:
    def __init__(self, repository: INewsRepository):
        self.repository = repository

    def execute(self, news: News) -> News:
        return self.repository.create(news)
