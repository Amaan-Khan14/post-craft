from pydantic import BaseModel, Field
from typing import Optional, List
from datetime import datetime
from enum import Enum

class ToneEnum(str, Enum):
    PROFESSIONAL = "professional"
    CASUAL = "casual"
    PLAYFUL = "playful"

class PlatformEnum(str, Enum):
    LINKEDIN = "linkedin"
    TWITTER = "twitter"
    INSTAGRAM = "instagram"
    FACEBOOK = "facebook"

class SubscriptionTierEnum(str, Enum):
    FREE = "free"
    STARTER = "starter"
    PRO = "pro"

class GenerateRequest(BaseModel):
    base_content: str = Field(..., min_length=10, max_length=5000)
    tone: ToneEnum = ToneEnum.PROFESSIONAL
    platforms: List[PlatformEnum] = Field(..., min_items=1)
    image_url: Optional[str] = None

class PlatformContent(BaseModel):
    platform: PlatformEnum
    content: str
    character_count: int
    hashtags: List[str] = []

class GenerateResponse(BaseModel):
    id: Optional[str] = None
    base_content: str
    platforms: List[PlatformContent]
    created_at: datetime = Field(default_factory=datetime.utcnow)
    ai_disclaimer: str = "Content generated with AI assistance using Claude by Anthropic"

class SavePostRequest(BaseModel):
    post_id: str

class Post(BaseModel):
    id: str
    user_id: str
    base_content: str
    linkedin_version: Optional[str] = None
    twitter_version: Optional[str] = None
    instagram_version: Optional[str] = None
    facebook_version: Optional[str] = None
    created_at: datetime
    scheduled_for: Optional[datetime] = None

class Usage(BaseModel):
    user_id: str
    posts_count: int
    posts_limit: int
    month: str
    subscription_tier: SubscriptionTierEnum

class Profile(BaseModel):
    user_id: str
    brand_voice: Optional[str] = None
    subscription_tier: SubscriptionTierEnum = SubscriptionTierEnum.FREE
    posts_this_month: int = 0
    stripe_customer_id: Optional[str] = None
    stripe_subscription_id: Optional[str] = None

class CheckoutRequest(BaseModel):
    tier: SubscriptionTierEnum
    success_url: str
    cancel_url: str

class CheckoutResponse(BaseModel):
    checkout_url: str
