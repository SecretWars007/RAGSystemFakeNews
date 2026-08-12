from typing import Annotated
from app.application.dependencies import get_auth_service
from app.application.services.auth_service import AuthService
from app.core.security.auth import get_current_user
from app.infrastructure.models.user_model import UserModel
from app.presentation.schemas.auth_schema import LoginSchema, TokenSchema
from app.presentation.schemas.user_schema import UserCreateSchema, UserResponseSchema
from fastapi import APIRouter, Depends, HTTPException

router = APIRouter(prefix="/users", tags=["Users"])


@router.get("/health")
def health():

    return {"module": "users", "status": "running"}


@router.post("/register", responses={400: {"description": "Bad Request"}})
def register(data: UserCreateSchema, service: Annotated[AuthService, Depends(get_auth_service)]):
    try:
        user = service.register(data.email, data.password)
        return {"id": str(user.id), "email": user.email}
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))


@router.post("/login", response_model=TokenSchema, responses={401: {"description": "Unauthorized"}})
def login(data: LoginSchema, service: Annotated[AuthService, Depends(get_auth_service)]):

    token = service.login(data.email, data.password)

    if not token:
        raise HTTPException(status_code=401, detail="Invalid credentials")

    return {"access_token": token, "token_type": "bearer"}


@router.get("/me")
def get_me(user: Annotated[UserModel, Depends(get_current_user)]):
    return {
        "id": str(user.id),
        "email": user.email,
    }
