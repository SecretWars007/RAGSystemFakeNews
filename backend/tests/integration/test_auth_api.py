from fastapi.testclient import TestClient


def test_register_user(
    client: TestClient,
):

    response = client.post(
        "/users/register",
        json={
            "email": "test@test.com",
            "password": "12345678",
        },
    )

    assert response.status_code == 200

    data = response.json()

    assert data["email"] == "test@test.com"

    assert "id" in data


def test_login_user(
    client: TestClient,
):

    client.post(
        "/users/register",
        json={
            "email": "login@test.com",
            "password": "12345678",
        },
    )

    response = client.post(
        "/users/login",
        json={
            "email": "login@test.com",
            "password": "12345678",
        },
    )

    assert response.status_code == 200

    data = response.json()

    assert "access_token" in data

    assert data["token_type"] == "bearer"


def test_login_invalid_credentials(
    client: TestClient,
):

    response = client.post(
        "/users/login",
        json={
            "email": "unknown@test.com",
            "password": "wrongpassword",
        },
    )

    assert response.status_code == 401

    assert response.json()["detail"] == "Invalid credentials"
