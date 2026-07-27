import pytest
from app.infrastructure.database.base import Base
from app.infrastructure.dependencies.database import (
    get_database_session,
)
from app.main import app
from fastapi.testclient import TestClient
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


@pytest.fixture(scope="function")
def client():

    Base.metadata.create_all(bind=engine_test)

    def override_database():

        db = TestingSessionLocal()

        try:
            yield db

        finally:
            db.close()

    app.dependency_overrides[get_database_session] = override_database

    with TestClient(app) as client:
        yield client

    app.dependency_overrides.clear()

    Base.metadata.drop_all(bind=engine_test)
