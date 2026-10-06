"""Tests for LocalAssistantService."""
import pytest
from backend.services.local_assistant_service import LocalAssistantService


def test_local_assistant_hooks():
    """Verify deterministic hook generation without external APIs."""
    assistant = LocalAssistantService()
    hooks = assistant.generate_hooks(topic="Microphone shootout", content_type="Short")
    assert len(hooks) == 3
    for hook in hooks:
        assert "style" in hook
        assert "text" in hook
        assert "Microphone shootout" in hook["text"]


def test_local_assistant_headlines():
    """Verify headline suggestions."""
    assistant = LocalAssistantService()
    suggestions = assistant.suggest_headlines(current_title="Video Editing Shortcuts")
    assert len(suggestions) == 3
    assert all("Video Editing Shortcuts" in s for s in suggestions)


def test_local_assistant_hashtags():
    """Verify platform specific hashtags."""
    assistant = LocalAssistantService()
    hashtags = assistant.generate_hashtags(tags=["editing", "camera"], platform="Instagram")
    assert "#editing" in hashtags
    assert "#camera" in hashtags
    assert any("reels" in h or "creator" in h for h in hashtags)
