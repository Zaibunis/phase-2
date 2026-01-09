"""User service for user operations."""
from typing import Optional
from uuid import UUID

from sqlmodel import Session, select

from src.models.user import User, UserCreate, UserUpdate


class UserService:
    """Service class for user operations."""

    def __init__(self, session: Session):
        self.session = session

    def get_user_by_id(self, user_id: UUID) -> Optional[User]:
        """Get a user by their ID."""
        statement = select(User).where(User.id == user_id)
        return self.session.exec(statement).first()

    def get_user_by_email(self, email: str) -> Optional[User]:
        """Get a user by their email address."""
        statement = select(User).where(User.email == email)
        return self.session.exec(statement).first()

    def create_user(self, user_data: UserCreate) -> User:
        """Create a new user."""
        # Check if user already exists
        existing_user = self.get_user_by_email(user_data.email)
        if existing_user:
            raise ValueError(f"User with email {user_data.email} already exists")

        # Hash the password
        from passlib.context import CryptContext
        pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

        hashed_password = pwd_context.hash(user_data.password)

        # Create user instance
        user = User(
            email=user_data.email,
            password_hash=hashed_password
        )

        # Add to session and commit
        self.session.add(user)
        self.session.commit()
        self.session.refresh(user)

        return user

    def update_user(self, user_id: UUID, user_update: UserUpdate) -> Optional[User]:
        """Update a user's information."""
        user = self.get_user_by_id(user_id)
        if not user:
            return None

        # Update fields if provided
        if user_update.email is not None:
            user.email = user_update.email
        if user_update.is_active is not None:
            user.is_active = user_update.is_active

        self.session.add(user)
        self.session.commit()
        self.session.refresh(user)

        return user

    def delete_user(self, user_id: UUID) -> bool:
        """Delete a user."""
        user = self.get_user_by_id(user_id)
        if not user:
            return False

        self.session.delete(user)
        self.session.commit()
        return True

    def authenticate_user(self, email: str, password: str) -> Optional[User]:
        """Authenticate a user by email and password."""
        from passlib.context import CryptContext
        pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

        user = self.get_user_by_email(email)
        if not user:
            return None

        if not pwd_context.verify(password, user.password_hash):
            return None

        return user