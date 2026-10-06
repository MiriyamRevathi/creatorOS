from flask import Blueprint, jsonify, request

try:
    from backend.middleware.auth import token_required
except ImportError:
    from middleware.auth import token_required

settings_bp = Blueprint('settings', __name__, url_prefix='/api/settings')

# Mock settings store for appearance, privacy, security, and notification preferences
_user_settings = {}

@settings_bp.route('', methods=['GET'])
@token_required
def get_settings(current_user):
    settings = _user_settings.get(current_user.id, {
        "privacy": {
            "profile_visibility": "public",
            "show_email": False,
            "show_stats": True,
            "allow_collaboration_requests": True
        },
        "security": {
            "two_factor_enabled": False,
            "login_alerts": True,
            "session_timeout_mins": 30
        },
        "appearance": {
            "theme": "system",
            "compact_mode": False,
            "primary_color": "#412653",
            "sidebar_collapsed": False
        },
        "notifications": {
            "email_notifications": True,
            "push_notifications": True,
            "campaign_alerts": True,
            "weekly_digest": True,
            "marketing_updates": False
        }
    })
    return jsonify({"success": True, "data": settings}), 200

@settings_bp.route('/<section>', methods=['PUT'])
@token_required
def update_settings_section(current_user, section):
    data = request.get_json() or {}
    if current_user.id not in _user_settings:
        _user_settings[current_user.id] = {
            "privacy": {"profile_visibility": "public", "show_email": False, "show_stats": True, "allow_collaboration_requests": True},
            "security": {"two_factor_enabled": False, "login_alerts": True, "session_timeout_mins": 30},
            "appearance": {"theme": "system", "compact_mode": False, "primary_color": "#412653", "sidebar_collapsed": False},
            "notifications": {"email_notifications": True, "push_notifications": True, "campaign_alerts": True, "weekly_digest": True, "marketing_updates": False}
        }
    if section in _user_settings[current_user.id]:
        _user_settings[current_user.id][section].update(data)
    else:
        _user_settings[current_user.id][section] = data
    return jsonify({"success": True, "data": _user_settings[current_user.id][section]}), 200
