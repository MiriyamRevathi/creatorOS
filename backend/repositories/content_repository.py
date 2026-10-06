"""Content repository for CreatorOS Content Studio & Library."""
import os
from typing import List, Dict, Any, Optional
from backend.repositories.base_repository import BaseFileRepository

DEFAULT_CONTENT_SEED: List[Dict[str, Any]] = [
    {
        "id": "content-201",
        "title": "Mastering Modular Architecture for Creator Platforms",
        "content_type": "Video",
        "platform": "YouTube",
        "status": "Published",
        "description": "Comprehensive tutorial on building multi-contributor web applications with clean boundaries.",
        "body": "HOOK: What if I told you that 90% of solo creator platforms break not because of lack of users, but bad file boundaries?\n\nIn this video, we break down:\n1. The 7-tier architecture system\n2. Why avoiding bloated databases gives you 10x agility\n3. Writing atomic file-based repositories\n\nDrop a comment below with your current tech stack!",
        "tags": ["architecture", "webdev", "youtube", "tutorial"],
        "source_idea_id": "idea-101",
        "thumbnail_url": "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600&auto=format&fit=crop",
        "target_date": "2026-10-04",
        "published_date": "2026-10-04T18:00:00Z",
        "metadata": {
            "character_count": 398,
            "word_count": 68,
            "reading_time_minutes": 1,
            "estimated_duration_seconds": 31,
        },
        "created_at": "2026-10-01T10:00:00Z",
        "updated_at": "2026-10-04T18:00:00Z",
    },
    {
        "id": "content-202",
        "title": "Editing Speedrun: Cut Your Timeline Time in Half",
        "content_type": "Reel",
        "platform": "Instagram",
        "status": "In Review",
        "description": "Short reel showcasing 3 Premiere Pro / DaVinci keyboard shortcuts.",
        "body": "Stop using your mouse to trim cuts! ⌨️\n\nHere are 3 shortcuts that saved me 12 hours this week:\n1. Q & W Ripple Trims\n2. J-K-L Shuttle Navigation\n3. Custom Macro for Silence Removal\n\nSave this for your next editing session!",
        "tags": ["editing", "premiere", "shortcuts", "reels"],
        "source_idea_id": "idea-102",
        "thumbnail_url": "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=600&auto=format&fit=crop",
        "target_date": "2026-10-15",
        "published_date": None,
        "metadata": {
            "character_count": 242,
            "word_count": 41,
            "reading_time_minutes": 1,
            "estimated_duration_seconds": 19,
        },
        "created_at": "2026-10-02T13:00:00Z",
        "updated_at": "2026-10-05T09:30:00Z",
    },
    {
        "id": "content-203",
        "title": "The Solo Creator Operating System: Zero to $10k/mo",
        "content_type": "Newsletter",
        "platform": "Substack",
        "status": "Draft",
        "description": "Weekly deep dive into building systems instead of chasing fleeting algorithms.",
        "body": "Dear Creators,\n\nThe biggest myth in content creation is that you need to be on every platform 24/7.\nInstead, build one central engine:\n- Idea Vault (capture constantly)\n- Content Studio (batch produce)\n- Content Library (repurpose endlessly)\n\nLet us break down each pillar in detail...",
        "tags": ["business", "monetization", "newsletter"],
        "source_idea_id": "idea-103",
        "thumbnail_url": None,
        "target_date": "2026-10-28",
        "published_date": None,
        "metadata": {
            "character_count": 318,
            "word_count": 52,
            "reading_time_minutes": 1,
            "estimated_duration_seconds": 24,
        },
        "created_at": "2026-10-03T16:00:00Z",
        "updated_at": "2026-10-05T15:20:00Z",
    },
    {
        "id": "content-204",
        "title": "Why Code-First Creators Are Winning on LinkedIn",
        "content_type": "Post",
        "platform": "LinkedIn",
        "status": "Scheduled",
        "description": "Carousel breakdown of developer advocacy, personal branding, and open-source growth.",
        "body": "Engineers who build in public create 5x more trust than traditional influencers.\n\n3 things that changed my reach in 6 months:\n- Sharing the messy bugs, not just the finished polish\n- Documenting architecture decisions as visual flowcharts\n- Repurposing GitHub readmes into insightful carousels\n\nAre you building in public yet?",
        "tags": ["linkedin", "buildinpublic", "career", "tech"],
        "source_idea_id": None,
        "thumbnail_url": None,
        "target_date": "2026-10-18",
        "published_date": None,
        "metadata": {
            "character_count": 331,
            "word_count": 48,
            "reading_time_minutes": 1,
            "estimated_duration_seconds": 22,
        },
        "created_at": "2026-10-04T11:00:00Z",
        "updated_at": "2026-10-04T11:00:00Z",
    },
]


