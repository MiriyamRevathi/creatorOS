"""CreatorOS Flask Application Factory."""
import os
from typing import Optional, Dict, Any
from flask import Flask, jsonify
from flask_cors import CORS
from backend.routes.ideas_routes import create_ideas_blueprint
from backend.routes.content_routes import create_content_blueprint
from backend.services.ideas_service import IdeasService
from backend.services.content_service import ContentService


def create_app(
    config: Optional[Dict[str, Any]] = None,
    ideas_service: Optional[IdeasService] = None,
    content_service: Optional[ContentService] = None,
) -> Flask:
    """Create and configure the CreatorOS Flask application."""
    app = Flask(__name__)

    # Default configuration
    app.config["JSON_SORT_KEYS"] = False
    if config:
        app.config.update(config)

    # Enable CORS for frontend integration
    CORS(app, resources={r"/api/*": {"origins": "*"}})

    # Register Ideas Blueprint
    ideas_bp = create_ideas_blueprint(service=ideas_service)
    app.register_blueprint(ideas_bp, url_prefix="/api/ideas")

    # Register Content Blueprint (Content Studio & Content Library)
    content_bp = create_content_blueprint(service=content_service)
    app.register_blueprint(content_bp, url_prefix="/api/content")

    # Global Health Check / Root route
    @app.route("/api/health", methods=["GET"])
    def health_check():
        return jsonify({
            "status": "healthy",
            "service": "CreatorOS API",
            "modules": {
                "contributor_2": "Ideas, Content Studio & Content Library"
            }
        }), 200

    @app.errorhandler(404)
    def not_found(e):
        return jsonify({"success": False, "error": {"message": "Resource or endpoint not found"}}), 404

    @app.errorhandler(500)
    def internal_error(e):
        return jsonify({"success": False, "error": {"message": "An internal server error occurred"}}), 500

    return app


if __name__ == "__main__":
    app = create_app()
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port, debug=True)
