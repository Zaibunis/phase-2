from __future__ import annotations

from fastapi import Header

from api.errors import unauthorized
from auth.jwt import extract_user_id, verify_jwt
from core.config import better_auth_secret


def get_current_user_id(authorization: str | None = Header(default=None)) -> str:
    if authorization is None or authorization.strip() == "":
        raise unauthorized()

    scheme, _, token = authorization.partition(" ")
    if scheme.lower() != "bearer" or token.strip() == "":
        raise unauthorized()

    try:
        claims = verify_jwt(token=token, secret=better_auth_secret())
    except Exception:
        # Intentionally avoid leaking auth failure details.
        raise unauthorized()

    user_id = extract_user_id(claims)
    if user_id is None:
        raise unauthorized("Token missing user identity.")

    return user_id
