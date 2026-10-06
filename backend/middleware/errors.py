from flask import jsonify

def handle_error(error):
    status_code = getattr(error, 'code', 500)
    message = str(error)
    if hasattr(error, 'description'):
        message = error.description
    return jsonify({
        'error': True,
        'message': message,
        'status_code': status_code
    }), status_code

def handle_validation_error(error):
    return jsonify({
        'error': True,
        'message': str(error),
        'status_code': 400
    }), 400
