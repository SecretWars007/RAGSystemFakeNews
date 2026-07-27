from datetime import datetime
from unittest.mock import Mock
from uuid import uuid4

from app.application.services.news_service import (
    NewsService,
)

from app.domain.entities.news import (
    News,
)


def test_create_news():


    repository = Mock()


    service = NewsService(
        repository
    )


    news = News(

        id=uuid4(),

        title="Test News",

        content="Contenido de prueba",

        source="Test Source",

        author="Tester",

        url="http://test.com",

        language="es",

        country="BO",

        published_at=datetime.now(),

        is_fake=False,

    )


    repository.create.return_value = news



    result = service.create(
        news
    )


    assert result is not None

    assert result.title == "Test News"


    repository.create.assert_called_once_with(
        news
    )