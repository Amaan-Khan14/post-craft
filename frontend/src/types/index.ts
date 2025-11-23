export enum ToneEnum {
  PROFESSIONAL = 'professional',
  CASUAL = 'casual',
  PLAYFUL = 'playful',
}

export enum PlatformEnum {
  LINKEDIN = 'linkedin',
  TWITTER = 'twitter',
  INSTAGRAM = 'instagram',
  FACEBOOK = 'facebook',
}

export enum SubscriptionTierEnum {
  FREE = 'free',
  STARTER = 'starter',
  PRO = 'pro',
}

export interface PlatformContent {
  platform: PlatformEnum
  content: string
  character_count: number
  hashtags: string[]
}

export interface GenerateRequest {
  base_content: string
  tone: ToneEnum
  platforms: PlatformEnum[]
  image_url?: string
}

export interface GenerateResponse {
  id?: string
  base_content: string
  platforms: PlatformContent[]
  created_at: string
  ai_disclaimer: string
}

export interface Post {
  id: string
  user_id: string
  base_content: string
  linkedin_version?: string
  twitter_version?: string
  instagram_version?: string
  facebook_version?: string
  created_at: string
  scheduled_for?: string
}

export interface Usage {
  user_id: string
  posts_count: number
  posts_limit: number
  month: string
  subscription_tier: SubscriptionTierEnum
}

export interface Profile {
  user_id: string
  brand_voice?: string
  subscription_tier: SubscriptionTierEnum
  posts_this_month: number
  stripe_customer_id?: string
  stripe_subscription_id?: string
}

export interface User {
  id: string
  email: string
}
