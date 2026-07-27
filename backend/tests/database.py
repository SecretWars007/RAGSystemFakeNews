from app.infrastructure.database.base import Base
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

TEST_DATABASE_URL = "sqlite:///./test.db"


engine_test = create_engine(
    TEST_DATABASE_URL,
    connect_args={"check_same_thread": False},
)


TestingSessionLocal = sessionmaker(
    bind=engine_test,
    autoflush=False,
    autocommit=False,
)


def create_test_database():

    Base.metadata.create_all(bind=engine_test)


def drop_test_database():

    Base.metadata.drop_all(bind=engine_test)
