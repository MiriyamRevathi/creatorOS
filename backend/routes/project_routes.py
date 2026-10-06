from flask import Blueprint
from controllers.project_controller import get_all, get_by_id, create, update, delete

project_bp = Blueprint('project_bp', __name__)

project_bp.route('/', methods=['GET'])(get_all)
project_bp.route('/<item_id>', methods=['GET'])(get_by_id)
project_bp.route('/', methods=['POST'])(create)
project_bp.route('/<item_id>', methods=['PUT'])(update)
project_bp.route('/<item_id>', methods=['DELETE'])(delete)
