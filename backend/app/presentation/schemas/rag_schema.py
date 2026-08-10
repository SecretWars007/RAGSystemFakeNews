from pydantic import BaseModel, Field


class RagAnalyzeRequest(BaseModel):
    """
    DTO de entrada para el análisis
    de una noticia mediante RAG.
    """

    title: str = Field(
        ...,
        min_length=5,
        max_length=500,
        description="Título de la noticia",
    )

    content: str = Field(
        ...,
        min_length=20,
        description="Contenido completo de la noticia",
    )

    source: str = Field(
        ...,
        min_length=2,
        max_length=255,
        description="Fuente de la noticia",
    )

    provider: str = Field(
        default="gemini",
        description="Proveedor del modelo de embeddings",
    )

    model: str = Field(
        default="models/gemini-embedding-001",
        description="Modelo utilizado para generar embeddings",
    )


class RagAnalyzeResponse(BaseModel):
    """
    DTO de salida generado por el motor RAG.
    """

    analysis: str

    status: str


class RagQueryRequest(BaseModel):
    query: str = Field(
        ...,
        min_length=10,
        max_length=10_000,
        description="Afirmación o consulta que se desea verificar",
    )
