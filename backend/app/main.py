from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import logging

from app.api.v1.api import api_router as api_v1_router
from app.core.config import settings

# Initialize FastAPI app
app = FastAPI(
    title=settings.PROJECT_NAME,
    openapi_url=f"{settings.API_V1_STR}/openapi.json",
    # You can add other app metadata here like version, description, etc.
    # version="0.1.0",
    # description="AcademiaLens API",
)

# Set up logging
logger = logging.getLogger(settings.PROJECT_NAME)
logger.info(f"Starting {settings.PROJECT_NAME} with log level {settings.LOG_LEVEL}")

# CORS Middleware
if settings.BACKEND_CORS_ORIGINS:
    app.add_middleware(
        CORSMiddleware,
        allow_origins=[str(origin) for origin in settings.BACKEND_CORS_ORIGINS],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )
    logger.info(f"CORS enabled for origins: {settings.BACKEND_CORS_ORIGINS}")
else:
    logger.info("CORS not configured or no origins specified.")

# Include API routers
app.include_router(api_v1_router, prefix=settings.API_V1_STR)

@app.on_event("startup")
async def startup_event():
    logger.info("Application startup complete.")
    # You can add database connection checks or other startup logic here
    # For example, trying to connect to the database:
    # from app.db.session import engine
    # try:
    #     with engine.connect() as connection:
    #         logger.info("Database connection successful.")
    # except Exception as e:
    #     logger.error(f"Database connection failed: {e}")

@app.on_event("shutdown")
async def shutdown_event():
    logger.info("Application shutdown complete.")

# A root endpoint for basic check (optional)
@app.get("/", tags=["root"])
async def read_root():
    return {"message": f"Welcome to {settings.PROJECT_NAME}"}
