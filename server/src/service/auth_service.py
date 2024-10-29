from ..models import User
from sqlalchemy.orm import Session
from ..schema.auth_schema import LoginSchema, RegisterSchema
from ..util.helper import Helper
from sqlalchemy.exc import SQLAlchemyError
from ..repository.user_repository import UserRepository
from fastapi import HTTPException
from typing import Dict
import jwt


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

        access_token = self.helper.generate_access_token({"user_id": user.id})
        refresh_token = self.helper.generate_refresh_token({"user_id": user.id})

        return {"access_token": access_token, "refresh_token": refresh_token}

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

    def verify_user(self, token: str) -> Dict:
        try:
            id = self.helper.decode_jwt(token)
            if id is None:
                raise HTTPException(status_code=400, detail="Invalid token")
            user = self.user_repository.get_user_by_id(id)
            if user is None:
                raise HTTPException(status_code=404, detail="User not found")
            return {
                "id": user.id,
                "username": user.username,
                "email": user.email,
                "bio": user.bio,
                "address": user.address,
                "role_id": user.role_id,
            }
        except jwt.ExpiredSignatureError:
            raise HTTPException(status_code=401, detail="Token expired")
        except jwt.InvalidTokenError:
            raise HTTPException(status_code=400, detail="Invalid token")
