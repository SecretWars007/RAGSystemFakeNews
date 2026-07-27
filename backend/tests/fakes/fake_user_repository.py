from app.domain.entities.user import User
from app.domain.repositories.user_repository import (
    IUserRepository,
)


class FakeUserRepository(IUserRepository):
    def __init__(self):

        self.users: list[User] = []

    def create(
        self,
        user: User,
    ) -> User:

        self.users.append(user)

        return user

    def get_by_email(
        self,
        email: str,
    ) -> User | None:

        for user in self.users:
            if user.email == email:
                return user

        return None
