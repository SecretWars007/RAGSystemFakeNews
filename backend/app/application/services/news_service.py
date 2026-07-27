from app.application.use_cases.create_news import CreateNewsUseCase
from app.domain.entities.news import News


class NewsService:
    def __init__(self, use_case: CreateNewsUseCase):

        self.use_case = use_case

    def create(self, news: News):

        return self.use_case.execute(news)
