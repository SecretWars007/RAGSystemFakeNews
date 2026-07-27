from collections.abc import Generator

from app.infrastructure.database.session import SessionLocal
from sqlalchemy.orm import Session


def get_database_session() -> Generator[Session, None, None]:

    session = SessionLocal()

    try:
        yield session

    finally:
        session.close()
