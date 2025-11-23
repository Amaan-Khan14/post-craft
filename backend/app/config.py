from pydantic_settings import BaseSettings
from typing import Optional

class Settings(BaseSettings):
    # Anthropic
    anthropic_api_key: str

    # Supabase
    supabase_url: str
    supabase_anon_key: str
    supabase_service_key: str

    # Stripe
    stripe_secret_key: str
    stripe_webhook_secret: str

    # App
    frontend_url: str = "http://localhost:3000"

    # Subscription tiers
    free_tier_posts_limit: int = 10
    starter_tier_posts_limit: int = 50
    pro_tier_posts_limit: int = 200

    class Config:
        env_file = ".env"
        case_sensitive = False

settings = Settings()
