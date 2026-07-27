from uuid import uuid4

from app.application.use_cases.create_news import CreateNewsUseCase
from app.domain.entities.news import News
from app.domain.repositories.news_repository import INewsRepository


class FakeNewsRepository(INewsRepository):
    def create(self, news):

        return news

    def get_by_id(self, news_id):

        return None


def test_create_news_use_case():

    repository = FakeNewsRepository()

    use_case = CreateNewsUseCase(repository)

    news = News(id=uuid4(), title="Noticia", content="Contenido", source="Fuente")

    result = use_case.execute(news)

    assert result.title == "Noticia"
