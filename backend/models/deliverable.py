"""
Deliverable Model Definition for CreatorOS Brand Marketplace
"""
from dataclasses import dataclass, field, asdict
from typing import List, Dict, Optional, Any
import time

@dataclass
class DeliverableFeedback:
    id: str
    author: str
    timestamp: str
    message: str

@dataclass
class Deliverable:
    id: str
    contractId: str
    campaignId: str
    campaignTitle: str
    brandId: str
    brandName: str
    creatorId: str
    creatorName: str
    title: str
    platform: str
    format: str
    status: str = "Pending Submission"  # Pending Submission, In Review, Revision Requested, Approved, Rejected
    submissionUrl: str = ""
    previewThumbnail: str = ""
    notes: str = ""
    dueDate: str = ""
    submittedAt: Optional[str] = None
    feedback: List[Dict[str, Any]] = field(default_factory=list)
    revisionCount: int = 0
    payoutAmount: float = 0.0
    createdAt: str = field(default_factory=lambda: time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime()))

    def to_dict(self) -> Dict:
        return asdict(self)

    @classmethod
    def from_dict(cls, data: Dict) -> 'Deliverable':
        valid_keys = cls.__dataclass_fields__.keys()
        filtered_data = {k: v for k, v in data.items() if k in valid_keys}
        return cls(**filtered_data)
