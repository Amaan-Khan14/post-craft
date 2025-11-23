from datetime import datetime
from app.services.supabase_client import get_supabase
from app.models.schemas import SubscriptionTierEnum, Usage
from app.config import settings
from fastapi import HTTPException, status

TIER_LIMITS = {
    SubscriptionTierEnum.FREE: settings.free_tier_posts_limit,
    SubscriptionTierEnum.STARTER: settings.starter_tier_posts_limit,
    SubscriptionTierEnum.PRO: settings.pro_tier_posts_limit,
}

TIER_PLATFORMS = {
    SubscriptionTierEnum.FREE: ["linkedin", "twitter"],
    SubscriptionTierEnum.STARTER: ["linkedin", "twitter", "instagram", "facebook"],
    SubscriptionTierEnum.PRO: ["linkedin", "twitter", "instagram", "facebook"],
}

async def check_usage_limit(user_id: str) -> bool:
    """Check if user has exceeded their monthly post limit."""
    supabase = get_supabase()

    # Get user profile
    profile_response = supabase.table("profiles").select("*").eq("user_id", user_id).execute()

    if not profile_response.data:
        # Create default profile if not exists
        await create_user_profile(user_id)
        return True

    profile = profile_response.data[0]
    tier = SubscriptionTierEnum(profile["subscription_tier"])
    posts_this_month = profile["posts_this_month"]
    limit = TIER_LIMITS[tier]

    return posts_this_month < limit

async def increment_usage(user_id: str):
    """Increment the user's post count for the current month."""
    supabase = get_supabase()

    # Get current profile
    profile_response = supabase.table("profiles").select("*").eq("user_id", user_id).execute()

    if not profile_response.data:
        await create_user_profile(user_id)
        profile_response = supabase.table("profiles").select("*").eq("user_id", user_id).execute()

    profile = profile_response.data[0]

    # Increment posts_this_month
    new_count = profile["posts_this_month"] + 1

    supabase.table("profiles").update({
        "posts_this_month": new_count
    }).eq("user_id", user_id).execute()

    # Update usage_tracking table
    current_month = datetime.utcnow().strftime("%Y-%m")

    usage_response = supabase.table("usage_tracking").select("*").eq("user_id", user_id).eq("month", current_month).execute()

    if usage_response.data:
        # Update existing record
        supabase.table("usage_tracking").update({
            "posts_count": new_count
        }).eq("user_id", user_id).eq("month", current_month).execute()
    else:
        # Create new record
        supabase.table("usage_tracking").insert({
            "user_id": user_id,
            "posts_count": new_count,
            "month": current_month
        }).execute()

async def get_usage(user_id: str) -> Usage:
    """Get current usage statistics for a user."""
    supabase = get_supabase()

    profile_response = supabase.table("profiles").select("*").eq("user_id", user_id).execute()

    if not profile_response.data:
        await create_user_profile(user_id)
        profile_response = supabase.table("profiles").select("*").eq("user_id", user_id).execute()

    profile = profile_response.data[0]
    tier = SubscriptionTierEnum(profile["subscription_tier"])

    return Usage(
        user_id=user_id,
        posts_count=profile["posts_this_month"],
        posts_limit=TIER_LIMITS[tier],
        month=datetime.utcnow().strftime("%Y-%m"),
        subscription_tier=tier
    )

async def create_user_profile(user_id: str):
    """Create a new user profile with default values."""
    supabase = get_supabase()

    supabase.table("profiles").insert({
        "user_id": user_id,
        "subscription_tier": SubscriptionTierEnum.FREE.value,
        "posts_this_month": 0,
        "brand_voice": None
    }).execute()

async def check_platform_access(user_id: str, platforms: list) -> bool:
    """Check if user's subscription tier allows access to requested platforms."""
    supabase = get_supabase()

    profile_response = supabase.table("profiles").select("*").eq("user_id", user_id).execute()

    if not profile_response.data:
        tier = SubscriptionTierEnum.FREE
    else:
        tier = SubscriptionTierEnum(profile_response.data[0]["subscription_tier"])

    allowed_platforms = TIER_PLATFORMS[tier]

    for platform in platforms:
        if platform not in allowed_platforms:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail=f"Your {tier.value} tier does not include access to {platform}. Please upgrade your subscription."
            )

    return True

async def reset_monthly_usage():
    """Reset all users' monthly post counts. Should be run monthly via cron job."""
    supabase = get_supabase()

    supabase.table("profiles").update({
        "posts_this_month": 0
    }).execute()
