from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .routes import auth_router, user_router

app = FastAPI()

origins = ["http://localhost:3000", "https://localhost:3000"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth_router.router, prefix="/api/auth")
app.include_router(user_router.router, prefix="/api/user")

@app.get("/")
def read_root():
    return {"Hello": "World"}