from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from app.models.schemas import Profile
from app.services.supabase_client import get_supabase
from app.middleware.auth import get_user_id_from_token
from pydantic import BaseModel
from typing import Optional

router = APIRouter()
security = HTTPBearer()

class UpdateProfileRequest(BaseModel):
    brand_voice: Optional[str] = None

@router.get("/profile", response_model=Profile)
async def get_profile(
    credentials: HTTPAuthorizationCredentials = Depends(security)
):
    """Get user profile."""
    user_id = get_user_id_from_token(credentials.credentials)
    supabase = get_supabase()

    try:
        response = supabase.table("profiles")\
            .select("*")\
            .eq("user_id", user_id)\
            .execute()

        if not response.data:
            # Create default profile
            default_profile = {
                "user_id": user_id,
                "subscription_tier": "free",
                "posts_this_month": 0,
                "brand_voice": None
            }
            supabase.table("profiles").insert(default_profile).execute()
            return Profile(**default_profile)

        return Profile(**response.data[0])
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error fetching profile: {str(e)}"
        )

@router.patch("/profile", response_model=Profile)
async def update_profile(
    update_data: UpdateProfileRequest,
    credentials: HTTPAuthorizationCredentials = Depends(security)
):
    """Update user profile."""
    user_id = get_user_id_from_token(credentials.credentials)
    supabase = get_supabase()

    try:
        # Update profile
        update_dict = {}
        if update_data.brand_voice is not None:
            update_dict["brand_voice"] = update_data.brand_voice

        if update_dict:
            supabase.table("profiles")\
                .update(update_dict)\
                .eq("user_id", user_id)\
                .execute()

        # Fetch updated profile
        response = supabase.table("profiles")\
            .select("*")\
            .eq("user_id", user_id)\
            .execute()

        return Profile(**response.data[0])
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error updating profile: {str(e)}"
        )
