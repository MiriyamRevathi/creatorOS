"""Base file-based repository implementation for CreatorOS.

Provides safe, atomic JSON file persistence without requiring an external database,
handling missing files, corruption recovery, and safe concurrent access.
"""
import os
import json
import logging
import threading
from datetime import datetime
from typing import List, Dict, Any, Optional

logger = logging.getLogger(__name__)


class BaseFileRepository:
    """Base repository handling JSON file persistence with atomic writes."""

    def __init__(self, file_path: str, default_seed_data: Optional[List[Dict[str, Any]]] = None):
        self.file_path = os.path.abspath(file_path)
        self.default_seed_data = default_seed_data or []
        self._lock = threading.Lock()
        self._ensure_storage()

    def _ensure_storage(self) -> None:
        """Ensure storage directory and initial file exist."""
        directory = os.path.dirname(self.file_path)
        if directory and not os.path.exists(directory):
            os.makedirs(directory, exist_ok=True)

        if not os.path.exists(self.file_path):
            self._write_raw(self.default_seed_data)

    def _read_raw(self) -> List[Dict[str, Any]]:
        """Safely read all items from the JSON file with corruption recovery."""
        if not os.path.exists(self.file_path):
            return list(self.default_seed_data)

        try:
            with open(self.file_path, "r", encoding="utf-8") as f:
                content = f.read().strip()
                if not content:
                    return []
                data = json.loads(content)
                if isinstance(data, list):
                    return data
                logger.warning("Expected list at %s, found %s. Resetting.", self.file_path, type(data))
                return []
        except (json.JSONDecodeError, OSError) as e:
            logger.error("Failed to read JSON from %s: %s. Creating backup.", self.file_path, e)
            try:
                backup_path = f"{self.file_path}.{datetime.now().strftime('%Y%m%d%H%M%S')}.bak"
                if os.path.exists(self.file_path):
                    os.rename(self.file_path, backup_path)
            except OSError:
                pass
            return list(self.default_seed_data)

    def _write_raw(self, items: List[Dict[str, Any]]) -> None:
        """Write items to file atomically using a temporary file and replace."""
        directory = os.path.dirname(self.file_path)
        if directory and not os.path.exists(directory):
            os.makedirs(directory, exist_ok=True)

        tmp_path = f"{self.file_path}.tmp"
        try:
            with open(tmp_path, "w", encoding="utf-8") as f:
                json.dump(items, f, indent=2, ensure_ascii=False)
                f.flush()
                os.fsync(f.fileno())
            os.replace(tmp_path, self.file_path)
        except OSError as e:
            logger.error("Failed to write atomically to %s: %s", self.file_path, e)
            if os.path.exists(tmp_path):
                try:
                    os.remove(tmp_path)
                except OSError:
                    pass
            raise

    def get_all(self) -> List[Dict[str, Any]]:
        """Retrieve all records."""
        with self._lock:
            return self._read_raw()

    def get_by_id(self, item_id: str) -> Optional[Dict[str, Any]]:
        """Retrieve a single record by its ID."""
        with self._lock:
            items = self._read_raw()
            for item in items:
                if str(item.get("id")) == str(item_id):
                    return dict(item)
            return None

    def insert(self, item: Dict[str, Any]) -> Dict[str, Any]:
        """Insert a new record."""
        with self._lock:
            items = self._read_raw()
            items.append(item)
            self._write_raw(items)
            return dict(item)

    def update(self, item_id: str, updates: Dict[str, Any]) -> Optional[Dict[str, Any]]:
        """Update an existing record by ID."""
        with self._lock:
            items = self._read_raw()
            for idx, item in enumerate(items):
                if str(item.get("id")) == str(item_id):
                    updated_item = {**item, **updates, "id": item["id"]}
                    items[idx] = updated_item
                    self._write_raw(items)
                    return dict(updated_item)
            return None

    def delete(self, item_id: str) -> bool:
        """Delete a record by ID."""
        with self._lock:
            items = self._read_raw()
            initial_len = len(items)
            filtered = [item for item in items if str(item.get("id")) != str(item_id)]
            if len(filtered) < initial_len:
                self._write_raw(filtered)
                return True
            return False

    def count(self) -> int:
        """Return total count of records."""
        with self._lock:
            return len(self._read_raw())
