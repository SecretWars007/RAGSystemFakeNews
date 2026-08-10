from app.application.services.model_training_service import ModelTrainingService
from app.core.config import settings
from app.core.security.auth import get_current_user
from app.infrastructure.models.user_model import UserModel
from fastapi import APIRouter, Depends, HTTPException, status


router = APIRouter(prefix="/ml", tags=["MLOps"])


@router.post("/train", status_code=status.HTTP_202_ACCEPTED)
def train_configured_model(user: UserModel = Depends(get_current_user)):
    """Starts an explicitly enabled training run using only configured data."""
    if not settings.ALLOW_MODEL_TRAINING:
        raise HTTPException(status_code=403, detail="El entrenamiento está deshabilitado")
    try:
        result = ModelTrainingService().train_configured_dataset()
        return {"status": "candidate_registered", **result.__dict__}
    except (ImportError, ModuleNotFoundError) as error:
        raise HTTPException(status_code=503, detail="Dependencias MLOps no instaladas") from error
    except ValueError as error:
        raise HTTPException(status_code=422, detail=str(error)) from error
