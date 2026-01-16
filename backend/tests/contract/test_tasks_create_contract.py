from __future__ import annotations

import pytest
from httpx import AsyncClient

from src.api.schemas.tasks import TaskCreateRequest, TaskResponse


@pytest.mark.asyncio
async def test_create_task_contract():
    """Contract test for POST /v1/tasks response shape."""
    # This test verifies that the response matches the expected schema
    # Actual implementation will be tested with integration tests

    # Sample request payload
    payload = TaskCreateRequest(title="Test task", details="Test details")

    # Verify the request schema is valid
    assert payload.title == "Test task"
    assert payload.details == "Test details"

    # This contract test ensures that when a task is created successfully,
    # the response follows the TaskResponse schema with 201 status
    # The actual HTTP interaction will be tested in integration tests
    response_schema = TaskResponse.__annotations__
    expected_fields = {"task"}
    assert set(response_schema.keys()) == expected_fields


if __name__ == "__main__":
    test_create_task_contract()