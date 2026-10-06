"""
Campaign Model Definition for CreatorOS Brand Marketplace
"""
from dataclasses import dataclass, field, asdict
from typing import List, Dict, Optional, Any
import time

@dataclass
class CampaignDeliverableSpec:
    id: str
    title: str
    format: str
    quantity: int = 1
    requiredSpecs: str = ""

@dataclass
class Campaign:
    id: str
    brandId: str
    brandName: str
    title: str
    tagline: str
    category: str
    compensationType: str
    budget: float
    currency: str = "USD"
    deadline: str = ""
    status: str = "Active"  # Active, In Review, Draft, Completed, Paused
    platforms: List[str] = field(default_factory=list)
    deliverables: List[Dict[str, Any]] = field(default_factory=list)
    requirements: Dict[str, Any] = field(default_factory=dict)
    description: str = ""
    perks: List[str] = field(default_factory=list)
    applicantCount: int = 0
    selectedCount: int = 0
    featured: bool = False
    createdAt: str = field(default_factory=lambda: time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime()))

    def to_dict(self) -> Dict:
        return asdict(self)

    @classmethod
    def from_dict(cls, data: Dict) -> 'Campaign':
        valid_keys = cls.__dataclass_fields__.keys()
        filtered_data = {k: v for k, v in data.items() if k in valid_keys}
        return cls(**filtered_data)
