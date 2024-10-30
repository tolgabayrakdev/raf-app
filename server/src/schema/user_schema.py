from pydantic import BaseModel


class PasswordChangeSchema(BaseModel):
    current_password: str
    new_password: str
