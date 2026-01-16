from __future__ import annotations

from fastapi.testclient import TestClient

from src.main import app


def test_auth_gating_integration():
    """Integration test for auth gating (401) on tasks endpoints."""
    client = TestClient(app)

    # Test GET /v1/tasks without auth header
    response = client.get("/v1/tasks")
    assert response.status_code == 401
    assert "error" in response.json()

    # Test POST /v1/tasks without auth header
    response = client.post("/v1/tasks", json={"title": "Test"})
    assert response.status_code == 401
    assert "error" in response.json()

    # Test with invalid auth header
    response = client.get("/v1/tasks", headers={"Authorization": "Bearer invalid_token"})
    assert response.status_code == 401
    assert "error" in response.json()

    response = client.post("/v1/tasks", json={"title": "Test"}, headers={"Authorization": "Bearer invalid_token"})
    assert response.status_code == 401
    assert "error" in response.json()


if __name__ == "__main__":
    test_auth_gating_integration()