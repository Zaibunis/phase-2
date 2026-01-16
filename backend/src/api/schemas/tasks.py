from pydantic import BaseModel
from typing import Optional, List
from uuid import UUID
from datetime import datetime

# --- Task Model ---
class Task(BaseModel):
    id: UUID
    user_id: UUID
    title: str
    details: Optional[str] = None
    is_completed: bool
    created_at: datetime
    updated_at: datetime

# --- Single Task Response ---
class TaskResponse(BaseModel):
    task: Task

# --- List of Tasks Response ---
class TaskListResponse(BaseModel):
    tasks: List[Task]

# --- Create / Update Requests ---
class TaskCreate(BaseModel):
    title: str
    details: Optional[str] = None

class TaskUpdate(BaseModel):
    title: Optional[str] = None
    details: Optional[str] = None
    is_completed: Optional[bool] = None

# --- Aliases for tests ---
TaskCreateRequest = TaskCreate
TaskUpdateRequest = TaskUpdate
