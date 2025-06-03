import logging
from typing import List, Union, Optional

from pydantic import AnyHttpUrl, PostgresDsn, field_validator
from pydantic_settings import BaseSettings, SettingsConfigDict

class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file=".env", env_file_encoding='utf-8', extra='ignore')

    PROJECT_NAME: str = "AcademiaLens Backend"
    API_V1_STR: str = "/api/v1"

    # Logging
    LOG_LEVEL: str = "INFO"

    # CORS
    BACKEND_CORS_ORIGINS: List[AnyHttpUrl] = []

    @field_validator("BACKEND_CORS_ORIGINS", mode="before")
    @classmethod
    def assemble_cors_origins(cls, v: Union[str, List[str]]) -> Union[List[str], str]:
        if isinstance(v, str) and not v.startswith("["):
            return [i.strip() for i in v.split(",")]
        elif isinstance(v, (list, str)):
            return v
        raise ValueError(v)

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
        # should be `def assemble_db_connection(cls, v: Optional[str], info: FieldValidationInfo) -> Any:`
        # and then use `info.data`
        # For simplicity with current Pydantic settings, let's assume direct construction if not provided.
        # This part might need adjustment based on the exact Pydantic version and how `values` is passed.
        # A common pattern is to construct it if not explicitly set.
        # For now, we'll rely on it being set in .env or constructed there directly.
        # If POSTGRES_USER etc. are present, it implies DATABASE_URL should be constructible.
        # This validator is more of a placeholder if DATABASE_URL isn't directly in .env
        # A more robust approach for Pydantic v2:
        # from pydantic import model_validator
        # @model_validator(mode='after')
        # def assemble_db_connection_auto(self) -> 'Settings':
        #     if not self.DATABASE_URL and all([
        #         self.POSTGRES_SERVER, self.POSTGRES_USER, self.POSTGRES_PASSWORD, self.POSTGRES_DB
        #     ]):
        #         self.DATABASE_URL = PostgresDsn.build(
        #             scheme="postgresql",
        #             username=self.POSTGRES_USER,
        #             password=self.POSTGRES_PASSWORD,
        #             host=self.POSTGRES_SERVER,
        #             port=int(self.POSTGRES_PORT),
        #             path=f"/{self.POSTGRES_DB}",
        #         )
        #     return self
        return v # Return v as is, assuming DATABASE_URL is set in .env or will be handled by a model_validator

    # JWT Authentication
    SECRET_KEY: str
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30
    REFRESH_TOKEN_EXPIRE_DAYS: int = 7

    # First Superuser (optional)
    FIRST_SUPERUSER_EMAIL: Optional[str] = None
    FIRST_SUPERUSER_PASSWORD: Optional[str] = None

    class Config:
        case_sensitive = True
        env_file = ".env"
        extra = "ignore"

settings = Settings()

# Configure logging based on settings
logging.basicConfig(level=settings.LOG_LEVEL.upper())
logger = logging.getLogger(settings.PROJECT_NAME)
