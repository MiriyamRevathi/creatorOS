import sys
import os

# Add root directory to python path for module imports
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

from flask import Flask, jsonify
from flask_cors import CORS

from backend.routes.analytics_routes import analytics_bp
from backend.routes.trend_routes import trend_bp

# Contributor 1 routes (handle both module paths gracefully)
try:
    from backend.routes.auth_routes import auth_bp
    from backend.routes.creator_routes import creator_bp
    from backend.routes.user_routes import user_bp
    from backend.routes.notification_routes import notification_bp
    from backend.routes.settings_routes import settings_bp
    C1_ROUTES_AVAILABLE = True
except ImportError:
    try:
        from routes.auth_routes import auth_bp
        from routes.creator_routes import creator_bp
        from routes.user_routes import user_bp
        from routes.notification_routes import notification_bp
        from routes.settings_routes import settings_bp
        C1_ROUTES_AVAILABLE = True
    except ImportError:
        C1_ROUTES_AVAILABLE = False

def create_app():
    app = Flask(__name__)
    CORS(app)

    # Register Contributor 4 Analytics & Trends Blueprints
    app.register_blueprint(analytics_bp)
    app.register_blueprint(trend_bp)

    # Register Contributor 1 Blueprints
    if C1_ROUTES_AVAILABLE:
        app.register_blueprint(auth_bp)
        app.register_blueprint(creator_bp)
        app.register_blueprint(user_bp)
        app.register_blueprint(notification_bp)
        app.register_blueprint(settings_bp)

    @app.route("/api/health", methods=["GET"])
    def health_check():
        return jsonify({
            "status": "online",
            "service": "CreatorOS Platform API",
            "version": "1.0.0"
        }), 200

    @app.errorhandler(404)
    def not_found(error):
        return jsonify({"error": True, "message": "Resource not found"}), 404

    @app.errorhandler(500)
    def server_error(error):
        return jsonify({"error": True, "message": "Internal server error"}), 500

    return app

if __name__ == "__main__":
    app = create_app()
    app.run(host="0.0.0.0", port=5000, debug=True)
