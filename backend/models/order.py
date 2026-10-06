import uuid
from datetime import datetime, timezone

class Order:
    def __init__(
        self,
        id=None,
        order_number=None,
        customer_id="",
        customer_name="",
        customer_email="",
        product_id="",
        product_title="",
        amount=0.0,
        status="completed",
        payment_method="Simulated Checkout",
        download_url="",
        created_at=None
    ):
        self.id = id if id else f"ord_{uuid.uuid4().hex[:10]}"
        self.order_number = order_number if order_number else f"ORD-{uuid.uuid4().hex[:6].upper()}"
        self.customer_id = customer_id
        self.customer_name = customer_name
        self.customer_email = customer_email
        self.product_id = product_id
        self.product_title = product_title
        self.amount = float(amount)
        self.status = status  # completed, pending, refunded
        self.payment_method = payment_method
        self.download_url = download_url
        self.created_at = created_at if created_at else datetime.now(timezone.utc).isoformat()

    def to_dict(self):
        return {
            "id": self.id,
            "order_number": self.order_number,
            "customer_id": self.customer_id,
            "customer_name": self.customer_name,
            "customer_email": self.customer_email,
            "product_id": self.product_id,
            "product_title": self.product_title,
            "amount": self.amount,
            "status": self.status,
            "payment_method": self.payment_method,
            "download_url": self.download_url,
            "created_at": self.created_at
        }

    @classmethod
    def from_dict(cls, data):
        if not data:
            return None
        return cls(
            id=data.get("id"),
            order_number=data.get("order_number"),
            customer_id=data.get("customer_id", ""),
            customer_name=data.get("customer_name", ""),
            customer_email=data.get("customer_email", ""),
            product_id=data.get("product_id", ""),
            product_title=data.get("product_title", ""),
            amount=data.get("amount", 0.0),
            status=data.get("status", "completed"),
            payment_method=data.get("payment_method", "Simulated Checkout"),
            download_url=data.get("download_url", ""),
            created_at=data.get("created_at")
        )
