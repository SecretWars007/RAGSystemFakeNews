from app.domain.entities.user import User
from app.domain.repositories.user_repository import IUserRepository
from app.infrastructure.models.user_model import UserModel
from sqlalchemy.orm import Session


class PostgresUserRepository(IUserRepository):


    def __init__(
        self,
        session: Session
    ):

        self.session = session



    def create(
        self,
        user: User
    ) -> User:


        model = UserModel(

            id=user.id,

            email=user.email,

            password_hash=user.password_hash
        )


        self.session.add(model)

        self.session.commit()

        self.session.refresh(model)


        return User(

            id=model.id,

            email=model.email,

            password_hash=model.password_hash
        )



    def get_by_email(
        self,
        email: str
    ) -> User | None:


        model = (

            self.session.query(UserModel)

            .filter(
                UserModel.email == email
            )

            .first()
        )


        if not model:
            return None


        return User(

            id=model.id,

            email=model.email,

            password_hash=model.password_hash
        )