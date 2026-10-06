"""Ideas repository for CreatorOS."""
import os
from datetime import datetime, timezone
from typing import List, Dict, Any, Optional
from backend.repositories.base_repository import BaseFileRepository

DEFAULT_IDEAS_SEED: List[Dict[str, Any]] = [
    {
        "id": "idea-101",
        "title": "10 Architecture Patterns for Solo Creators in 2026",
        "description": "Deep-dive video covering modular systems, headless CMS, and zero-database setups.",
        "content_type": "Video",
        "tags": ["tech", "architecture", "productivity"],
        "priority": "High",
        "status": "Planned",
        "target_date": "2026-10-20",
        "converted_to_content_id": None,
        "created_at": "2026-10-01T09:00:00Z",
        "updated_at": "2026-10-01T09:00:00Z",
    },
    {
        "id": "idea-102",
        "title": "Behind the Scenes: Fast-Paced Video Editing Workflow",
        "description": "Short reel highlighting keyboard shortcuts, color grading LUTs, and timeline organization.",
        "content_type": "Reel",
        "tags": ["editing", "workflow", "shortcuts"],
        "priority": "Urgent",
        "status": "In Progress",
        "target_date": "2026-10-15",
        "converted_to_content_id": None,
        "created_at": "2026-10-02T11:30:00Z",
        "updated_at": "2026-10-02T11:30:00Z",
    },
    {
        "id": "idea-103",
        "title": "Solo Creator Monetization: Diversifying Beyond AdSense",
        "description": "Comprehensive newsletter issue detailing brand sponsorships, digital product store, and consulting.",
        "content_type": "Newsletter",
        "tags": ["monetization", "finance", "business"],
        "priority": "Medium",
        "status": "Backlog",
        "target_date": "2026-10-28",
        "converted_to_content_id": None,
        "created_at": "2026-10-03T14:15:00Z",
        "updated_at": "2026-10-03T14:15:00Z",
    },
    {
        "id": "idea-104",
        "title": "Why 90% of Creators Burn Out (And The Operating System Fix)",
        "description": "In-depth blog post on batch production, asynchronous planning, and mental stamina.",
        "content_type": "Blog",
        "tags": ["mindset", "productivity", "growth"],
        "priority": "High",
        "status": "Published",
        "target_date": "2026-10-04",
        "converted_to_content_id": None,
        "created_at": "2026-10-04T10:00:00Z",
        "updated_at": "2026-10-05T12:00:00Z",
    },
    {
        "id": "idea-105",
        "title": "Microphone Battle: Shure SM7B vs Dynamic USB Mic",
        "description": "Quick short audio comparison test for home studio recording.",
        "content_type": "Short",
        "tags": ["audio", "gear", "review"],
        "priority": "Low",
        "status": "Backlog",
        "target_date": None,
        "converted_to_content_id": None,
        "created_at": "2026-10-05T16:45:00Z",
        "updated_at": "2026-10-05T16:45:00Z",
    },
]


class IdeasRepository(BaseFileRepository):
    """File-based repository specifically for Ideas."""

    def __init__(self, file_path: Optional[str] = None):
        if not file_path:
            base_dir = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
            file_path = os.path.join(base_dir, "data", "ideas", "ideas.json")
        super().__init__(file_path=file_path, default_seed_data=DEFAULT_IDEAS_SEED)

    def filter_ideas(
        self,
        search: Optional[str] = None,
        status: Optional[str] = None,
        content_type: Optional[str] = None,
        priority: Optional[str] = None,
        sort_by: str = "created_at",
        sort_order: str = "desc",
    ) -> List[Dict[str, Any]]:
        """Filter and sort ideas based on criteria."""
        items = self.get_all()

        if search:
            query = search.strip().lower()
            items = [
                i
                for i in items
                if query in i.get("title", "").lower()
                or query in i.get("description", "").lower()
                or any(query in tag.lower() for tag in i.get("tags", []))
            ]

        if status:
            items = [i for i in items if i.get("status", "").lower() == status.strip().lower()]

        if content_type:
            items = [
                i
                for i in items
                if i.get("content_type", "").lower() == content_type.strip().lower()
            ]

        if priority:
            items = [
                i
                for i in items
                if i.get("priority", "").lower() == priority.strip().lower()
            ]

        # Sorting
        reverse = sort_order.lower() == "desc"
        priority_weights = {"urgent": 4, "high": 3, "medium": 2, "low": 1}

        if sort_by == "priority":
            items.sort(
                key=lambda x: priority_weights.get(str(x.get("priority", "")).lower(), 0),
                reverse=reverse,
            )
        elif sort_by == "title":
            items.sort(key=lambda x: str(x.get("title", "")).lower(), reverse=reverse)
        elif sort_by == "target_date":
            # Sort None/empty dates at the end
            items.sort(
                key=lambda x: (x.get("target_date") is None or x.get("target_date") == "", x.get("target_date") or ""),
                reverse=reverse,
            )
        elif sort_by == "updated_at":
            items.sort(key=lambda x: x.get("updated_at", ""), reverse=reverse)
        else:  # default to created_at
            items.sort(key=lambda x: x.get("created_at", ""), reverse=reverse)

        return items

    def get_stats(self) -> Dict[str, Any]:
        """Compute aggregated statistics for ideas."""
        items = self.get_all()
        total = len(items)

        by_status: Dict[str, int] = {}
        by_type: Dict[str, int] = {}
        by_priority: Dict[str, int] = {}

        for item in items:
            st = item.get("status", "Unknown")
            by_status[st] = by_status.get(st, 0) + 1

            ct = item.get("content_type", "Unknown")
            by_type[ct] = by_type.get(ct, 0) + 1

            pr = item.get("priority", "Unknown")
            by_priority[pr] = by_priority.get(pr, 0) + 1

        return {
            "total": total,
            "by_status": by_status,
            "by_content_type": by_type,
            "by_priority": by_priority,
            "planned_count": by_status.get("Planned", 0),
            "in_progress_count": by_status.get("In Progress", 0),
            "backlog_count": by_status.get("Backlog", 0),
            "published_count": by_status.get("Published", 0),
        }
