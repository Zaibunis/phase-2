"""API error handlers for authentication and other failures."""
from typing import Any, Dict, Optional
from fastapi import HTTPException, Request
from fastapi.responses import JSONResponse
from fastapi.exceptions import RequestValidationError


class APIError(Exception):
    """Base API error class for consistent error handling."""

    def __init__(self, code: str, message: str, details: Optional[Dict[str, Any]] = None):
        self.code = code
        self.message = message
        self.details = details or {}
        super().__init__(self.message)

    def to_dict(self) -> Dict[str, Any]:
        """Convert error to dictionary format for API responses."""
        return {
            "error": {
                "code": self.code,
                "message": self.message,
                "details": self.details
            }
        }


class AuthenticationError(APIError):
    """Error raised when authentication fails."""

    def __init__(self, message: str = "Authentication failed", details: Optional[Dict[str, Any]] = None):
        super().__init__(code="AUTHENTICATION_FAILED", message=message, details=details)


class AuthorizationError(APIError):
    """Error raised when authorization fails (user not authorized for resource)."""

    def __init__(self, message: str = "Not authorized", details: Optional[Dict[str, Any]] = None):
        super().__init__(code="NOT_AUTHORIZED", message=message, details=details)


class ValidationError(APIError):
    """Error raised when request validation fails."""

    def __init__(self, message: str = "Validation failed", details: Optional[Dict[str, Any]] = None):
        super().__init__(code="VALIDATION_ERROR", message=message, details=details)


class ResourceNotFoundError(APIError):
    """Error raised when requested resource is not found."""

    def __init__(self, resource: str, resource_id: str, details: Optional[Dict[str, Any]] = None):
        message = f"{resource} with ID {resource_id} not found"
        super().__init__(code="RESOURCE_NOT_FOUND", message=message, details=details)


# Exception handlers for FastAPI
async def handle_api_error(request: Request, exc: APIError) -> JSONResponse:
    """Handle APIError exceptions."""
    return JSONResponse(
        status_code=400,
        content=exc.to_dict()
    )


async def handle_authentication_error(request: Request, exc: AuthenticationError) -> JSONResponse:
    """Handle authentication errors with 401 status."""
    return JSONResponse(
        status_code=401,
        content=exc.to_dict()
    )


async def handle_authorization_error(request: Request, exc: AuthorizationError) -> JSONResponse:
    """Handle authorization errors with 403 status."""
    return JSONResponse(
        status_code=403,
        content=exc.to_dict()
    )


async def handle_validation_error(request: Request, exc: RequestValidationError) -> JSONResponse:
    """Handle request validation errors."""
    errors = []
    for error in exc.errors():
        errors.append({
            "loc": error["loc"],
            "msg": error["msg"],
            "type": error["type"]
        })

    validation_error = ValidationError(
        message="Request validation failed",
        details={"errors": errors}
    )
    return JSONResponse(
        status_code=422,
        content=validation_error.to_dict()
    )


async def handle_resource_not_found_error(request: Request, exc: ResourceNotFoundError) -> JSONResponse:
    """Handle resource not found errors with 404 status."""
    return JSONResponse(
        status_code=404,
        content=exc.to_dict()
    )


# HTTPException handler for consistent error format
async def handle_http_exception(request: Request, exc: HTTPException) -> JSONResponse:
    """Handle HTTPException with consistent error format."""
    # If the exception already has our error format, return as-is
    if isinstance(exc.detail, dict) and "error" in exc.detail:
        return JSONResponse(
            status_code=exc.status_code,
            content=exc.detail
        )

    # Otherwise, format it consistently
    error = APIError(
        code="HTTP_EXCEPTION",
        message=str(exc.detail),
        details={"status_code": exc.status_code}
    )
    return JSONResponse(
        status_code=exc.status_code,
        content=error.to_dict()
    )