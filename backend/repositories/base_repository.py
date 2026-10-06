"""
Base Repository for CreatorOS file-based JSON persistence.
Thread-safe and atomic file reading/writing without external database dependencies.
"""
import os
import json
import threading
from typing import List, Dict, Optional, Any, Callable

class BaseJSONRepository:
    def __init__(self, file_path: str):
        self.file_path = file_path
        self._lock = threading.Lock()
        self._ensure_file_exists()

    def _ensure_file_exists(self):
        os.makedirs(os.path.dirname(self.file_path), exist_ok=True)
        if not os.path.exists(self.file_path):
            with self._lock:
                with open(self.file_path, 'w', encoding='utf-8') as f:
                    json.dump([], f, indent=2)

    def find_all(self, predicate: Optional[Callable[[Dict[str, Any]], bool]] = None) -> List[Dict[str, Any]]:
        with self._lock:
            try:
                with open(self.file_path, 'r', encoding='utf-8') as f:
                    data = json.load(f)
                    if predicate:
                        return [item for item in data if predicate(item)]
                    return data
            except Exception as e:
                print(f"[BaseJSONRepository] Error reading {self.file_path}: {e}")
                return []

    def find_by_id(self, item_id: str) -> Optional[Dict[str, Any]]:
        items = self.find_all(lambda x: x.get('id') == item_id)
        return items[0] if items else None

    def create(self, item: Dict[str, Any]) -> Dict[str, Any]:
        with self._lock:
            try:
                with open(self.file_path, 'r', encoding='utf-8') as f:
                    data = json.load(f)
            except Exception:
                data = []

            # Check for existing duplicate ID
            for i, existing in enumerate(data):
                if existing.get('id') == item.get('id'):
                    data[i] = item
                    break
            else:
                data.append(item)

            temp_path = f"{self.file_path}.tmp"
            with open(temp_path, 'w', encoding='utf-8') as f:
                json.dump(data, f, indent=2)
            os.replace(temp_path, self.file_path)
            return item

    def update(self, item_id: str, updates: Dict[str, Any]) -> Optional[Dict[str, Any]]:
        with self._lock:
            try:
                with open(self.file_path, 'r', encoding='utf-8') as f:
                    data = json.load(f)
            except Exception:
                return None

            target = None
            for i, existing in enumerate(data):
                if existing.get('id') == item_id:
                    existing.update(updates)
                    data[i] = existing
                    target = existing
                    break

            if target:
                temp_path = f"{self.file_path}.tmp"
                with open(temp_path, 'w', encoding='utf-8') as f:
                    json.dump(data, f, indent=2)
                os.replace(temp_path, self.file_path)

            return target

    def delete(self, item_id: str) -> bool:
        with self._lock:
            try:
                with open(self.file_path, 'r', encoding='utf-8') as f:
                    data = json.load(f)
            except Exception:
                return False

            filtered = [item for item in data if item.get('id') != item_id]
            if len(filtered) == len(data):
                return False

            temp_path = f"{self.file_path}.tmp"
            with open(temp_path, 'w', encoding='utf-8') as f:
                json.dump(filtered, f, indent=2)
            os.replace(temp_path, self.file_path)
            return True
