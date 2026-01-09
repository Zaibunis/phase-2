from __future__ import annotations

from collections.abc import Generator
from functools import lru_cache

from sqlmodel import Session, SQLModel, create_engine

from core.config import database_url


@lru_cache(maxsize=1)
def get_engine():
    url = database_url()

    connect_args = None
    if url.startswith("sqlite"):
        connect_args = {"check_same_thread": False}

    return create_engine(
        url,
        echo=False,
        pool_pre_ping=True,
        connect_args=connect_args,
    )


def init_db() -> None:
    """Create tables if they do not exist.

    Note: this is intentionally minimal; migrations are out of scope for this task.
    """

    # Ensure models are imported/registered before create_all.
    from db import models  # noqa: F401

    SQLModel.metadata.create_all(get_engine())


def get_session() -> Generator[Session, None, None]:
    """FastAPI dependency-friendly session generator."""

    with Session(get_engine()) as session:
        yield session


def reset_engine_cache_for_tests() -> None:
    get_engine.cache_clear()
