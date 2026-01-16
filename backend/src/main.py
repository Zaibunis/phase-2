from fastapi import FastAPI, Request, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from contextlib import asynccontextmanager
import logging

from src.config import settings
from src.models.database import init_db
from src.api.routes.tasks import router as tasks_router
from src.api.routes.auth import router as auth_router

# Configure logging
logging.basicConfig(
    level=getattr(logging, settings.log_level.upper()),
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s"
)
logger = logging.getLogger(__name__)

@asynccontextmanager
async def lifespan(app: FastAPI):
    logger.info("Starting Task API Backend...")
    init_db()
    logger.info("Application startup complete")
    yield
    logger.info("Application shutdown complete")


app = FastAPI(
    title="Task API",
    description="RESTful API for task management with user isolation",
    version="1.0.0",
    lifespan=lifespan,
    docs_url="/docs",
    redoc_url="/redoc"
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://phase-2-git-002-frontend-app-faria-mustaqeems-projects.vercel.app/"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
    expose_headers=["Set-Cookie", "Authorization"]
)

# Include routers
app.include_router(tasks_router, prefix="/v1/tasks", tags=["tasks"])
app.include_router(auth_router, prefix="/auth", tags=["Authentication"])

# Health check
@app.get("/health", tags=["health"])
async def health_check():
    return {"status": "healthy"}

# Wrap 401/403 into {"error": ...} for test compatibility
from fastapi.exceptions import RequestValidationError
from starlette.exceptions import HTTPException as StarletteHTTPException

@app.exception_handler(StarletteHTTPException)
async def http_exception_handler(request: Request, exc: StarletteHTTPException):
    if exc.status_code in (401, 403):
        detail = exc.detail
        # If detail is dict, use its fields; otherwise just message
        if isinstance(detail, dict):
            return JSONResponse(status_code=exc.status_code, content={"error": detail})
        else:
            return JSONResponse(status_code=exc.status_code, content={"error": {"code": str(exc.status_code), "message": str(detail)}})
    return JSONResponse(status_code=exc.status_code, content={"detail": exc.detail})

@app.exception_handler(Exception)
async def global_exception_handler(request: Request, exc: Exception):
    logger.error(f"Unexpected error: {exc}", exc_info=True)
    return JSONResponse(
        status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
        content={"error": {"code": "INTERNAL_ERROR", "message": "An unexpected error occurred", "details": None}}
    )
