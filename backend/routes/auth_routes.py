from flask import Blueprint
from controllers import auth_controller

auth_bp = Blueprint('auth', __name__, url_prefix='/api/auth')

auth_bp.route('/register', methods=['POST'])(auth_controller.register)
auth_bp.route('/login', methods=['POST'])(auth_controller.login)
auth_bp.route('/forgot-password', methods=['POST'])(auth_controller.forgot_password)
auth_bp.route('/reset-password', methods=['POST'])(auth_controller.reset_password)
auth_bp.route('/verify-account', methods=['POST'])(auth_controller.verify_account)
