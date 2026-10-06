"""Content controller handlers for Content Studio and Content Library."""
from flask import request
from backend.services.content_service import ContentService
from backend.services.ideas_service import NotFoundError
from backend.services.local_assistant_service import LocalAssistantService
from backend.validators.idea_validator import ValidationError
from backend.utils.response import success_response, error_response


class ContentController:
    """Controller handling Content Studio & Library API requests."""

    def __init__(self, service: ContentService, assistant: LocalAssistantService = None):
        self.service = service
        self.assistant = assistant or LocalAssistantService()

    def list_content(self):
        """GET /api/content"""
        try:
            search = request.args.get("search")
            status = request.args.get("status")
            content_type = request.args.get("content_type")
            platform = request.args.get("platform")
            sort_by = request.args.get("sort_by", "updated_at")
            sort_order = request.args.get("sort_order", "desc")

            raw_tags = request.args.get("tags")
            tags = [t.strip() for t in raw_tags.split(",") if t.strip()] if raw_tags else None

            items = self.service.get_content_list(
                search=search,
                status=status,
                content_type=content_type,
                platform=platform,
                tags=tags,
                sort_by=sort_by,
                sort_order=sort_order,
            )
            return success_response(items)
        except Exception as e:
            return error_response(f"Failed to list content: {str(e)}", status_code=500)

    def get_content(self, content_id: str):
        """GET /api/content/<id>"""
        try:
            item = self.service.get_content_by_id(content_id)
            return success_response(item)
        except NotFoundError as e:
            return error_response(str(e), status_code=404)
        except Exception as e:
            return error_response(f"Failed to retrieve content item: {str(e)}", status_code=500)

    def create_content(self):
        """POST /api/content"""
        try:
            data = request.get_json(silent=True)
            if data is None:
                return error_response("Request body must be valid JSON", status_code=400)
            created = self.service.create_content(data)
            return success_response(created, message="Content created successfully", status_code=201)
        except ValidationError as e:
            return error_response(e.message, field=e.field, status_code=400)
        except Exception as e:
            return error_response(f"Failed to create content: {str(e)}", status_code=500)

    def update_content(self, content_id: str):
        """PUT /api/content/<id>"""
        try:
            data = request.get_json(silent=True)
            if data is None:
                return error_response("Request body must be valid JSON", status_code=400)
            updated = self.service.update_content(content_id, data)
            return success_response(updated, message="Content updated successfully")
        except NotFoundError as e:
            return error_response(str(e), status_code=404)
        except ValidationError as e:
            return error_response(e.message, field=e.field, status_code=400)
        except Exception as e:
            return error_response(f"Failed to update content: {str(e)}", status_code=500)

    def delete_content(self, content_id: str):
        """DELETE /api/content/<id>"""
        try:
            self.service.delete_content(content_id)
            return success_response({"id": content_id}, message="Content item deleted successfully")
        except NotFoundError as e:
            return error_response(str(e), status_code=404)
        except Exception as e:
            return error_response(f"Failed to delete content item: {str(e)}", status_code=500)

    def convert_idea(self, idea_id: str):
        """POST /api/content/convert-idea/<idea_id>"""
        try:
            extra = request.get_json(silent=True) or {}
            created = self.service.convert_idea_to_content(idea_id, extra_data=extra)
            return success_response(created, message="Idea converted to content draft successfully", status_code=201)
        except NotFoundError as e:
            return error_response(str(e), status_code=404)
        except ValidationError as e:
            return error_response(e.message, field=e.field, status_code=400)
        except Exception as e:
            return error_response(f"Failed to convert idea: {str(e)}", status_code=500)

    def get_stats(self):
        """GET /api/content/stats"""
        try:
            stats = self.service.get_stats()
            return success_response(stats)
        except Exception as e:
            return error_response(f"Failed to calculate content stats: {str(e)}", status_code=500)

    def demo_assist(self):
        """POST /api/content/demo-assist"""
        try:
            data = request.get_json(silent=True) or {}
            assist_type = data.get("type", "hooks")
            topic = data.get("topic", "")
            title = data.get("title", "")
            tags = data.get("tags", [])
            platform = data.get("platform", "YouTube")

            if assist_type == "hooks":
                results = self.assistant.generate_hooks(topic or title, content_type=data.get("content_type", "Video"))
            elif assist_type == "headlines":
                results = self.assistant.suggest_headlines(title or topic)
            elif assist_type == "hashtags":
                results = self.assistant.generate_hashtags(tags, platform=platform)
            else:
                return error_response(f"Unknown assistance type: {assist_type}", status_code=400)

            return success_response({"type": assist_type, "suggestions": results})
        except Exception as e:
            return error_response(f"Demo assistant error: {str(e)}", status_code=500)
