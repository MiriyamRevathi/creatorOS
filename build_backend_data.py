import os
import json
import uuid

data_dir = r"D:\creator OS\backend\data"
folders = ["calendars", "projects", "tasks", "collaborations"]

seed_data = {
    "calendars": [
        {"id": str(uuid.uuid4()), "title": "Youtube Video Drop", "date": 12},
        {"id": str(uuid.uuid4()), "title": "Instagram Reels Batch", "date": 15},
        {"id": str(uuid.uuid4()), "title": "Podcast Recording", "date": 22}
    ],
    "projects": [
        {"id": str(uuid.uuid4()), "name": "Summer Vlog Series", "description": "Weekly vlogs focusing on summer travels."},
        {"id": str(uuid.uuid4()), "name": "Tech Review Collab", "description": "Reviewing the latest gadgets with a guest creator."}
    ],
    "tasks": [
        {"id": str(uuid.uuid4()), "title": "Edit summer vlog ep 1", "status": "In Progress"},
        {"id": str(uuid.uuid4()), "title": "Draft script for tech review", "status": "To Do"}
    ]
}

for folder in folders:
    folder_path = os.path.join(data_dir, folder)
    os.makedirs(folder_path, exist_ok=True)
    
    # Write seed data
    if folder in seed_data:
        for item in seed_data[folder]:
            file_path = os.path.join(folder_path, f"{item['id']}.json")
            if not os.path.exists(file_path):
                with open(file_path, "w", encoding="utf-8") as f:
                    json.dump(item, f, indent=4)

print("Backend data seeded.")
