"""Ideas Flask Blueprint."""
from typing import Optional
from flask import Blueprint
from backend.services.ideas_service import IdeasService
from backend.controllers.ideas_controller import IdeasController


def create_ideas_blueprint(service: Optional[IdeasService] = None, name: str = "ideas_bp") -> Blueprint:
    """Factory function for creating the ideas blueprint."""
    ideas_bp = Blueprint(name, __name__)
    ideas_service = service or IdeasService()
    controller = IdeasController(ideas_service)

    ideas_bp.add_url_rule("", view_func=controller.list_ideas, methods=["GET"])
    ideas_bp.add_url_rule("/stats", view_func=controller.get_stats, methods=["GET"])
    ideas_bp.add_url_rule("/<idea_id>", view_func=controller.get_idea, methods=["GET"])
    ideas_bp.add_url_rule("", view_func=controller.create_idea, methods=["POST"])
    ideas_bp.add_url_rule("/<idea_id>", view_func=controller.update_idea, methods=["PUT"])
    ideas_bp.add_url_rule("/<idea_id>", view_func=controller.delete_idea, methods=["DELETE"])

    return ideas_bp
