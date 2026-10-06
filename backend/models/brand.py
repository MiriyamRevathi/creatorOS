"""
Brand Model Definition for CreatorOS Brand Marketplace
"""
from dataclasses import dataclass, field, asdict
from typing import List, Dict, Optional
import time

@dataclass
class Brand:
    id: str
    name: str
    tagline: str
    category: str
    logo: str
    banner: str
    website: str
    location: str
    verified: bool = True
    rating: float = 5.0
    totalReviews: int = 0
    collaborationsCount: int = 0
    avgPayout: str = "$0"
    payoutSpeed: str = "Within 48h"
    bio: str = ""
    guidelines: str = ""
    preferredPlatforms: List[str] = field(default_factory=list)
    contactEmail: str = ""
    foundedYear: int = 2024
    socialHandles: Dict[str, str] = field(default_factory=dict)
    createdAt: str = field(default_factory=lambda: time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime()))

    def to_dict(self) -> Dict:
        return asdict(self)

    @classmethod
    def from_dict(cls, data: Dict) -> 'Brand':
        # Filter out unknown keys safely
        valid_keys = cls.__dataclass_fields__.keys()
        filtered_data = {k: v for k, v in data.items() if k in valid_keys}
        return cls(**filtered_data)
