from flask import Blueprint
from controllers.collaboration_controller import get_all, get_by_id, create, update, delete

collaboration_bp = Blueprint('collaboration_bp', __name__)

collaboration_bp.route('/', methods=['GET'])(get_all)
collaboration_bp.route('/<item_id>', methods=['GET'])(get_by_id)
collaboration_bp.route('/', methods=['POST'])(create)
collaboration_bp.route('/<item_id>', methods=['PUT'])(update)
collaboration_bp.route('/<item_id>', methods=['DELETE'])(delete)
