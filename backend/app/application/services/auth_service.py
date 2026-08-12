from uuid import uuid4

from app.core.security.jwt import create_access_token
from app.core.security.password import (
    hash_password,
    verify_password,
)
from app.domain.entities.user import User
from app.domain.repositories.user_repository import (
    IUserRepository,
)


class AuthService:
    """
    Servicio encargado de la autenticación y
    registro de usuarios.
    """

    def __init__(
        self,
        repository: IUserRepository,
    ):
        self.repository = repository

    def register(
        self,
        email: str,
        password: str,
    ) -> User:
        """
        Registra un nuevo usuario.
        """
        if self.repository.get_by_email(email):
            raise ValueError("El correo ya está registrado")

        user = User(
            id=uuid4(),
            email=email,
            password_hash=hash_password(password),
        )

        return self.repository.create(user)

    def login(
        self,
        email: str,
        password: str,
    ) -> str | None:
        """
        Autentica un usuario y devuelve un JWT.
        """

        user = self.repository.get_by_email(email)

        if user is None:
            return None

        if not verify_password(
            password,
            user.password_hash,
        ):
            return None

        token = create_access_token(
            {
                "sub": str(user.id),
                "email": user.email,
            }
        )

        return token
