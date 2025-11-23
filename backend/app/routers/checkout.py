from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from app.models.schemas import CheckoutRequest, CheckoutResponse, SubscriptionTierEnum
from app.services.stripe_service import create_checkout_session
from app.middleware.auth import get_user_id_from_token

router = APIRouter()
security = HTTPBearer()

@router.post("/checkout", response_model=CheckoutResponse)
async def create_checkout(
    request: CheckoutRequest,
    credentials: HTTPAuthorizationCredentials = Depends(security)
):
    """Create a Stripe checkout session for subscription."""
    user_id = get_user_id_from_token(credentials.credentials)

    if request.tier == SubscriptionTierEnum.FREE:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Cannot create checkout for free tier"
        )

    try:
        checkout_url = await create_checkout_session(
            user_id=user_id,
            tier=request.tier,
            success_url=request.success_url,
            cancel_url=request.cancel_url
        )

        return CheckoutResponse(checkout_url=checkout_url)
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error creating checkout session: {str(e)}"
        )
