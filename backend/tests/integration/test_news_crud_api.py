def test_create_news(client):

    response = client.post(
        "/news",
        json={
            "title": "Noticia prueba",
            "content": "Contenido prueba",
            "source": "Test",
            "author": "Tester",
            "url": "https://test.com",
            "language": "es",
            "country": "BO",
            "is_fake": False,
        },
    )

    assert response.status_code == 201

    data = response.json()

    assert data["title"] == ("Noticia prueba")


def test_get_news(client):

    response = client.get("/news")

    assert response.status_code == 200

    assert isinstance(
        response.json(),
        list,
    )
