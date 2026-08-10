from app.core.security.auth import get_current_user
from app.infrastructure.database.session import get_db
from app.infrastructure.models.feedback_model import FeedbackModel
from app.infrastructure.models.user_model import UserModel
from app.presentation.schemas.feedback_schema import FeedbackCreateSchema
from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session


router = APIRouter(prefix="/feedback", tags=["Feedback"])


@router.post("", status_code=status.HTTP_201_CREATED)
def create_feedback(
    data: FeedbackCreateSchema,
    user: UserModel = Depends(get_current_user),
    session: Session = Depends(get_db),
):
    item = FeedbackModel(user_id=user.id, **data.model_dump())
    session.add(item)
    session.commit()
    return {"id": str(item.id), "status": item.status}
