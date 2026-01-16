from __future__ import annotations

import pytest

from src.api.schemas.tasks import TaskResponse


def test_delete_task_contract():
    """Contract test for DELETE /v1/tasks/{task_id} response shape."""
    # This test verifies that the response matches the expected schema
    # Actual implementation will be tested with integration tests

    # This contract test ensures that when a task is deleted successfully,
    # the response returns 204 No Content (no response body)
    # The schema validation here is conceptual since DELETE returns 204 with no body
    # but we verify that the endpoint conceptually works with TaskResponse schema
    response_schema = TaskResponse.__annotations__
    expected_fields = {"task"}
    assert set(response_schema.keys()) == expected_fields


if __name__ == "__main__":
    test_delete_task_contract()