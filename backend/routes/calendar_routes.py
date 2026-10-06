from flask import Blueprint
from controllers.calendar_controller import get_all, get_by_id, create, update, delete

calendar_bp = Blueprint('calendar_bp', __name__)

calendar_bp.route('/', methods=['GET'])(get_all)
calendar_bp.route('/<item_id>', methods=['GET'])(get_by_id)
calendar_bp.route('/', methods=['POST'])(create)
calendar_bp.route('/<item_id>', methods=['PUT'])(update)
calendar_bp.route('/<item_id>', methods=['DELETE'])(delete)
