from fastapi import APIRouter, Depends, Response, Request, HTTPException
from sqlalchemy.orm import Session

from ..schema.auth_schema import LoginSchema, RegisterSchema
from ..util.helper import Helper
from ..service.auth_service import AuthService
from ..database import get_db

router = APIRouter()
helper = Helper()

@router.post("/login")
async def login(payload: LoginSchema, response: Response, db: Session = Depends(get_db)):
    auth_service = AuthService(db)
    response.set_cookie(key="access_token", value=auth_service.login(payload)["access_token"], httponly=True)
    response.set_cookie(key="refresh_token", value=auth_service.login(payload)["refresh_token"], httponly=True)
    return auth_service.login(payload)


@router.post("/register")
async def register(payload: RegisterSchema, db: Session = Depends(get_db)):
    auth_service = AuthService(db)
    return auth_service.register(payload)


@router.post("/verify")
async def verify(request: Request, db: Session = Depends(get_db)):
    auth_service = AuthService(db)
    try:
        access_token = request.cookies.get("access_token")
        refresh_token = request.cookies.get("refresh_token")

        if not access_token or not refresh_token:
            raise HTTPException(status_code=401, detail="Unauthorized")
        
        return auth_service.verify_user(access_token)        
    except Exception:
        raise HTTPException(status_code=401, detail="Unauthorized")

@router.post("/logout")
async def logout(response: Response):
    response.delete_cookie(key="access_token")
    response.delete_cookie(key="refresh_token")
    return {"message": "Logout successful"}