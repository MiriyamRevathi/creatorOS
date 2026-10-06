from flask import request, jsonify
from repositories.repository import JsonRepository
import os

repo = JsonRepository(os.path.join(os.path.dirname(__file__), '..', '..', 'data', 'tasks'))

def get_all():
    return jsonify(repo.get_all())

def get_by_id(item_id):
    item = repo.get_by_id(item_id)
    if item:
        return jsonify(item)
    return jsonify({'error': 'Not found'}), 404

def create():
    data = request.json
    item = repo.create(data)
    return jsonify(item), 201

def update(item_id):
    data = request.json
    item = repo.update(item_id, data)
    if item:
        return jsonify(item)
    return jsonify({'error': 'Not found'}), 404

def delete(item_id):
    if repo.delete(item_id):
        return jsonify({'message': 'Deleted'}), 200
    return jsonify({'error': 'Not found'}), 404
