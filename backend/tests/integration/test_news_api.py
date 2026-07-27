from app.main import app
from fastapi.testclient import TestClient

client = TestClient(app)


def test_health_endpoint():

    response = client.get("/")

    assert response.status_code == 200

    data = response.json()

    assert data["application"] == ("FakeNewsRAGSystem")

    assert data["status"] == ("running")
