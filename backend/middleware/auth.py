from functools import wraps
from flask import request, jsonify
from services.auth.auth_service import AuthService

auth_service = AuthService()

def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = None
        if 'Authorization' in request.headers:
            auth_header = request.headers['Authorization']
            if auth_header.startswith('Bearer '):
                token = auth_header.split(' ')[1]
            else:
                token = auth_header

        if not token:
            return jsonify({'message': 'Token is missing!'}), 401

        current_user = auth_service.verify_token(token)
        if not current_user:
            return jsonify({'message': 'Token is invalid or expired!'}), 401

        return f(current_user, *args, **kwargs)
    return decorated
