"""Standard JSON response utilities for CreatorOS API.

Provides structured, predictable responses with appropriate HTTP status codes
and ensures internal stack traces are never exposed to the client.
"""
from typing import Any, Optional, Dict
from flask import jsonify, Response


def success_response(data: Any = None, message: Optional[str] = None, status_code: int = 200) -> tuple[Response, int]:
    """Return a uniform success response envelope."""
    payload: Dict[str, Any] = {
        "success": True,
        "data": data if data is not None else {}
    }
    if message:
        payload["message"] = message
    return jsonify(payload), status_code


def error_response(message: str, field: Optional[str] = None, status_code: int = 400, details: Any = None) -> tuple[Response, int]:
    """Return a uniform error response envelope."""
    error_obj: Dict[str, Any] = {
        "message": message
    }
    if field:
        error_obj["field"] = field
    if details:
        error_obj["details"] = details

    payload = {
        "success": False,
        "error": error_obj
    }
    return jsonify(payload), status_code
