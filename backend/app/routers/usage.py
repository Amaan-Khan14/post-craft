from fastapi import APIRouter, Depends
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from app.models.schemas import Usage
from app.services.usage_service import get_usage
from app.middleware.auth import get_user_id_from_token

router = APIRouter()
security = HTTPBearer()

@router.get("/usage", response_model=Usage)
async def get_user_usage(
    credentials: HTTPAuthorizationCredentials = Depends(security)
):
    """Get current month's usage statistics for the authenticated user."""
    user_id = get_user_id_from_token(credentials.credentials)
    return await get_usage(user_id)
