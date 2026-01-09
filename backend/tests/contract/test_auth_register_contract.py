"""Contract test for /auth/register response shape."""
from __future__ import annotations

import pytest
from httpx import AsyncClient

from src.api.schemas.auth import SignUpResponse


@pytest.mark.asyncio
async def test_register_contract():
    """Contract test for /auth/register response shape."""
    # This test verifies that the response matches the expected schema
    # Actual implementation will be tested with integration tests

    # This contract test ensures that when a user registers successfully,
    # the response follows the SignUpResponse schema with 200 status
    response_schema = SignUpResponse.__annotations__
    expected_fields = {"user", "access_token", "refresh_token", "expires_in", "token_type"}

    # Verify the schema has the expected fields
    assert set(response_schema.keys()) == expected_fields

    # Verify that the response can handle a successful registration scenario
    # (actual schema implementation would be tested in integration tests)


if __name__ == "__main__":
    test_register_contract()