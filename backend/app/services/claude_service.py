from anthropic import Anthropic
from app.config import settings
from app.models.schemas import ToneEnum, PlatformEnum, PlatformContent
from typing import List

client = Anthropic(api_key=settings.anthropic_api_key)

PLATFORM_PROMPTS = {
    PlatformEnum.LINKEDIN: """Transform this content into a professional LinkedIn post (max 1300 characters).
Make it insightful, add business value, use 2-3 strategic hashtags.
Maintain professional tone and format for thought leadership.
Include line breaks for readability.

Content: {content}
Tone: {tone}""",

    PlatformEnum.TWITTER: """Create a Twitter thread from this content.
First tweet must hook attention in under 280 characters.
Create 2-4 tweets total. Use casual, conversational tone.
Include relevant hashtags. Separate tweets with '---TWEET---'.

Content: {content}
Tone: {tone}""",

    PlatformEnum.INSTAGRAM: """Write an Instagram caption from this content.
Start with an attention-grabbing hook.
Tell a story with emotional connection.
End with a clear call-to-action.
Include 25-30 relevant hashtags at the end (on separate lines after the caption).

Content: {content}
Tone: {tone}""",

    PlatformEnum.FACEBOOK: """Create a Facebook post from this content.
Make it community-focused with a personal storytelling angle.
Aim for 300-500 words that spark conversation.
Ask an engaging question at the end to encourage comments.
Use 2-3 relevant hashtags.

Content: {content}
Tone: {tone}"""
}

async def generate_platform_content(
    base_content: str,
    tone: ToneEnum,
    platforms: List[PlatformEnum]
) -> List[PlatformContent]:
    """Generate optimized content for specified platforms using Claude API."""

    results = []

    for platform in platforms:
        prompt = PLATFORM_PROMPTS[platform].format(
            content=base_content,
            tone=tone.value
        )

        try:
            message = client.messages.create(
                model="claude-sonnet-4-20250514",
                max_tokens=1500,
                temperature=0.7,
                messages=[
                    {
                        "role": "user",
                        "content": prompt
                    }
                ]
            )

            generated_content = message.content[0].text

            # Extract hashtags
            hashtags = extract_hashtags(generated_content)

            platform_content = PlatformContent(
                platform=platform,
                content=generated_content,
                character_count=len(generated_content),
                hashtags=hashtags
            )

            results.append(platform_content)

        except Exception as e:
            # Log error but continue with other platforms
            print(f"Error generating content for {platform}: {str(e)}")
            # Add error content
            platform_content = PlatformContent(
                platform=platform,
                content=f"Error generating content: {str(e)}",
                character_count=0,
                hashtags=[]
            )
            results.append(platform_content)

    return results

def extract_hashtags(content: str) -> List[str]:
    """Extract hashtags from generated content."""
    words = content.split()
    hashtags = [word for word in words if word.startswith('#')]
    return hashtags[:30]  # Limit to 30 hashtags
