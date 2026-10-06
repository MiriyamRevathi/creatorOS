"""CreatorOS Flask Application Factory.

Unified application incorporating:
- Contributor 1: Core Platform, Auth, Dashboard, Onboarding, Notifications, Settings
- Contributor 2: Ideas, Content Studio, Content Library
- Contributor 4: Analytics & Trends
"""
import os
import sys
from typing import Optional, Dict, Any
from flask import Flask, jsonify
from flask_cors import CORS

# Add root and backend directories to sys.path for flexible execution
root_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
backend_dir = os.path.dirname(os.path.abspath(__file__))
if root_dir not in sys.path:
    sys.path.insert(0, root_dir)
if backend_dir not in sys.path:
    sys.path.insert(0, backend_dir)

# Contributor 1 Blueprints
try:
    from backend.routes.auth_routes import auth_bp
    from backend.routes.creator_routes import creator_bp
    from backend.routes.user_routes import user_bp
    from backend.routes.notification_routes import notification_bp
    from backend.routes.settings_routes import settings_bp
    C1_AVAILABLE = True
except ImportError:
    try:
        from routes.auth_routes import auth_bp
        from routes.creator_routes import creator_bp
        from routes.user_routes import user_bp
        from routes.notification_routes import notification_bp
        from routes.settings_routes import settings_bp
        C1_AVAILABLE = True
    except ImportError:
        C1_AVAILABLE = False

# Contributor 2 Blueprints & Services
try:
    from backend.routes.ideas_routes import create_ideas_blueprint
    from backend.routes.content_routes import create_content_blueprint
    from backend.services.ideas_service import IdeasService
    from backend.services.content_service import ContentService
    C2_AVAILABLE = True
except ImportError:
    try:
        from routes.ideas_routes import create_ideas_blueprint
        from routes.content_routes import create_content_blueprint
        from services.ideas_service import IdeasService
        from services.content_service import ContentService
        C2_AVAILABLE = True
    except ImportError:
        C2_AVAILABLE = False
        IdeasService = Any  # type: ignore
        ContentService = Any  # type: ignore

# Contributor 4 Blueprints (Analytics & Trends)
try:
    from backend.routes.analytics_routes import analytics_bp
    from backend.routes.trend_routes import trend_bp
    C4_AVAILABLE = True
except ImportError:
    try:
        from routes.analytics_routes import analytics_bp
        from routes.trend_routes import trend_bp
        C4_AVAILABLE = True
    except ImportError:
        C4_AVAILABLE = False


def create_app(
    config: Optional[Dict[str, Any]] = None,
    ideas_service: Optional[Any] = None,
    content_service: Optional[Any] = None,
) -> Flask:
    """Create and configure the unified CreatorOS Flask application."""
    app = Flask(__name__)

    # Default configuration
    app.config["JSON_SORT_KEYS"] = False
    if config:
        app.config.update(config)

    # Enable CORS for frontend integration
    CORS(app, resources={r"/api/*": {"origins": "*"}})

    # Register Contributor 1 Blueprints
    if C1_AVAILABLE:
        app.register_blueprint(auth_bp)
        app.register_blueprint(creator_bp)
        app.register_blueprint(user_bp)
        app.register_blueprint(notification_bp)
        app.register_blueprint(settings_bp)

    # Register Contributor 2 Blueprints
    if C2_AVAILABLE:
        ideas_bp = create_ideas_blueprint(service=ideas_service)
        app.register_blueprint(ideas_bp, url_prefix="/api/ideas")

        content_bp = create_content_blueprint(service=content_service)
        app.register_blueprint(content_bp, url_prefix="/api/content")

    # Register Contributor 4 Blueprints
    if C4_AVAILABLE:
        app.register_blueprint(analytics_bp)
        app.register_blueprint(trend_bp)

    @app.route("/api/health", methods=["GET"])
    def health_check():
        return jsonify({
            "status": "online",
            "service": "CreatorOS Platform API",
            "version": "1.0.0",
            "modules": {
                "contributor_1": "Core Platform, Auth & Onboarding",
                "contributor_2": "Ideas, Content Studio & Content Library",
                "contributor_4": "Analytics & Trends"
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
