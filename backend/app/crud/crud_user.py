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

    # Fetch the user object within the current session to ensure operations are on a managed instance
    user_to_update = db.query(UserModel).get(db_obj.id)
    if not user_to_update:
        # This case implies that the user (identified by db_obj.id, from current_user)
        # does not exist in the database according to the current session 'db'.
        # This would be highly unusual if current_user was successfully fetched by a dependency.
        # It could indicate a transaction isolation issue or a bug in how sessions are handled.
        # Pwd update for current_user: ideally internal server error if not found.
        # Raising a more generic exception for now, but this state should be investigated if it occurs.  # noqa: E501
        # Consider logging db_obj.id and session details here if this error is hit.  # noqa: E501
        raise Exception(
            f"Critical error: User with ID {db_obj.id} (from authenticated user) not found in current DB session during update."  # noqa: E501
        )

    # Apply updates to the user_to_update object, which is managed by the current session 'db'  # noqa: E501
    for field, value in update_data.items():
        setattr(user_to_update, field, value)

    # user_to_update is already persistent and managed by 'db' (because it was queried from it).
    # Changes made via setattr are tracked by SQLAlchemy's unit of work.
    db.commit()  # Commits changes made to user_to_update
    db.refresh(
        user_to_update
    )  # Refreshes user_to_update with its state from the DB after commit
    return user_to_update


def delete_user(db: Session, *, user_id: int) -> Optional[UserModel]:
    db_obj = db.query(UserModel).get(user_id)
    if db_obj:
        db.delete(db_obj)
        db.commit()
    return db_obj
