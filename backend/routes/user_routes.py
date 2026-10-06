from flask import Blueprint
from controllers import user_controller
from middleware.auth import token_required

user_bp = Blueprint('users', __name__, url_prefix='/api/users')

@user_bp.route('/me', methods=['GET'])
@token_required
def get_me(current_user):
    return user_controller.get_current_user(current_user)

@user_bp.route('/account', methods=['PUT'])
@token_required
def update_account(current_user):
    return user_controller.update_account_settings(current_user)

@user_bp.route('/password', methods=['PUT'])
@token_required
def change_password(current_user):
    return user_controller.change_password(current_user)
