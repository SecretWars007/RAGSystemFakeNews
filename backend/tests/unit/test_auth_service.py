from app.application.services.auth_service import (
    AuthService,
)

from tests.fakes.fake_user_repository import (
    FakeUserRepository,
)


def test_register_user():

    repository = FakeUserRepository()

    service = AuthService(repository)

    user = service.register(
        email="test@test.com",
        password="password123",
    )

    assert user.email == "test@test.com"

    assert user.password_hash != "password123"

    assert len(repository.users) == 1


def test_login_success():

    repository = FakeUserRepository()

    service = AuthService(repository)

    service.register(
        email="test@test.com",
        password="password123",
    )

    token = service.login(
        email="test@test.com",
        password="password123",
    )

    assert token is not None


def test_login_invalid_password():

    repository = FakeUserRepository()

    service = AuthService(repository)

    service.register(
        email="test@test.com",
        password="password123",
    )

    token = service.login(
        email="test@test.com",
        password="wrong-password",
    )

    assert token is None
