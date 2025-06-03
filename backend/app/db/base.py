from sqlalchemy.orm import declarative_base

Base = declarative_base()

# You can also define a common base class for all your models here if needed,
# for example, to add common columns like id, created_at, updated_at.
# Example:
# from sqlalchemy import Column, Integer, DateTime
# from datetime import datetime
# 
# class BaseModel(Base):
#     __abstract__ = True  # This makes SQLAlchemy not create a table for BaseModel
# 
#     id = Column(Integer, primary_key=True, index=True)
#     created_at = Column(DateTime, default=datetime.utcnow)
#     updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
#
# Then your models would inherit from BaseModel instead of Base directly.
# For now, we'll keep it simple with just `Base = declarative_base()`.
