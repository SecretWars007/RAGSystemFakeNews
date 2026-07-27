from app.domain.entities.query_history import QueryHistory
from app.domain.repositories.history_repository import IHistoryRepository
from app.infrastructure.models.query_history_model import QueryHistoryModel
from sqlalchemy.orm import Session


class PostgresHistoryRepository(IHistoryRepository):
    def __init__(self, session: Session):

        self.session = session

    def save(self, history: QueryHistory) -> QueryHistory:

        model = QueryHistoryModel(
            id=history.id, user_id=history.user_id, query=history.query
        )

        self.session.add(model)

        self.session.commit()

        self.session.refresh(model)

        return QueryHistory(id=model.id, user_id=model.user_id, query=model.query)

    def get_user_history(self, user_id) -> list[QueryHistory]:

        records = (
            self.session.query(QueryHistoryModel)
            .filter(QueryHistoryModel.user_id == user_id)
            .all()
        )

        return [
            QueryHistory(id=item.id, user_id=item.user_id, query=item.query)
            for item in records
        ]
