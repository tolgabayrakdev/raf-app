from sqlalchemy.orm import Session
from sqlalchemy.exc import SQLAlchemyError
from ..models import User
from ..util.helper import Helper


class UserRepository:
    def __init__(self, db: Session):
        self.db = db
        self.helper = Helper()

    def create_user(self, user):
        try:
            self.db.add(user)
            self.db.commit()
            self.db.refresh(user)
        except SQLAlchemyError:
            self.db.rollback()
            raise

    def get_user_by_email(self, email):
        return self.db.query(User).filter(User.email == email).first()

    def get_user_by_id(self, user_id):
        return self.db.query(User).filter(User.id == user_id).first()
    
    def delete_user(self, user_id):
        user = self.get_user_by_id(user_id)
        if user is None:
            raise ValueError(f"User with id {user_id} not found")
        try:
            self.db.delete(user)
            self.db.commit()
        except SQLAlchemyError:
            self.db.rollback()
            raise

    def update_user(self, user_id, data):
        user = self.get_user_by_id(user_id)
        if user is None:
            raise ValueError(f"User with id {user_id} not found")
        user.username = data.get("username", user.username)
        user.email = data.get("email", user.email)
        user.password = data.get("password", user.password)
        user.bio = data.get("bio", user.bio)
        user.address = data.get("address", user.address)
        try:
            self.db.commit()
            self.db.refresh(user)
        except SQLAlchemyError:
            self.db.rollback()
            raise

    def update_user_password(self, user_id: int, new_password: str):
        user = self.get_user_by_id(user_id)
        if user is None:
            raise ValueError(f"User with id {user_id} not found")
        
        user.password = new_password
        try:
            self.db.commit()
            self.db.refresh(user)
        except SQLAlchemyError:
            self.db.rollback()
            raise