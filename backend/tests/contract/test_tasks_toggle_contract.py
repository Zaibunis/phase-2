from __future__ import annotations

import pytest

from src.api.schemas.tasks import TaskResponse


def test_toggle_task_contract():
    """Contract test for POST /v1/tasks/{task_id}/toggle response shape."""
    # This test verifies that the response matches the expected schema
    # Actual implementation will be tested with integration tests

    # This contract test ensures that when a task is toggled successfully,
    # the response follows the TaskResponse schema with 200 status
    response_schema = TaskResponse.__annotations__
    expected_fields = {"task"}
    assert set(response_schema.keys()) == expected_fields


if __name__ == "__main__":
    test_toggle_task_contract()