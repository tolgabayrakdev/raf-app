from fastapi import FastAPI
from .routes import auth_router

app = FastAPI()

app.include_router(auth_router.router, prefix="/api/auth")

@app.get("/")
def read_root():
    return {"Hello": "World"}