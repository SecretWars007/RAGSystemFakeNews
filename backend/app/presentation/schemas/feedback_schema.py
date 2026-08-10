from pydantic import BaseModel, Field


class FeedbackCreateSchema(BaseModel):
    query: str = Field(min_length=10, max_length=10_000)
    predicted_label: str = Field(min_length=2, max_length=40)
    corrected_label: str | None = Field(default=None, max_length=40)
