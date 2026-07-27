from app.domain.repositories.news_repository import INewsRepository


def test_repository_interface_exists():

    assert INewsRepository is not None
