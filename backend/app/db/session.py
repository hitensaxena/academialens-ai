from typing import Generator

from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

from app.core.config import settings

# Construct the database URL from settings
# Ensure DATABASE_URL is correctly formed in your .env or config.py
if settings.DATABASE_URL:
    SQLALCHEMY_DATABASE_URL = str(settings.DATABASE_URL)  # Ensure string
    engine = create_engine(SQLALCHEMY_DATABASE_URL, pool_pre_ping=True)
    SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
else:
    # Fallback or error if DATABASE_URL is not set
    # This case should ideally be handled by Pydantic validation in config.py
    # For now, raise error or use default SQLite for testing if appropriate
    # However, for PostgreSQL, a valid URL is essential.
    raise ValueError("DATABASE_URL not configured in settings.")


# Dependency to get DB session
def get_db() -> Generator:
    db = None
    try:
        db = SessionLocal()
        yield db
    finally:
        if db:
            db.close()
