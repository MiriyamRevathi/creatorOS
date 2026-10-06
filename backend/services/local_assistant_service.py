"""Deterministic, zero-dependency local assistant for Content Studio.

Provides offline headline suggestions, hook formulas, and caption formatting
strictly without requiring external AI APIs or keys.
"""
from typing import List, Dict, Any, Optional


class LocalAssistantService:
    """Local deterministic generator for creator writing assistance."""

    HOOK_TEMPLATES = {
        "curiosity": [
            "Most creators spend months on {topic} without realizing this one mistake...",
            "What if I told you the biggest secret to {topic} is actually counterintuitive?",
            "I analyzed 100+ top performers in {topic}. Here is what they all do differently.",
        ],
        "contrarian": [
            "Stop doing {topic} the old way. Here is why the traditional advice fails.",
            "Why almost everyone gets {topic} wrong (and how to fix it in 5 minutes).",
            "The unpopular truth about {topic} that industry gurus won't tell you.",
        ],
        "actionable": [
            "A step-by-step masterclass on {topic} for creators who want results fast:",
            "Here is my exact 3-step checklist to execute {topic} with zero guesswork.",
            "How to master {topic} this weekend without burning out.",
        ],
    }

    HEADLINE_FRAMEWORKS = [
        "How to {action} Without {pain_point}",
        "The {topic} Blueprint: From Beginner to Pro",
        "3 Reasons Why Your {topic} Isn't Growing (And How to Fix It)",
        "The Only 5 Tools You Need for {topic} in 2026",
    ]

    def generate_hooks(self, topic: str, content_type: str = "Video") -> List[Dict[str, str]]:
        """Generate 3 distinct deterministic hooks for scripts or captions."""
        clean_topic = topic.strip() if topic else "your content topic"
        # Deterministic choice based on hash of topic
        seed = sum(ord(c) for c in clean_topic)

        curiosity_idx = seed % len(self.HOOK_TEMPLATES["curiosity"])
        contrarian_idx = (seed + 1) % len(self.HOOK_TEMPLATES["contrarian"])
        actionable_idx = (seed + 2) % len(self.HOOK_TEMPLATES["actionable"])

        return [
            {
                "style": "Curiosity Gap",
                "text": self.HOOK_TEMPLATES["curiosity"][curiosity_idx].format(topic=clean_topic),
                "tip": "Great for the first 3 seconds of Reels, Shorts, and YouTube intros.",
            },
            {
                "style": "Contrarian / Problem",
                "text": self.HOOK_TEMPLATES["contrarian"][contrarian_idx].format(topic=clean_topic),
                "tip": "Excellent for LinkedIn posts, X threads, and newsletter openers.",
            },
            {
                "style": "Actionable Roadmap",
                "text": self.HOOK_TEMPLATES["actionable"][actionable_idx].format(topic=clean_topic),
                "tip": "High save-rate for carousels and educational long-form videos.",
            },
        ]

    def suggest_headlines(self, current_title: str) -> List[str]:
        """Suggest 3 headline variations using proven creator formulas."""
        clean = current_title.strip() if current_title else "Creator Growth"
        return [
            f"How I Mastered {clean} (And What I Learned)",
            f"The 10-Minute Guide to {clean} in 2026",
            f"Why {clean} Is The Most Underrated Creator Strategy",
        ]

    def generate_hashtags(self, tags: List[str], platform: str = "YouTube") -> List[str]:
        """Suggest formatted hashtags based on tags and target platform."""
        result = []
        for t in tags:
            clean = "".join(ch for ch in t if ch.isalnum()).lower()
            if clean:
                result.append(f"#{clean}")

        # Add platform general tags
        platform_tags = {
            "Instagram": ["#contentcreator", "#creatorlife", "#reelsgrowth"],
            "YouTube": ["#youtubecreator", "#creatoros", "#techcreators"],
            "LinkedIn": ["#creatoreconomy", "#buildinpublic", "#productivity"],
            "TikTok": ["#creatortok", "#learnontiktok", "#tipsandtricks"],
        }
        for pt in platform_tags.get(platform, ["#creatoros", "#content"]):
            if pt not in result:
                result.append(pt)

        return result[:6]
