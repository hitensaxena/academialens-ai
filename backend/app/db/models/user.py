from sqlalchemy import Boolean, Column, DateTime, Integer, String
from sqlalchemy.sql import func  # For server-side default timestamps

from app.db.base import Base  # Import the Base from base.py


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    full_name = Column(String, index=True, nullable=True)

    is_active = Column(Boolean(), default=True)
    is_superuser = Column(Boolean(), default=False)

    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

    # If you add relationships later, they would go here, e.g.:
    # items = relationship("Item", back_populates="owner")

    def __repr__(self):
        return f"<User(id={self.id}, email='{self.email}')>"
