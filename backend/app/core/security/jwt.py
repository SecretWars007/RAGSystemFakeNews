from datetime import datetime, timedelta

from jose import jwt

SECRET_KEY = "fake-news-secret-key"

ALGORITHM = "HS256"


def create_access_token(data: dict, expires_minutes: int = 60):

    payload = data.copy()

    expire = datetime.utcnow() + timedelta(minutes=expires_minutes)

    payload.update({"exp": expire})

    return jwt.encode(payload, SECRET_KEY, algorithm=ALGORITHM)
