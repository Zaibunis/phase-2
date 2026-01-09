from __future__ import annotations

from datetime import datetime
from typing import Optional
from uuid import UUID, uuid4

from sqlalchemy import CheckConstraint, Column, DateTime, Index, Text, func
from sqlmodel import Field, Relationship, SQLModel


class User(SQLModel, table=True):
    __tablename__ = "users"

    # Stable unique identifier from the validated JWT claim.
    id: str = Field(primary_key=True)

    created_at: datetime = Field(
        sa_column=Column(DateTime(timezone=True), nullable=False, server_default=func.now())
    )

    tasks: list["Task"] = Relationship(back_populates="user")


class Task(SQLModel, table=True):
    __tablename__ = "tasks"
    __table_args__ = (
        CheckConstraint("length(title) > 0", name="ck_tasks_title_not_empty"),
        CheckConstraint("user_id IS NOT NULL", name="ck_tasks_user_id_not_null"),
        Index("ix_tasks_user_id_created_at", "user_id", "created_at"),
    )

    id: UUID = Field(default_factory=uuid4, primary_key=True)

    # Required ownership link. All queries must scope by user_id.
    user_id: str = Field(foreign_key="users.id", nullable=False)

    title: str = Field(nullable=False, min_length=1, max_length=200)
    details: Optional[str] = Field(default=None, sa_column=Column(Text, nullable=True))

    completed: bool = Field(default=False, nullable=False)

    created_at: datetime = Field(
        sa_column=Column(DateTime(timezone=True), nullable=False, server_default=func.now())
    )
    updated_at: datetime = Field(
        sa_column=Column(
            DateTime(timezone=True),
            nullable=False,
            server_default=func.now(),
            onupdate=func.now(),
        )
    )

    user: Optional[User] = Relationship(back_populates="tasks")