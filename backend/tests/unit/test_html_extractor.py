from app.infrastructure.ingestion.html_extractor import extract_document


def test_extract_document_ignores_scripts_and_collects_paragraphs():
    title, content = extract_document(
        "<html><title>Dato oficial</title><script>ignore()</script>"
        "<p>Primera evidencia.</p><p>Segunda evidencia.</p></html>"
    )
    assert title == "Dato oficial"
    assert content == "Primera evidencia.\n\nSegunda evidencia."
