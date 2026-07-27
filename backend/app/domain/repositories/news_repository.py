from abc import ABC, abstractmethod
from uuid import UUID

from app.domain.entities.news import News


class INewsRepository(ABC):
    @abstractmethod
    def create(self, news: News) -> News: ...

    @abstractmethod
    def get_by_id(self, news_id: UUID) -> News | None: ...

    @abstractmethod
    def get_all(self) -> list[News]: ...

    @abstractmethod
    def update(self, news: News) -> News: ...

    @abstractmethod
    def delete(self, news_id: UUID) -> None: ...
