from sqlalchemy.orm import declarative_base

Base = declarative_base()

# You can also define a common base class for all your models here if needed,
# for example, to add common columns like id, created_at, updated_at.
# Example:
# from sqlalchemy import Column, Integer, DateTime
# from datetime import datetime
#
# class BaseModel(Base):
#     __abstract__ = True  # SQLAlchemy won't create a table for BaseModel
#
#     id = Column(Integer, primary_key=True, index=True)
#     created_at = Column(DateTime, default=datetime.utcnow)
#     updated_at = Column(DateTime, default=utcnow, onupdate=utcnow)
#
# Models would then inherit from BaseModel, not Base.
# For now, we'll keep it simple with just `Base = declarative_base()`.
