"""
Application Model Definition for CreatorOS Brand Marketplace
"""
from dataclasses import dataclass, field, asdict
from typing import List, Dict, Optional, Any
import time

@dataclass
class Application:
    id: str
    campaignId: str
    campaignTitle: str
    brandId: str
    brandName: str
    creatorId: str
    creatorName: str
    creatorAvatar: str = ""
    creatorNiche: str = ""
    creatorFollowers: int = 0
    creatorPlatform: str = "YouTube"
    creatorChannelUrl: str = ""
    proposedRate: float = 0.0
    pitchMessage: str = ""
    portfolioLinks: List[str] = field(default_factory=list)
    estimatedTurnaroundDays: int = 7
    status: str = "Pending"  # Pending, Shortlisted, Accepted, Rejected, Withdrawn
    submittedAt: str = field(default_factory=lambda: time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime()))
    reviewedAt: Optional[str] = None
    brandNotes: Optional[str] = None

    def to_dict(self) -> Dict:
        return asdict(self)

    @classmethod
    def from_dict(cls, data: Dict) -> 'Application':
        valid_keys = cls.__dataclass_fields__.keys()
        filtered_data = {k: v for k, v in data.items() if k in valid_keys}
        return cls(**filtered_data)
