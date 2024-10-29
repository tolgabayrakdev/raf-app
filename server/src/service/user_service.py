from sqlalchemy.orm import Session
from ..util.helper import Helper
from fastapi import HTTPException
from sqlalchemy.exc import SQLAlchemyError
from ..repository.user_repository import UserRepository

class UserService:

    def __init__(self, db: Session):
        self.user_repository = UserRepository(db)
        self.helper = Helper()


    def update_user(self, user_id, data):
        user = self.user_repository.get_user_by_id(user_id)
        if user is None:
            raise ValueError(f"User with id {user_id} not found")
        user.username = data.get("username", user.username)
        user.email = data.get("email", user.email)
        user.password = data.get("password", user.password)
        user.bio = data.get("bio", user.bio)
        user.address = data.get("address", user.address)
        try:
            self.user_repository.update_user(user_id, data)
            return {"message": "User updated successfully"}
        except SQLAlchemyError as e:
            raise HTTPException(status_code=500, detail=str(e))
        

    def delete_user(self, user_id):
        user = self.user_repository.get_user_by_id(user_id)
        if user is None:
            raise ValueError(f"User with id {user_id} not found")
        try:
            self.user_repository.delete_user(user_id)
            return {"message": "User deleted successfully"}
        except SQLAlchemyError as e:
            raise HTTPException(status_code=500, detail=str(e))
        
    
    def change_password(self, user_id, data):
        user = self.user_repository.get_user_by_id(user_id)
        if user and self.helper.match_hash_text(user.password, data.current_password):
            user.password = self.helper.generate_hash_password(data.new_password)
        try:
            self.user_repository.update_user(user_id, data)
            return {"message": "Password updated successfully"}
        except SQLAlchemyError as e:
            raise HTTPException(status_code=500, detail=str(e))
    