from uuid import uuid4

from app.application.use_cases.create_news import (
    CreateNewsUseCase,
)
from app.domain.entities.news import (
    News,
)

from tests.fakes.fake_news_repository import (
    FakeNewsRepository,
)


def test_create_news():

    repository = FakeNewsRepository()

    use_case = CreateNewsUseCase(repository)

    news = News(
        id=uuid4(),
        title="Noticia",
        content="Contenido",
        source="Fuente",
    )

    result = use_case.execute(news)

    assert result.title == "Noticia"

    assert result.content == "Contenido"

    assert result.source == "Fuente"

    assert len(repository.get_all()) == 1
