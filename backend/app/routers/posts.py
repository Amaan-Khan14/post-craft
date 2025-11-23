from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from app.models.schemas import Post, SavePostRequest
from app.services.supabase_client import get_supabase
from app.middleware.auth import get_user_id_from_token
from typing import List

router = APIRouter()
security = HTTPBearer()

@router.get("/posts", response_model=List[Post])
async def get_posts(
    credentials: HTTPAuthorizationCredentials = Depends(security),
    limit: int = 20,
    offset: int = 0
):
    """Get user's generated posts."""
    user_id = get_user_id_from_token(credentials.credentials)
    supabase = get_supabase()

    try:
        response = supabase.table("generated_posts")\
            .select("*")\
            .eq("user_id", user_id)\
            .order("created_at", desc=True)\
            .range(offset, offset + limit - 1)\
            .execute()

        return response.data
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error fetching posts: {str(e)}"
        )

@router.get("/posts/{post_id}", response_model=Post)
async def get_post(
    post_id: str,
    credentials: HTTPAuthorizationCredentials = Depends(security)
):
    """Get a specific post by ID."""
    user_id = get_user_id_from_token(credentials.credentials)
    supabase = get_supabase()

    try:
        response = supabase.table("generated_posts")\
            .select("*")\
            .eq("id", post_id)\
            .eq("user_id", user_id)\
            .execute()

        if not response.data:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Post not found"
            )

        return response.data[0]
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error fetching post: {str(e)}"
        )

@router.delete("/posts/{post_id}")
async def delete_post(
    post_id: str,
    credentials: HTTPAuthorizationCredentials = Depends(security)
):
    """Delete a post."""
    user_id = get_user_id_from_token(credentials.credentials)
    supabase = get_supabase()

    try:
        # Verify ownership
        response = supabase.table("generated_posts")\
            .select("*")\
            .eq("id", post_id)\
            .eq("user_id", user_id)\
            .execute()

        if not response.data:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Post not found"
            )

        # Delete
        supabase.table("generated_posts")\
            .delete()\
            .eq("id", post_id)\
            .execute()

        return {"message": "Post deleted successfully"}
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error deleting post: {str(e)}"
        )
