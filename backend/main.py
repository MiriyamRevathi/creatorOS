"""
CreatorOS - Creator-to-Brand Marketplace Main Backend Server
Zero External Database - File-based JSON Persistence Engine
"""
import os
import sys

# Ensure backend root is on Python path
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

try:
    from fastapi import FastAPI, Request
    from fastapi.middleware.cors import CORSMiddleware
    from fastapi.responses import JSONResponse
    from backend.routes.brand_routes import setup_brand_routes
    from backend.routes.campaign_routes import setup_campaign_routes
    from backend.routes.application_routes import setup_application_routes
    from backend.routes.contract_routes import setup_contract_routes
    from backend.routes.deliverable_routes import setup_deliverable_routes

    app = FastAPI(
        title="CreatorOS - Brand Marketplace API",
        description="Unified backend service for Creator-to-Brand marketplace discovery, proposals, contracts & deliverable tracking.",
        version="1.0.0"
    )

    # Allow CORS for local Vite dev server and unified frontend
    app.add_middleware(
        CORSMiddleware,
        allow_origins=["*"],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    # Health check
    @app.get("/api/health")
    async def health():
        return {
            "status": "healthy",
            "module": "Creator-to-Brand Marketplace",
            "storage": "File-based JSON Repository",
            "version": "1.0.0"
        }

    # Mount Route Blueprints
    setup_brand_routes(app)
    setup_campaign_routes(app)
    setup_application_routes(app)
    setup_contract_routes(app)
    setup_deliverable_routes(app)

except ImportError:
    # Minimal fallback server implementation using standard library http.server if fastapi is not in env
    from http.server import HTTPServer, SimpleHTTPRequestHandler
    app = None

if __name__ == "__main__":
    try:
        import uvicorn
        print("🚀 Starting CreatorOS Marketplace API on http://localhost:8000 ...")
        uvicorn.run("backend.main:app", host="0.0.0.0", port=8000, reload=True)
    except Exception as ex:
        print(f"To run with uvicorn: uvicorn backend.main:app --port 8000. Error: {ex}")
