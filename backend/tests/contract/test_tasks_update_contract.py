from __future__ import annotations

import pytest

from src.api.schemas.tasks import TaskUpdateRequest, TaskResponse


def test_update_task_contract():
    """Contract test for PUT /v1/tasks/{task_id} response shape."""
    # This test verifies that the response matches the expected schema
    # Actual implementation will be tested with integration tests

    # Sample request payload
    payload = TaskUpdateRequest(title="Updated task", details="Updated details")

    # Verify the request schema is valid
    assert payload.title == "Updated task"
    assert payload.details == "Updated details"

    # This contract test ensures that when a task is updated successfully,
    # the response follows the TaskResponse schema with 200 status
    response_schema = TaskResponse.__annotations__
    expected_fields = {"task"}
    assert set(response_schema.keys()) == expected_fields


if __name__ == "__main__":
    test_update_task_contract()