from ..models import User
from sqlalchemy.orm import Session
from ..schema.auth_schema import LoginSchema, RegisterSchema
from ..util.helper import Helper
from sqlalchemy.exc import SQLAlchemyError
from ..repository.user_repository import UserRepository
from fastapi import HTTPException
from typing import Dict


class AuthService:

    def __init__(self, db: Session):
        self.user_repository = UserRepository(db)
        self.helper = Helper()

    def login(self, data: LoginSchema) -> Dict:
        user = self.user_repository.get_user_by_email(data.email)

        if not user:
            raise HTTPException(status_code=400, detail="Invalid email")

        if not self.helper.match_hash_text(user.password, data.password):
            raise HTTPException(status_code=400, detail="Invalid password")

        access_token = self.helper.generate_access_token(
            {"user_id": user.id}
        )
        refresh_token = self.helper.generate_refresh_token(
            {"user_id": user.id}
        )

        return {
            "access_token": access_token,
            "refresh_token": refresh_token
        }

    def register(self, data: RegisterSchema) -> Dict:
        user = self.user_repository.get_user_by_email(data.email)

        if user:
            raise HTTPException(status_code=400, detail="User already exists")

        user = User(
            username=data.username,
            email=data.email,
            password=self.helper.generate_hash_password(data.password),
        )

        try:
            self.user_repository.create_user(user)
            return {"message": "User created successfully"}
        except SQLAlchemyError as e:
            raise HTTPException(status_code=500, detail=str(e))