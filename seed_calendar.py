import json
import os
from datetime import datetime, timedelta

base_dir = r'D:\creator OS\data\calendars'
os.makedirs(base_dir, exist_ok=True)
today = datetime.now()

events = [
    {'id': 'c2', 'title': 'Python Full Stack Tutorial', 'date': today.strftime('%Y-%m-%d'), 'time': '10:00', 'type': 'video', 'status': 'published'},
    {'id': 'c3', 'title': 'Instagram Reel - Behind the scenes', 'date': today.strftime('%Y-%m-%d'), 'time': '14:30', 'type': 'short', 'status': 'draft'},
    {'id': 'c4', 'title': 'Brand Campaign - Tech Review', 'date': (today + timedelta(days=1)).strftime('%Y-%m-%d'), 'time': '11:00', 'type': 'video', 'status': 'scheduled'},
    {'id': 'c5', 'title': 'Weekly Newsletter Drop', 'date': (today + timedelta(days=3)).strftime('%Y-%m-%d'), 'time': '09:00', 'type': 'text', 'status': 'scheduled'},
    {'id': 'c6', 'title': 'Podcast Recording', 'date': (today - timedelta(days=2)).strftime('%Y-%m-%d'), 'time': '15:00', 'type': 'audio', 'status': 'published'},
    {'id': 'c7', 'title': 'React Course Planning', 'date': (today + timedelta(days=7)).strftime('%Y-%m-%d'), 'time': '13:00', 'type': 'planning', 'status': 'scheduled'},
    {'id': 'c8', 'title': 'Monthly Q&A Stream', 'date': (today + timedelta(days=14)).strftime('%Y-%m-%d'), 'time': '18:00', 'type': 'stream', 'status': 'scheduled'},
]

for ev in events:
    with open(os.path.join(base_dir, f"{ev['id']}.json"), 'w') as f:
        json.dump(ev, f)

print('Successfully added mock calendar data')
