from fastapi import APIRouter
from pydantic import BaseModel

router = APIRouter()


class HealthCheck(BaseModel):
    status: str = "OK"


@router.get("/health", response_model=HealthCheck, tags=["health"])
def read_health():
    """
    Health check endpoint.
    """
    return HealthCheck(status="OK")
