from uuid import uuid4

from app.domain.entities.news import News


def test_create_news_entity():

    news = News(
        id=uuid4(),
        title="Fake News Test",
        content="Contenido de prueba",
        source="Test Source",
    )

    assert news.title == "Fake News Test"
    assert news.source == "Test Source"
