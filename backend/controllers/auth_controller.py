from flask import request, jsonify
from services.auth.auth_service import AuthService

auth_service = AuthService()

def register():
    try:
        data = request.get_json() or {}
        email = data.get("email")
        password = data.get("password")
        full_name = data.get("full_name", "")
        username = data.get("username", "")

        result = auth_service.register(email=email, password=password, full_name=full_name, username=username)
        return jsonify({"success": True, "data": result}), 201
    except ValueError as e:
        return jsonify({"success": False, "message": str(e)}), 400
    except Exception as e:
        return jsonify({"success": False, "message": f"Server error: {str(e)}"}), 500

def login():
    try:
        data = request.get_json() or {}
        email = data.get("email")
        password = data.get("password")

        result = auth_service.login(email=email, password=password)
        return jsonify({"success": True, "data": result}), 200
    except ValueError as e:
        return jsonify({"success": False, "message": str(e)}), 400
    except Exception as e:
        return jsonify({"success": False, "message": f"Server error: {str(e)}"}), 500

def forgot_password():
    try:
        data = request.get_json() or {}
        email = data.get("email")
        result = auth_service.request_password_reset(email)
        return jsonify({"success": True, "data": result}), 200
    except Exception as e:
        return jsonify({"success": False, "message": str(e)}), 500

def reset_password():
    try:
        data = request.get_json() or {}
        token = data.get("token")
        new_password = data.get("new_password")
        result = auth_service.reset_password(token, new_password)
        return jsonify({"success": True, "data": result}), 200
    except ValueError as e:
        return jsonify({"success": False, "message": str(e)}), 400
    except Exception as e:
        return jsonify({"success": False, "message": str(e)}), 500

def verify_account():
    try:
        data = request.get_json() or {}
        token = data.get("token")
        result = auth_service.verify_account(token)
        return jsonify({"success": True, "data": result}), 200
    except ValueError as e:
        return jsonify({"success": False, "message": str(e)}), 400
    except Exception as e:
        return jsonify({"success": False, "message": str(e)}), 500
