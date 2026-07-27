from uuid import UUID

from app.domain.repositories.history_repository import IHistoryRepository


class GetUserHistoryUseCase:
    def __init__(self, repository: IHistoryRepository):

        self.repository = repository

    def execute(self, user_id: UUID):

        return self.repository.get_user_history(user_id)
