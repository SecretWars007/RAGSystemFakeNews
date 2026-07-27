from abc import ABC, abstractmethod

from app.domain.entities.news import News


class INewsRepository(ABC):
    @abstractmethod
    def create(self, news: News) -> News:
        pass

    @abstractmethod
    def get_by_id(self, news_id) -> News | None:
        pass
