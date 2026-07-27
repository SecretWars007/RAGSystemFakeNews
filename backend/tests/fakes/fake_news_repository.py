from uuid import UUID

from app.domain.entities.news import News
from app.domain.repositories.news_repository import (
    INewsRepository,
)

from tests.fakes.fake_base_repository import (
    FakeBaseRepository,
)


class FakeNewsRepository(INewsRepository):
    def __init__(self):

        self.base = FakeBaseRepository()

    def create(
        self,
        news: News,
    ) -> News:

        return self.base.create(news)

    def get_by_id(
        self,
        news_id: UUID,
    ) -> News | None:

        return self.base.get_by_id(news_id)

    def get_all(
        self,
        skip: int = 0,
        limit: int = 100,
    ) -> list[News]:

        items = self.base.get_all()

        return items[skip : skip + limit]

    def update(
        self,
        news: News,
    ) -> News:

        return self.base.update(news)

    def delete(
        self,
        news_id: UUID,
    ) -> None:

        self.base.delete(news_id)
