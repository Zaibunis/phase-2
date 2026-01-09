import os

from dotenv import load_dotenv


load_dotenv()


def get_env(name: str) -> str:
    value = os.getenv(name)
    if value is None or value.strip() == "":
        raise RuntimeError(f"Missing required environment variable: {name}")
    return value


def database_url() -> str:
    return get_env("DATABASE_URL")


def better_auth_secret() -> str:
    return get_env("BETTER_AUTH_SECRET")
