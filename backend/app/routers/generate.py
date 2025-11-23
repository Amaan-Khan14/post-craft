from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from app.models.schemas import GenerateRequest, GenerateResponse, PlatformContent
from app.services.claude_service import generate_platform_content
from app.services.supabase_client import get_supabase
from app.services.usage_service import check_usage_limit, increment_usage, check_platform_access
from app.middleware.auth import get_user_id_from_token
from datetime import datetime
import uuid

router = APIRouter()
security = HTTPBearer()

@router.post("/generate", response_model=GenerateResponse)
async def generate_content(
    request: GenerateRequest,
    credentials: HTTPAuthorizationCredentials = Depends(security)
):
    """Generate platform-optimized content from base content."""

    # Get user ID from token
    user_id = get_user_id_from_token(credentials.credentials)

    # Check if user has exceeded usage limit
    can_generate = await check_usage_limit(user_id)
    if not can_generate:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Monthly post limit reached. Please upgrade your subscription."
        )

    # Check if user's tier allows access to requested platforms
    platform_values = [p.value for p in request.platforms]
    await check_platform_access(user_id, platform_values)

    # Generate content for each platform
    platform_contents = await generate_platform_content(
        base_content=request.base_content,
        tone=request.tone,
        platforms=request.platforms
    )

    # Create post ID
    post_id = str(uuid.uuid4())

    # Save to database
    supabase = get_supabase()

    post_data = {
        "id": post_id,
        "user_id": user_id,
        "base_content": request.base_content,
        "created_at": datetime.utcnow().isoformat()
    }

    # Add platform-specific content
    for platform_content in platform_contents:
        platform_key = f"{platform_content.platform.value}_version"
        post_data[platform_key] = platform_content.content

    try:
        supabase.table("generated_posts").insert(post_data).execute()
    except Exception as e:
        print(f"Error saving post: {str(e)}")
        # Continue even if save fails

    # Increment usage
    await increment_usage(user_id)

    # Return response
    return GenerateResponse(
        id=post_id,
        base_content=request.base_content,
        platforms=platform_contents,
        created_at=datetime.utcnow(),
        ai_disclaimer="Content generated with AI assistance using Claude by Anthropic"
    )
