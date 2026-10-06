"""CreatorOS Flask Application Factory.

Unified application incorporating Contributor 1 (Core, Auth, Dashboard, Onboarding)
and Contributor 2 (Ideas, Content Studio, Content Library).
"""
import os
import sys
from typing import Optional, Dict, Any
from flask import Flask, jsonify
from flask_cors import CORS

# Add backend directory to sys.path for flexible execution
backend_dir = os.path.dirname(os.path.abspath(__file__))
if backend_dir not in sys.path:
    sys.path.insert(0, backend_dir)

try:
    from routes.auth_routes import auth_bp
    from routes.creator_routes import creator_bp
    from routes.user_routes import user_bp
    from routes.notification_routes import notification_bp
    from routes.settings_routes import settings_bp
    from routes.ideas_routes import create_ideas_blueprint
    from routes.content_routes import create_content_blueprint
    from services.ideas_service import IdeasService
    from services.content_service import ContentService
except ImportError:
    from backend.routes.auth_routes import auth_bp
    from backend.routes.creator_routes import creator_bp
    from backend.routes.user_routes import user_bp
    from backend.routes.notification_routes import notification_bp
    from backend.routes.settings_routes import settings_bp
    from backend.routes.ideas_routes import create_ideas_blueprint
    from backend.routes.content_routes import create_content_blueprint
    from backend.services.ideas_service import IdeasService
    from backend.services.content_service import ContentService


def create_app(
    config: Optional[Dict[str, Any]] = None,
    ideas_service: Optional[IdeasService] = None,
    content_service: Optional[ContentService] = None,
) -> Flask:
    """Create and configure the unified CreatorOS Flask application."""
    app = Flask(__name__)

    # Default configuration
    app.config["JSON_SORT_KEYS"] = False
    if config:
        app.config.update(config)

    # Enable CORS for frontend integration
    CORS(app, resources={r"/api/*": {"origins": "*"}})

    # Register Contributor 1 Blueprints (Core, Auth, Profile, Notifications, Settings)
    app.register_blueprint(auth_bp)
    app.register_blueprint(creator_bp)
    app.register_blueprint(user_bp)
    app.register_blueprint(notification_bp)
    app.register_blueprint(settings_bp)

    # Register Contributor 2 Blueprints (Ideas, Content Studio & Content Library)
    ideas_bp = create_ideas_blueprint(service=ideas_service)
    app.register_blueprint(ideas_bp, url_prefix="/api/ideas")

    content_bp = create_content_blueprint(service=content_service)
    app.register_blueprint(content_bp, url_prefix="/api/content")

    # Global Health Check
    @app.route("/api/health", methods=["GET"])
    def health_check():
        return jsonify({
            "status": "online",
            "service": "CreatorOS API",
            "version": "1.0.0",
            "modules": {
                "contributor_1": "Core Platform, Auth & Onboarding",
                "contributor_2": "Ideas, Content Studio & Content Library"
            }
        }), 200

    @app.errorhandler(404)
    def not_found(error):
        return jsonify({"success": False, "error": True, "message": "Resource not found"}), 404

    @app.errorhandler(500)
    def server_error(error):
        return jsonify({"success": False, "error": True, "message": "Internal server error"}), 500

    return app


if __name__ == "__main__":
    app = create_app()
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port, debug=True)
