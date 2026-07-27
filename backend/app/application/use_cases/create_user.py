from app.domain.entities.user import User
from app.domain.repositories.user_repository import IUserRepository


class CreateUserUseCase:
    def __init__(self, repository: IUserRepository):

        self.repository = repository

    def execute(self, user: User) -> User:

        return self.repository.create(user)
