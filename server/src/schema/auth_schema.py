from pydantic import BaseModel
from typing import Optional


class LoginSchema(BaseModel):
    email: str
    password: str


class RegisterSchema(BaseModel):
    username: str
    email: str
    password: str
    bio: Optional[str] = None
    address: Optional[str] = None