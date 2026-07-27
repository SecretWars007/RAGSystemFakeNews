from uuid import uuid4

from app.core.security.jwt import create_access_token
from app.core.security.password import hash_password, verify_password
from app.domain.entities.user import User
from app.domain.repositories.user_repository import IUserRepository


class AuthService:
    def __init__(self, repository: IUserRepository):

        self.repository = repository

    def register(self, email: str, password: str) -> User:

        print("PASSWORD LENGTH:", len(password), type(password))
        user = User(id=uuid4(), email=email, password_hash=hash_password(password))

        return self.repository.create(user)

    def login(self, email: str, password: str):

        user = self.repository.get_by_email(email)

        if not user:
            return None

        if not verify_password(password, user.password_hash):
            return None

        token = create_access_token({"sub": str(user.id), "email": user.email})

        return token
