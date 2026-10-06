from flask import request, jsonify
from services.creator.creator_service import CreatorService

creator_service = CreatorService()

def get_profile(current_user):
    try:
        profile = creator_service.get_profile_by_user_id(current_user.id)
        return jsonify({"success": True, "data": profile}), 200
    except Exception as e:
        return jsonify({"success": False, "message": str(e)}), 500

def update_profile(current_user):
    try:
        data = request.get_json() or {}
        updated = creator_service.update_profile(current_user.id, data)
        return jsonify({"success": True, "data": updated}), 200
    except Exception as e:
        return jsonify({"success": False, "message": str(e)}), 400

def update_preferences(current_user):
    try:
        data = request.get_json() or {}
        updated = creator_service.update_preferences(current_user.id, data)
        return jsonify({"success": True, "data": updated}), 200
    except Exception as e:
        return jsonify({"success": False, "message": str(e)}), 400

def add_portfolio_item(current_user):
    try:
        data = request.get_json() or {}
        updated = creator_service.add_portfolio_item(current_user.id, data)
        return jsonify({"success": True, "data": updated}), 201
    except ValueError as e:
        return jsonify({"success": False, "message": str(e)}), 400
    except Exception as e:
        return jsonify({"success": False, "message": str(e)}), 500

def delete_portfolio_item(current_user, item_id):
    try:
        updated = creator_service.remove_portfolio_item(current_user.id, item_id)
        return jsonify({"success": True, "data": updated}), 200
    except Exception as e:
        return jsonify({"success": False, "message": str(e)}), 400
