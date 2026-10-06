from flask import request, jsonify
from services.users.user_service import UserService

user_service = UserService()

def get_current_user(current_user):
    try:
        data = user_service.get_user(current_user.id)
        return jsonify({"success": True, "data": data}), 200
    except Exception as e:
        return jsonify({"success": False, "message": str(e)}), 404

def update_account_settings(current_user):
    try:
        data = request.get_json() or {}
        updated = user_service.update_account_settings(current_user.id, data)
        return jsonify({"success": True, "data": updated}), 200
    except Exception as e:
        return jsonify({"success": False, "message": str(e)}), 400

def change_password(current_user):
    try:
        data = request.get_json() or {}
        current_password = data.get("current_password")
        new_password = data.get("new_password")
        result = user_service.change_password(current_user.id, current_password, new_password)
        return jsonify({"success": True, "data": result}), 200
    except ValueError as e:
        return jsonify({"success": False, "message": str(e)}), 400
    except Exception as e:
        return jsonify({"success": False, "message": str(e)}), 500
