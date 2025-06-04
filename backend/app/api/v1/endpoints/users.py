from typing import List

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app import crud, schemas  # Updated to import top-level crud and schemas
from app.api import deps  # Added import for deps
from app.core import security  # For password verification
from app.db import models  # Updated to import top-level models
from app.db.session import get_db

router = APIRouter()


@router.post("/", response_model=schemas.User, status_code=status.HTTP_201_CREATED)
def create_user(
    *, db: Session = Depends(get_db), user_in: schemas.UserCreate
) -> models.User:  # Returns SA model; Pydantic via response_model
    """
    Create new user.
    """
    db_user = crud.crud_user.get_user_by_email(db, email=user_in.email)
    if db_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=("The user with this email already exists in the system."),
        )
    user = crud.crud_user.create_user(db=db, obj_in=user_in)
    return user


@router.get("/", response_model=List[schemas.User])
def read_users(
    db: Session = Depends(get_db),
    skip: int = 0,
    limit: int = 100,
    current_user: models.User = Depends(deps.get_current_user),  # Added
) -> List[models.User]:
    """
    Retrieve users. Requires authentication. (Future: Admin only)
    """
    users = crud.crud_user.get_users(db, skip=skip, limit=limit)
    return users


# /me endpoint must be before /users/{user_id} due to path matching.
@router.get("/me", response_model=schemas.User)
def read_users_me(
    current_user: models.User = Depends(deps.get_current_user),
) -> models.User:
    """
    Get current user.
    """
    return current_user


@router.post("/me/password", status_code=status.HTTP_200_OK)
def change_password_me(
    *,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(deps.get_current_user),
    password_in: schemas.UserPasswordChange,
) -> dict:
    """
    Update current user's password.
    """
    if not security.verify_password(
        password_in.current_password, current_user.hashed_password
    ):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Incorrect current password",
        )

    # The crud_user.update_user function handles hashing the new password
    crud.crud_user.update_user(
        db=db, db_obj=current_user, obj_in={"password": password_in.new_password}
    )
    return {"msg": "Password updated successfully"}


@router.get("/{user_id}", response_model=schemas.User)
def read_user_by_id(
    user_id: int,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(deps.get_current_user),  # Added
) -> models.User:
    """
    Get a specific user by id. A user can only retrieve their own details.
    """
    if current_user.id != user_id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not authorized to access this user's details",
        )
    db_user = crud.crud_user.get_user(
        db, user_id=user_id
    )  # user_id here matches current_user.id
    if db_user is None:  # Should not happen if token is valid and user exists
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="User not found"
        )
    return db_user


@router.put("/{user_id}", response_model=schemas.User)
def update_user(
    *,
    db: Session = Depends(get_db),
    user_id: int,
    user_in: schemas.UserUpdate,
    current_user: models.User = Depends(deps.get_current_user),
) -> models.User:
    """
    Update a user.
    """
    db_user = crud.crud_user.get_user(db, user_id=user_id)
    if not db_user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="The user with this id does not exist in the system",
        )
    if current_user.id != db_user.id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not authorized to update this user",
        )
    user = crud.crud_user.update_user(db=db, db_obj=db_user, obj_in=user_in)
    return user


@router.delete("/{user_id}", response_model=schemas.User)
def delete_user(
    *,
    db: Session = Depends(get_db),
    user_id: int,
    current_user: models.User = Depends(deps.get_current_user),
) -> models.User:  # Or perhaps a status message
    """
    Delete a user. A user can only delete their own account.
    """
    user_to_delete = crud.crud_user.get_user(db, user_id=user_id)
    if not user_to_delete:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="User not found"
        )

    if current_user.id != user_to_delete.id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not authorized to delete this user",
        )

    # Consider what to do if deletion fails or if there are dependencies
    # Assuming remove_user is the correct CRUD function for deletion
    deleted_user_obj = crud.crud_user.remove_user(db=db, id=user_id)
    if not deleted_user_obj:  # Should not happen if get_user found it and auth passed
        raise HTTPException(
            status_code=(status.HTTP_500_INTERNAL_SERVER_ERROR),
            detail="Could not delete user after authorization",
        )
    return deleted_user_obj  # Return deleted user obj (or confirmation)
