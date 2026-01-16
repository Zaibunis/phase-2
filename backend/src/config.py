from pydantic_settings import BaseSettings
from functools import lru_cache
from typing import Optional

class Settings(BaseSettings):
    database_url: str
    better_auth_secret: Optional[str] = None

    api_host: str = "0.0.0.0"
    api_port: int = 8000

    jwt_secret: str
    jwt_algorithm: str = "HS256"
    jwt_expiration_minutes: int = 15
    jwt_refresh_expiration_hours: int = 168
    bcrypt_rounds: int = 12

    access_token_cookie_name: str = "access_token"
    refresh_token_cookie_name: str = "refresh_token"
    csrf_token_header_name: str = "x-csrf-token"
    csrf_secret: str = ""

    rate_limit_requests: int = 100
    rate_limit_window: int = 3600

    debug: bool = False
    log_level: str = "info"

    class Config:
        env_file = ".env"
        env_file_encoding = "utf-8"
        case_sensitive = False

@lru_cache()
def get_settings() -> Settings:
    return Settings()

settings = get_settings()
