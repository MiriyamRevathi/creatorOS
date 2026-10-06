import uuid
from datetime import datetime, timezone

class Transaction:
    def __init__(
        self,
        id=None,
        reference=None,
        type="income",
        category="product_sales",
        amount=0.0,
        description="",
        date=None,
        status="completed",
        payment_method="Bank Transfer",
        related_entity_id=""
    ):
        self.id = id if id else f"txn_{uuid.uuid4().hex[:10]}"
        self.reference = reference if reference else f"TXN-{uuid.uuid4().hex[:8].upper()}"
        self.type = type  # income, expense
        self.category = category  # e.g., product_sales, sponsorships, ad_revenue, software, gear, marketing, payroll
        self.amount = float(amount)
        self.description = description
        self.date = date if date else datetime.now(timezone.utc).isoformat()
        self.status = status  # completed, pending, cancelled
        self.payment_method = payment_method
        self.related_entity_id = related_entity_id

    def to_dict(self):
        return {
            "id": self.id,
            "reference": self.reference,
            "type": self.type,
            "category": self.category,
            "amount": self.amount,
            "description": self.description,
            "date": self.date,
            "status": self.status,
            "payment_method": self.payment_method,
            "related_entity_id": self.related_entity_id
        }

    @classmethod
    def from_dict(cls, data):
        if not data:
            return None
        return cls(
            id=data.get("id"),
            reference=data.get("reference"),
            type=data.get("type", "income"),
            category=data.get("category", "product_sales"),
            amount=data.get("amount", 0.0),
            description=data.get("description", ""),
            date=data.get("date"),
            status=data.get("status", "completed"),
            payment_method=data.get("payment_method", "Bank Transfer"),
            related_entity_id=data.get("related_entity_id", "")
        )
