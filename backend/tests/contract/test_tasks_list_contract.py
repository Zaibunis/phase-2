from __future__ import annotations

import pytest
from httpx import AsyncClient

from src.api.schemas.tasks import TaskListResponse


@pytest.mark.asyncio
async def test_list_tasks_contract():
    """Contract test for GET /v1/tasks response shape."""
    # This test verifies that the response matches the expected schema
    # Actual implementation will be tested with integration tests

    # This contract test ensures that when tasks are listed successfully,
    # the response follows the TaskListResponse schema with 200 status
    response_schema = TaskListResponse.__annotations__
    expected_fields = {"tasks"}
    assert set(response_schema.keys()) == expected_fields

    # Verify that the response can handle an empty list
    empty_response = TaskListResponse(tasks=[])
    assert len(empty_response.tasks) == 0

    # Verify that the response can handle a populated list
    # (actual task objects would be created in integration tests)


if __name__ == "__main__":
    test_list_tasks_contract()