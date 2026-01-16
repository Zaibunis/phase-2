"""Task API endpoints."""
from uuid import UUID
from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlmodel import Session, select

from src.models.database import get_session
from src.models.tasks import Task
from src.api.schemas.tasks import TaskCreate, TaskUpdate, TaskResponse
from src.api.dependencies.auth import get_current_user, TokenUser
from src.api.schemas.errors import ValidationError, NotFoundError

router = APIRouter()


class TaskService:
    """Service class for task operations."""

    def __init__(self, session: Session):
        self.session = session

    def create_task(self, user_id: UUID, task_data: TaskCreate) -> Task:
        if not task_data.title or not task_data.title.strip():
            raise ValidationError(message="Title is required and cannot be empty")
        task = Task(
            user_id=user_id,
            title=task_data.title.strip(),
            description=task_data.details,  # matches test 'details'
        )
        self.session.add(task)
        self.session.commit()
        self.session.refresh(task)
        return task

    def get_tasks(self, user_id: UUID, page: int = 1, page_size: int = 20) -> list[Task]:
        offset = (page - 1) * page_size
        query = select(Task).where(Task.user_id == user_id)
        return self.session.exec(query.offset(offset).limit(page_size)).all()

    def get_task(self, user_id: UUID, task_id: UUID) -> Task:
        task = self.session.exec(
            select(Task).where(Task.id == task_id, Task.user_id == user_id)
        ).first()
        if not task:
            raise NotFoundError(resource="Task", resource_id=str(task_id))
        return task

    def update_task(self, user_id: UUID, task_id: UUID, task_data: TaskUpdate) -> Task:
        task = self.get_task(user_id, task_id)
        if task_data.title is not None:
            if not task_data.title.strip():
                raise ValidationError(message="Title cannot be empty")
            task.title = task_data.title.strip()
        if task_data.details is not None:
            task.description = task_data.details
        if task_data.is_completed is not None:
            task.is_completed = task_data.is_completed
        from datetime import datetime
        task.updated_at = datetime.utcnow()
        self.session.commit()
        self.session.refresh(task)
        return task

    def delete_task(self, user_id: UUID, task_id: UUID) -> None:
        task = self.get_task(user_id, task_id)
        self.session.delete(task)
        self.session.commit()


def get_task_service(session: Session = Depends(get_session)) -> TaskService:
    return TaskService(session)


# ---------------- ROUTES ---------------- #

@router.post("", status_code=status.HTTP_201_CREATED)
async def create_task(
    task_data: TaskCreate,
    service: TaskService = Depends(get_task_service),
    current_user: TokenUser = Depends(get_current_user),
):
    task = service.create_task(current_user.user_id, task_data)
    return {"task": TaskResponse.model_validate(task)}


@router.get("")
async def list_tasks(
    page: int = Query(1, ge=1),
    page_size: int = Query(20, ge=1, le=100),
    service: TaskService = Depends(get_task_service),
    current_user: TokenUser = Depends(get_current_user),
):
    tasks = service.get_tasks(current_user.user_id, page, page_size)
    return {"tasks": [TaskResponse.model_validate(t) for t in tasks]}


@router.get("/{task_id}")
async def get_task(
    task_id: UUID,
    service: TaskService = Depends(get_task_service),
    current_user: TokenUser = Depends(get_current_user),
):
    task = service.get_task(current_user.user_id, task_id)
    return {"task": TaskResponse.model_validate(task)}


@router.put("/{task_id}")
@router.patch("/{task_id}")
async def update_task(
    task_id: UUID,
    task_data: TaskUpdate,
    service: TaskService = Depends(get_task_service),
    current_user: TokenUser = Depends(get_current_user),
):
    task = service.update_task(current_user.user_id, task_id, task_data)
    return {"task": TaskResponse.model_validate(task)}


@router.delete("/{task_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_task(
    task_id: UUID,
    service: TaskService = Depends(get_task_service),
    current_user: TokenUser = Depends(get_current_user),
):
    service.delete_task(current_user.user_id, task_id)
    return None
