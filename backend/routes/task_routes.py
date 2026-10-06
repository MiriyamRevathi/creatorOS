from flask import Blueprint
from controllers.task_controller import get_all, get_by_id, create, update, delete

task_bp = Blueprint('task_bp', __name__)

task_bp.route('/', methods=['GET'])(get_all)
task_bp.route('/<item_id>', methods=['GET'])(get_by_id)
task_bp.route('/', methods=['POST'])(create)
task_bp.route('/<item_id>', methods=['PUT'])(update)
task_bp.route('/<item_id>', methods=['DELETE'])(delete)
