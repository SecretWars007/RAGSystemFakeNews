from app.infrastructure.database.connection import engine
from sqlalchemy.orm import sessionmaker

SessionLocal = sessionmaker(bind=engine, autoflush=False, autocommit=False)


def get_database():

    db = SessionLocal()

    try:
        yield db

    finally:
        db.close()
