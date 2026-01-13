"""User database model for authentication."""
from datetime import datetime
from typing import Optional
from uuid import UUID, uuid4

from sqlalchemy import DateTime, String, text
from sqlmodel import Field, SQLModel, Column


class UserBase(SQLModel):
    """Base model with common fields for User."""
    email: str = Field(sa_column=Column(String, nullable=False, unique=True))
    is_active: bool = Field(default=True, nullable=False)


class User(UserBase, table=True):
    """User entity for authentication.

    Attributes:
        id: Unique user identifier (UUID)
        email: User's email address (unique, indexed)
        is_active: Whether the account is active (default: True)
        created_at: Timestamp of account creation
        updated_at: Timestamp of last update
    """
    __tablename__ = "users"

    id: UUID = Field(default_factory=uuid4, primary_key=True, nullable=False)
    created_at: datetime = Field(
        sa_column=Column(DateTime(timezone=True), nullable=False, server_default=text("CURRENT_TIMESTAMP"))
    )
    updated_at: datetime = Field(
        sa_column=Column(DateTime(timezone=True), nullable=False, server_default=text("CURRENT_TIMESTAMP"), onupdate=text("CURRENT_TIMESTAMP"))
    )
    password_hash: str = Field(max_length=255)  # Keep password hash for authentication

    def __repr__(self) -> str:
        return f"<User id={self.id} email={self.email} is_active={self.is_active}>"