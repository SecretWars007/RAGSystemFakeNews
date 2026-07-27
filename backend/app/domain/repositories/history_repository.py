from abc import ABC, abstractmethod

from app.domain.entities.query_history import QueryHistory


class IHistoryRepository(ABC):
    @abstractmethod
    def save(self, history: QueryHistory) -> QueryHistory:
        pass

    @abstractmethod
    def get_user_history(self, user_id) -> list[QueryHistory]:
        pass
