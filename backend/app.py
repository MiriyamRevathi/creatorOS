import sys
import os

# Add root directory to python path for module imports
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

from flask import Flask, jsonify
from flask_cors import CORS
from backend.routes.analytics_routes import analytics_bp
from backend.routes.trend_routes import trend_bp

def create_app():
    app = Flask(__name__)
    CORS(app)

    # Register blueprints
    app.register_blueprint(analytics_bp)
    app.register_blueprint(trend_bp)

    @app.route("/api/health", methods=["GET"])
    def health_check():
        return jsonify({
            "status": "online",
            "service": "CreatorOS Analytics & Trends Service",
            "version": "1.0.0"
        })

    return app

if __name__ == "__main__":
    app = create_app()
    app.run(host="0.0.0.0", port=5000, debug=True)
