from app.infrastructure.dependencies.database import get_database_session
from app.infrastructure.repositories.postgres_history_repository import (
    PostgresHistoryRepository,
)
from app.infrastructure.repositories.postgres_news_repository import (
    PostgresNewsRepository,
)
from app.infrastructure.repositories.postgres_user_repository import (
    PostgresUserRepository,
)
from fastapi import Depends
from sqlalchemy.orm import Session


def get_user_repository(session: Session = Depends(get_database_session)):
    return PostgresUserRepository(session)


def get_news_repository(session: Session = Depends(get_database_session)):
    return PostgresNewsRepository(session)


def get_history_repository(session: Session = Depends(get_database_session)):
    return PostgresHistoryRepository(session)
