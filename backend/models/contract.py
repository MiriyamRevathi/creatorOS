"""
Contract Model Definition for CreatorOS Brand Marketplace
"""
from dataclasses import dataclass, field, asdict
from typing import List, Dict, Optional, Any
import time

@dataclass
class ContractTerms:
    ipRights: str = "Creator retains copyright; Brand granted worldwide digital license."
    exclusivity: str = "Standard 30-day category exclusivity."
    revisionsPolicy: str = "Up to two minor feedback revisions included."
    cancellationFee: str = "25% kill fee upon contract execution."

@dataclass
class Contract:
    id: str
    applicationId: str
    campaignId: str
    campaignTitle: str
    brandId: str
    brandName: str
    creatorId: str
    creatorName: str
    creatorEmail: str
    contractAmount: float
    currency: str = "USD"
    paymentTerms: str = "100% Escrow protected, released upon deliverable sign-off"
    escrowStatus: str = "Funded in Escrow"  # Unfunded, Funded in Escrow, Released, Refunded
    creatorSigned: bool = False
    creatorSignedAt: Optional[str] = None
    brandSigned: bool = True
    brandSignedAt: Optional[str] = field(default_factory=lambda: time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime()))
    status: str = "Active"  # Draft, Pending Signatures, Active, In Progress, Completed, Disputed, Terminated
    effectiveDate: str = field(default_factory=lambda: time.strftime("%Y-%m-%d", time.gmtime()))
    completionDeadline: str = ""
    terms: Dict[str, str] = field(default_factory=dict)
    createdAt: str = field(default_factory=lambda: time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime()))

    def to_dict(self) -> Dict:
        return asdict(self)

    @classmethod
    def from_dict(cls, data: Dict) -> 'Contract':
        valid_keys = cls.__dataclass_fields__.keys()
        filtered_data = {k: v for k, v in data.items() if k in valid_keys}
        return cls(**filtered_data)
