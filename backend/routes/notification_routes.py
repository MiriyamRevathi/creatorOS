from flask import Blueprint

try:
    from backend.controllers import notification_controller
    from backend.middleware.auth import token_required
except ImportError:
    from controllers import notification_controller
    from middleware.auth import token_required

notification_bp = Blueprint('notifications', __name__, url_prefix='/api/notifications')

@notification_bp.route('', methods=['GET'])
@token_required
def get_notifications(current_user):
    return notification_controller.get_notifications(current_user)

@notification_bp.route('/<notification_id>/read', methods=['PUT'])
@token_required
def mark_read(current_user, notification_id):
    return notification_controller.mark_read(current_user, notification_id)

@notification_bp.route('/read-all', methods=['PUT'])
@token_required
def mark_all_read(current_user):
    return notification_controller.mark_all_read(current_user)

@notification_bp.route('/<notification_id>', methods=['DELETE'])
@token_required
def delete_notification(current_user, notification_id):
    return notification_controller.delete_notification(current_user, notification_id)
