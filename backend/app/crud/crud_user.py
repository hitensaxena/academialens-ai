from typing import Any, Dict, List, Optional, Union

from sqlalchemy.orm import Session

from app.core.security import get_password_hash, verify_password
from app.db.models.user import (
    User as UserModel,  # Alias to avoid confusion with Pydantic model
)
from app.schemas.user import UserCreate, UserUpdate


def get_user(db: Session, user_id: int) -> Optional[UserModel]:
    return db.query(UserModel).filter(UserModel.id == user_id).first()


def get_user_by_email(db: Session, email: str) -> Optional[UserModel]:
    return db.query(UserModel).filter(UserModel.email == email).first()


def get_users(db: Session, skip: int = 0, limit: int = 100) -> List[UserModel]:
    return db.query(UserModel).offset(skip).limit(limit).all()


def authenticate(db: Session, *, email: str, password: str) -> Optional[UserModel]:
    """Authenticate a user by email and password."""
    user = get_user_by_email(db, email=email)
    if not user:
        return None
    if not verify_password(password, user.hashed_password):
        return None
    return user


def create_user(db: Session, *, obj_in: UserCreate) -> UserModel:
    db_obj = UserModel(
        email=obj_in.email,
        hashed_password=get_password_hash(obj_in.password),
        full_name=obj_in.full_name,
        is_superuser=obj_in.is_superuser,  # Defaulted in Pydantic schema
        is_active=obj_in.is_active,  # Defaulted if not provided
    )
    db.add(db_obj)
    db.commit()
    db.refresh(db_obj)
    return db_obj


def update_user(
    db: Session, *, db_obj: UserModel, obj_in: Union[UserUpdate, Dict[str, Any]]
) -> UserModel:
    if isinstance(obj_in, dict):
        update_data = obj_in
    else:
        update_data = obj_in.model_dump(exclude_unset=True)

    if "password" in update_data and update_data["password"]:
        hashed_password = get_password_hash(update_data["password"])
        del update_data["password"]  # Remove plain password
        update_data["hashed_password"] = hashed_password  # Add hashed

    for field, value in update_data.items():
        setattr(db_obj, field, value)

    db.add(db_obj)
    db.commit()
    db.refresh(db_obj)
    return db_obj


def delete_user(db: Session, *, user_id: int) -> Optional[UserModel]:
    db_obj = db.query(UserModel).get(user_id)
    if db_obj:
        db.delete(db_obj)
        db.commit()
    return db_obj
