"""Content Flask Blueprint for Content Studio & Content Library."""
from typing import Optional
from flask import Blueprint
from backend.services.content_service import ContentService
from backend.services.local_assistant_service import LocalAssistantService
from backend.controllers.content_controller import ContentController


def create_content_blueprint(
    service: Optional[ContentService] = None,
    assistant: Optional[LocalAssistantService] = None,
    name: str = "content_bp",
) -> Blueprint:
    """Factory function for creating the content blueprint."""
    content_bp = Blueprint(name, __name__)
    content_service = service or ContentService()
    assistant_service = assistant or LocalAssistantService()
    controller = ContentController(content_service, assistant_service)

    content_bp.add_url_rule("", view_func=controller.list_content, methods=["GET"])
    content_bp.add_url_rule("/stats", view_func=controller.get_stats, methods=["GET"])
    content_bp.add_url_rule("/demo-assist", view_func=controller.demo_assist, methods=["POST"])
    content_bp.add_url_rule("/<content_id>", view_func=controller.get_content, methods=["GET"])
    content_bp.add_url_rule("", view_func=controller.create_content, methods=["POST"])
    content_bp.add_url_rule("/<content_id>", view_func=controller.update_content, methods=["PUT"])
    content_bp.add_url_rule("/<content_id>", view_func=controller.delete_content, methods=["DELETE"])
    content_bp.add_url_rule("/convert-idea/<idea_id>", view_func=controller.convert_idea, methods=["POST"])

    return content_bp
