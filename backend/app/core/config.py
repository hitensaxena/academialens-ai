import logging
from typing import Any, List, Optional

from pydantic import PostgresDsn, field_validator
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        extra="ignore",
        case_sensitive=True,
    )

    PROJECT_NAME: str = "AcademiaLens Backend"
    API_V1_STR: str = "/api/v1"

    # Logging
    LOG_LEVEL: str = "INFO"

    # CORS - Accept string format from .env
    BACKEND_CORS_ORIGINS: List[str] = []

    @field_validator("BACKEND_CORS_ORIGINS", mode="before")
    @classmethod
    def parse_cors_origins(cls, v) -> List[str]:
        if isinstance(v, str):
            # Handle comma-separated string
            return [origin.strip() for origin in v.split(",") if origin.strip()]
        if isinstance(v, list):
            return v
        return []

    # Database
    POSTGRES_SERVER: str
    POSTGRES_PORT: str = "5432"
    POSTGRES_USER: str
    POSTGRES_PASSWORD: str
    POSTGRES_DB: str
    DATABASE_URL: Optional[PostgresDsn] = None

    @field_validator("DATABASE_URL", mode="before")
    @classmethod
    def assemble_db_connection(cls, v: Optional[str], values) -> Any:
        if isinstance(v, str):
            return v
        # Ensure values.data is used to access other model fields
        # For Pydantic v2, values is a ModelField
        # For Pydantic v1, values was a dict. Adjust if using Pydantic v1.
        # Assuming Pydantic v2, use values.data
        # However, the validator signature for Pydantic v2 with field_validator
        # Pydantic v2: def assemble_db_connection(
        #   cls, v: Optional[str], info: FieldValidationInfo
        # ) -> Any:
        # and then use `info.data`
        # For simplicity, assume direct construction if not provided.
        # May need adjustment based on Pydantic version & `values`.
        # A common pattern is to construct it if not explicitly set.
        # For now, rely on it being set in .env or constructed there.
        # If PG vars exist, DATABASE_URL should be constructible.
        # Placeholder if DATABASE_URL isn't directly in .env
        # A more robust approach for Pydantic v2:
        # from pydantic import model_validator
        # @model_validator(mode='after')
        # def assemble_db_connection_auto(self) -> 'Settings':
        #     if not self.DATABASE_URL and all([
        #         POSTGRES_SERVER, POSTGRES_USER,
        #         self.POSTGRES_PASSWORD, self.POSTGRES_DB
        #     ]):
        #         self.DATABASE_URL = (
        #             scheme="postgresql",
        #             username=self.POSTGRES_USER,
        #             password=self.POSTGRES_PASSWORD,
        #             host=self.POSTGRES_SERVER,
        #             port=int(self.POSTGRES_PORT),
        #             path=f"/{self.POSTGRES_DB}",  # Construct path
        #         )
        #     return self
        return v  # Return v; DB_URL assumed set in .env or by validator

    # JWT Authentication
    SECRET_KEY: str
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30
    REFRESH_TOKEN_EXPIRE_DAYS: int = 7

    # First Superuser (optional)
    FIRST_SUPERUSER_EMAIL: Optional[str] = None
    FIRST_SUPERUSER_PASSWORD: Optional[str] = None


settings = Settings()

# Configure logging based on settings
logging.basicConfig(level=settings.LOG_LEVEL.upper())
logger = logging.getLogger(settings.PROJECT_NAME)

# Log the parsed CORS settings
logger.info(f"Configured BACKEND_CORS_ORIGINS: " f"{settings.BACKEND_CORS_ORIGINS}")
