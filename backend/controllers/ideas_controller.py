"""Ideas API controller handlers."""
from flask import request
from backend.services.ideas_service import IdeasService, NotFoundError
from backend.validators.idea_validator import ValidationError
from backend.utils.response import success_response, error_response


class IdeasController:
    """Controller delegating HTTP requests to IdeasService with clean error mapping."""

    def __init__(self, service: IdeasService):
        self.service = service

    def list_ideas(self):
        """GET /api/ideas"""
        try:
            search = request.args.get("search")
            status = request.args.get("status")
            content_type = request.args.get("content_type")
            priority = request.args.get("priority")
            sort_by = request.args.get("sort_by", "created_at")
            sort_order = request.args.get("sort_order", "desc")

            ideas = self.service.get_ideas(
                search=search,
                status=status,
                content_type=content_type,
                priority=priority,
                sort_by=sort_by,
                sort_order=sort_order,
            )
            return success_response(ideas)
        except Exception as e:
            return error_response(f"Failed to list ideas: {str(e)}", status_code=500)

    def get_idea(self, idea_id: str):
        """GET /api/ideas/<id>"""
        try:
            idea = self.service.get_idea_by_id(idea_id)
            return success_response(idea)
        except NotFoundError as e:
            return error_response(str(e), status_code=404)
        except Exception as e:
            return error_response(f"Failed to retrieve idea: {str(e)}", status_code=500)

    def create_idea(self):
        """POST /api/ideas"""
        try:
            data = request.get_json(silent=True)
            if data is None:
                return error_response("Request body must be valid JSON", status_code=400)
            created = self.service.create_idea(data)
            return success_response(created, message="Idea created successfully", status_code=201)
        except ValidationError as e:
            return error_response(e.message, field=e.field, status_code=400)
        except Exception as e:
            return error_response(f"Failed to create idea: {str(e)}", status_code=500)

    def update_idea(self, idea_id: str):
        """PUT /api/ideas/<id>"""
        try:
            data = request.get_json(silent=True)
            if data is None:
                return error_response("Request body must be valid JSON", status_code=400)
            updated = self.service.update_idea(idea_id, data)
            return success_response(updated, message="Idea updated successfully")
        except NotFoundError as e:
            return error_response(str(e), status_code=404)
        except ValidationError as e:
            return error_response(e.message, field=e.field, status_code=400)
        except Exception as e:
            return error_response(f"Failed to update idea: {str(e)}", status_code=500)

    def delete_idea(self, idea_id: str):
        """DELETE /api/ideas/<id>"""
        try:
            self.service.delete_idea(idea_id)
            return success_response({"id": idea_id}, message="Idea deleted successfully")
        except NotFoundError as e:
            return error_response(str(e), status_code=404)
        except Exception as e:
            return error_response(f"Failed to delete idea: {str(e)}", status_code=500)

    def get_stats(self):
        """GET /api/ideas/stats"""
        try:
            stats = self.service.get_stats()
            return success_response(stats)
        except Exception as e:
            return error_response(f"Failed to calculate stats: {str(e)}", status_code=500)
