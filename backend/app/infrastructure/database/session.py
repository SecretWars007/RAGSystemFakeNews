from app.infrastructure.database.connection import engine
from sqlalchemy.orm import sessionmaker

SessionLocal = sessionmaker(
    bind=engine,
    autoflush=False,
    autocommit=False,
)


def get_db():
    db = SessionLocal()

    try:
        yield db

    finally:
        db.close()


# Alias temporal para mantener compatibilidad
get_database = get_db
