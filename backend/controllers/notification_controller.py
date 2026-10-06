from flask import request, jsonify
from services.notifications.notification_service import NotificationService

notification_service = NotificationService()

def get_notifications(current_user):
    try:
        notifications = notification_service.get_user_notifications(current_user.id)
        return jsonify({"success": True, "data": notifications}), 200
    except Exception as e:
        return jsonify({"success": False, "message": str(e)}), 500

def mark_read(current_user, notification_id):
    try:
        result = notification_service.mark_read(notification_id, current_user.id)
        return jsonify({"success": True, "data": result}), 200
    except Exception as e:
        return jsonify({"success": False, "message": str(e)}), 400

def mark_all_read(current_user):
    try:
        result = notification_service.mark_all_read(current_user.id)
        return jsonify({"success": True, "data": result}), 200
    except Exception as e:
        return jsonify({"success": False, "message": str(e)}), 400

def delete_notification(current_user, notification_id):
    try:
        result = notification_service.delete_notification(notification_id, current_user.id)
        return jsonify({"success": True, "data": result}), 200
    except Exception as e:
        return jsonify({"success": False, "message": str(e)}), 400
