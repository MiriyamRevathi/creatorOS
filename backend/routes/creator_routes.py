from flask import Blueprint
from controllers import creator_controller
from middleware.auth import token_required

creator_bp = Blueprint('creator', __name__, url_prefix='/api/creator')

@creator_bp.route('/profile', methods=['GET'])
@token_required
def get_profile(current_user):
    return creator_controller.get_profile(current_user)

@creator_bp.route('/profile', methods=['PUT'])
@token_required
def update_profile(current_user):
    return creator_controller.update_profile(current_user)

@creator_bp.route('/preferences', methods=['PUT'])
@token_required
def update_preferences(current_user):
    return creator_controller.update_preferences(current_user)

@creator_bp.route('/portfolio', methods=['POST'])
@token_required
def add_portfolio_item(current_user):
    return creator_controller.add_portfolio_item(current_user)

@creator_bp.route('/portfolio/<item_id>', methods=['DELETE'])
@token_required
def delete_portfolio_item(current_user, item_id):
    return creator_controller.delete_portfolio_item(current_user, item_id)
