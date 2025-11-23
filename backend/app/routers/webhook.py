from fastapi import APIRouter, Request, HTTPException, status
from app.services.stripe_service import construct_webhook_event
from app.services.supabase_client import get_supabase
from app.models.schemas import SubscriptionTierEnum

router = APIRouter()

@router.post("/webhook/stripe")
async def stripe_webhook(request: Request):
    """Handle Stripe webhook events."""
    payload = await request.body()
    sig_header = request.headers.get("stripe-signature")

    if not sig_header:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Missing stripe-signature header"
        )

    try:
        event = construct_webhook_event(payload, sig_header)
    except ValueError as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e)
        )

    # Handle different event types
    if event["type"] == "checkout.session.completed":
        await handle_checkout_completed(event["data"]["object"])
    elif event["type"] == "customer.subscription.updated":
        await handle_subscription_updated(event["data"]["object"])
    elif event["type"] == "customer.subscription.deleted":
        await handle_subscription_deleted(event["data"]["object"])

    return {"status": "success"}

async def handle_checkout_completed(session):
    """Handle successful checkout completion."""
    user_id = session.get("client_reference_id")
    customer_id = session.get("customer")
    subscription_id = session.get("subscription")
    tier = session.get("metadata", {}).get("tier", "starter")

    if not user_id:
        print("No user_id in checkout session")
        return

    supabase = get_supabase()

    # Update user profile with subscription info
    try:
        supabase.table("profiles").update({
            "subscription_tier": tier,
            "stripe_customer_id": customer_id,
            "stripe_subscription_id": subscription_id
        }).eq("user_id", user_id).execute()

        print(f"Updated subscription for user {user_id} to {tier}")
    except Exception as e:
        print(f"Error updating profile: {str(e)}")

async def handle_subscription_updated(subscription):
    """Handle subscription updates."""
    customer_id = subscription.get("customer")
    subscription_id = subscription.get("id")
    status = subscription.get("status")

    supabase = get_supabase()

    # If subscription is canceled or past_due, potentially downgrade
    if status in ["canceled", "past_due", "unpaid"]:
        try:
            supabase.table("profiles").update({
                "subscription_tier": SubscriptionTierEnum.FREE.value
            }).eq("stripe_subscription_id", subscription_id).execute()

            print(f"Downgraded subscription {subscription_id} due to status: {status}")
        except Exception as e:
            print(f"Error downgrading subscription: {str(e)}")

async def handle_subscription_deleted(subscription):
    """Handle subscription deletion/cancellation."""
    subscription_id = subscription.get("id")

    supabase = get_supabase()

    try:
        supabase.table("profiles").update({
            "subscription_tier": SubscriptionTierEnum.FREE.value,
            "stripe_subscription_id": None
        }).eq("stripe_subscription_id", subscription_id).execute()

        print(f"Subscription {subscription_id} deleted, user downgraded to free")
    except Exception as e:
        print(f"Error handling subscription deletion: {str(e)}")
