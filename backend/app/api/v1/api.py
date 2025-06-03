from fastapi import APIRouter

from app.api.v1.endpoints import health, login, users

api_router = APIRouter()

api_router.include_router(health.router, prefix="/meta", tags=["meta"])
# Add other endpoint routers here as they are created, e.g.:
# from app.api.v1.endpoints import health, users, login, items
api_router.include_router(users.router, prefix="/users", tags=["users"])
api_router.include_router(login.router, tags=["login"])
# api_router.include_router(items.router, prefix="/items", tags=["items"])