class ContentRepository(BaseFileRepository):
    """File-based repository specifically for Content Items."""

    def __init__(self, file_path: Optional[str] = None):
        if not file_path:
            base_dir = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
            file_path = os.path.join(base_dir, "data", "content", "content.json")
        super().__init__(file_path=file_path, default_seed_data=DEFAULT_CONTENT_SEED)

    def filter_content(
        self,
        search: Optional[str] = None,
        status: Optional[str] = None,
        content_type: Optional[str] = None,
        platform: Optional[str] = None,
        tags: Optional[List[str]] = None,
        sort_by: str = "updated_at",
        sort_order: str = "desc",
    ) -> List[Dict[str, Any]]:
        """Filter and sort content items."""
        items = self.get_all()

        if search:
            q = search.strip().lower()
            items = [
                i for i in items
                if q in i.get("title", "").lower()
                or q in i.get("description", "").lower()
                or q in i.get("body", "").lower()
                or any(q in t.lower() for t in i.get("tags", []))
            ]

        if status:
            items = [i for i in items if i.get("status", "").lower() == status.strip().lower()]

        if content_type:
            items = [i for i in items if i.get("content_type", "").lower() == content_type.strip().lower()]

        if platform:
            items = [i for i in items if i.get("platform", "").lower() == platform.strip().lower()]

        if tags:
            tag_set = {t.lower() for t in tags}
            items = [
                i for i in items
                if any(t.lower() in tag_set for t in i.get("tags", []))
            ]

        reverse = sort_order.lower() == "desc"
        if sort_by == "title":
            items.sort(key=lambda x: str(x.get("title", "")).lower(), reverse=reverse)
        elif sort_by == "created_at":
            items.sort(key=lambda x: x.get("created_at", ""), reverse=reverse)
        elif sort_by == "target_date":
            items.sort(
                key=lambda x: (x.get("target_date") is None or x.get("target_date") == "", x.get("target_date") or ""),
                reverse=reverse,
            )
        else:  # default to updated_at
            items.sort(key=lambda x: x.get("updated_at", ""), reverse=reverse)

        return items

    def get_stats(self) -> Dict[str, Any]:
        """Aggregate statistics for content library and dashboard overview."""
        items = self.get_all()
        total = len(items)

        by_status: Dict[str, int] = {}
        by_type: Dict[str, int] = {}
        by_platform: Dict[str, int] = {}

        total_words = 0
        total_duration = 0

        for item in items:
            st = item.get("status", "Unknown")
            by_status[st] = by_status.get(st, 0) + 1

            ct = item.get("content_type", "Unknown")
            by_type[ct] = by_type.get(ct, 0) + 1

            pl = item.get("platform", "Unknown")
            by_platform[pl] = by_platform.get(pl, 0) + 1

            meta = item.get("metadata") or {}
            total_words += meta.get("word_count", 0)
            total_duration += meta.get("estimated_duration_seconds", 0)

        return {
            "total": total,
            "by_status": by_status,
            "by_content_type": by_type,
            "by_platform": by_platform,
            "draft_count": by_status.get("Draft", 0),
            "in_review_count": by_status.get("In Review", 0),
            "scheduled_count": by_status.get("Scheduled", 0),
            "published_count": by_status.get("Published", 0),
            "archived_count": by_status.get("Archived", 0),
            "total_words_written": total_words,
            "total_estimated_duration_seconds": total_duration,
        }
