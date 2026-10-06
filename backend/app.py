from flask import Flask
from flask_cors import CORS
from routes.calendar_routes import calendar_bp
from routes.project_routes import project_bp
from routes.task_routes import task_bp
from routes.collaboration_routes import collaboration_bp as collab_bp

app = Flask(__name__)
CORS(app)

app.register_blueprint(calendar_bp, url_prefix='/api/calendar')
app.register_blueprint(project_bp, url_prefix='/api/projects')
app.register_blueprint(task_bp, url_prefix='/api/tasks')
app.register_blueprint(collab_bp, url_prefix='/api/collaborations')

if __name__ == '__main__':
    app.run(port=5000, debug=True)
