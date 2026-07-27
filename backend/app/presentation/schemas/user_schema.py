from uuid import UUID

from pydantic import BaseModel, EmailStr


class UserCreateSchema(BaseModel):
    email: EmailStr

    password: str


class UserResponseSchema(BaseModel):
    id: UUID

    email: EmailStr

    class Config:
        from_attributes = True
