import stripe
from app.config import settings
from app.models.schemas import SubscriptionTierEnum

stripe.api_key = settings.stripe_secret_key

# Stripe price IDs (you'll need to create these in Stripe Dashboard)
TIER_PRICE_IDS = {
    SubscriptionTierEnum.STARTER: "price_starter_monthly",  # Replace with actual Stripe Price ID
    SubscriptionTierEnum.PRO: "price_pro_monthly",  # Replace with actual Stripe Price ID
}

async def create_checkout_session(
    user_id: str,
    tier: SubscriptionTierEnum,
    success_url: str,
    cancel_url: str
) -> str:
    """Create a Stripe checkout session for subscription."""

    if tier == SubscriptionTierEnum.FREE:
        raise ValueError("Cannot create checkout session for free tier")

    try:
        checkout_session = stripe.checkout.Session.create(
            payment_method_types=["card"],
            line_items=[
                {
                    "price": TIER_PRICE_IDS[tier],
                    "quantity": 1,
                }
            ],
            mode="subscription",
            success_url=success_url,
            cancel_url=cancel_url,
            client_reference_id=user_id,
            metadata={
                "user_id": user_id,
                "tier": tier.value
            }
        )

        return checkout_session.url
    except Exception as e:
        raise Exception(f"Error creating checkout session: {str(e)}")

async def create_customer_portal_session(customer_id: str, return_url: str) -> str:
    """Create a Stripe customer portal session for managing subscriptions."""
    try:
        portal_session = stripe.billing_portal.Session.create(
            customer=customer_id,
            return_url=return_url,
        )
        return portal_session.url
    except Exception as e:
        raise Exception(f"Error creating portal session: {str(e)}")

def construct_webhook_event(payload: bytes, sig_header: str):
    """Construct and verify Stripe webhook event."""
    try:
        event = stripe.Webhook.construct_event(
            payload, sig_header, settings.stripe_webhook_secret
        )
        return event
    except ValueError:
        raise ValueError("Invalid payload")
    except stripe.error.SignatureVerificationError:
        raise ValueError("Invalid signature")
