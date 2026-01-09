"""JWT utility functions for token creation and verification."""
from datetime import datetime, timedelta
from typing import Any, Dict, Optional, Union
from uuid import UUID

import jwt
from fastapi import HTTPException, status
from jwt import DecodeError, ExpiredSignatureError

from src.config import settings


def create_access_token(
    user_id: Union[str, UUID],
    expires_delta: Optional[timedelta] = None,
    additional_claims: Optional[Dict[str, Any]] = None
) -> str:
    """
    Create an access token with user identity and additional claims.

    Args:
        user_id: User identifier (UUID or string)
        expires_delta: Token expiration duration (defaults to config value)
        additional_claims: Additional claims to include in token

    Returns:
        Encoded JWT access token string
    """
    if expires_delta is None:
        expires_delta = timedelta(minutes=settings.jwt_expiration_minutes)

    expire = datetime.utcnow() + expires_delta

    to_encode = {
        "sub": str(user_id),
        "user_id": str(user_id),
        "exp": expire,
        "iat": datetime.utcnow(),
        "type": "access"
    }

    if additional_claims:
        to_encode.update(additional_claims)

    encoded_jwt = jwt.encode(
        to_encode,
        settings.jwt_secret,
        algorithm=settings.jwt_algorithm
    )
    return encoded_jwt


def create_refresh_token(
    user_id: Union[str, UUID],
    expires_delta: Optional[timedelta] = None,
    additional_claims: Optional[Dict[str, Any]] = None
) -> str:
    """
    Create a refresh token with user identity and additional claims.

    Args:
        user_id: User identifier (UUID or string)
        expires_delta: Token expiration duration (defaults to config value)
        additional_claims: Additional claims to include in token

    Returns:
        Encoded JWT refresh token string
    """
    if expires_delta is None:
        expires_delta = timedelta(hours=settings.jwt_refresh_expiration_hours)

    expire = datetime.utcnow() + expires_delta

    to_encode = {
        "sub": str(user_id),
        "user_id": str(user_id),
        "exp": expire,
        "iat": datetime.utcnow(),
        "type": "refresh"
    }

    if additional_claims:
        to_encode.update(additional_claims)

    encoded_jwt = jwt.encode(
        to_encode,
        settings.jwt_secret,
        algorithm=settings.jwt_algorithm
    )
    return encoded_jwt


def verify_token(token: str) -> Dict[str, Any]:
    """
    Verify and decode a JWT token.

    Args:
        token: JWT token string to verify

    Returns:
        Decoded token payload

    Raises:
        HTTPException: If token is invalid, expired, or signature is incorrect
    """
    try:
        payload = jwt.decode(
            token,
            settings.jwt_secret,
            algorithms=[settings.jwt_algorithm]
        )
        return payload
    except ExpiredSignatureError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail={
                "error": {
                    "code": "token_expired",
                    "message": "Token has expired"
                }
            }
        )
    except DecodeError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail={
                "error": {
                    "code": "invalid_token",
                    "message": "Invalid token"
                }
            }
        )
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail={
                "error": {
                    "code": "token_verification_failed",
                    "message": f"Token verification failed: {str(e)}"
                }
            }
        )


def get_user_id_from_token(token: str) -> str:
    """
    Extract user_id from a JWT token.

    Args:
        token: JWT token string

    Returns:
        User ID extracted from token
    """
    payload = verify_token(token)
    user_id = payload.get("user_id")
    if not user_id:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail={
                "error": {
                    "code": "missing_user_id",
                    "message": "User ID not found in token"
                }
            }
        )
    return user_id


def is_token_valid(token: str) -> bool:
    """
    Check if a JWT token is valid (not expired and has valid signature).

    Args:
        token: JWT token string

    Returns:
        True if token is valid, False otherwise
    """
    try:
        verify_token(token)
        return True
    except HTTPException:
        return False
