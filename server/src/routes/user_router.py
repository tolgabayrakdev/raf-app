from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from ..database import get_db
from ..service.user_service import UserService
from ..security.authenticated_user import authenticated_user

router = APIRouter()


@router.put("/update-profile")
def update_profile(
    payload: dict,
    current_user: dict = Depends(authenticated_user),
    db: Session = Depends(get_db),
):
    user_service = UserService(db)

    return user_service.update_user(current_user["id"], payload)


@router.delete("/delete-profile")
def delete_profile(
    current_user: dict = Depends(authenticated_user),
    db: Session = Depends(get_db),
):
    user_service = UserService(db)

    return user_service.delete_user(current_user["id"])


@router.post("/change-password")
def change_password(
    payload: dict,
    current_user: dict = Depends(authenticated_user),
    db: Session = Depends(get_db),
):
    user_service = UserService(db)

    return user_service.change_password(current_user["id"], payload)
