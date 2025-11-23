import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import { api } from '@/lib/api'
import { SubscriptionTierEnum } from '@/types'

export default function Dashboard() {
  const { data: usage, isLoading: usageLoading } = useQuery({
    queryKey: ['usage'],
    queryFn: api.getUsage,
  })

  const { data: profile, isLoading: profileLoading } = useQuery({
    queryKey: ['profile'],
    queryFn: api.getProfile,
  })

  const { data: posts, isLoading: postsLoading } = useQuery({
    queryKey: ['posts'],
    queryFn: () => api.getPosts(10, 0),
  })

  const usagePercentage = usage
    ? Math.round((usage.posts_count / usage.posts_limit) * 100)
    : 0

  const getUsageColor = () => {
    if (usagePercentage >= 90) return 'bg-red-600'
    if (usagePercentage >= 70) return 'bg-yellow-600'
    return 'bg-primary-600'
  }

  const getTierBadgeColor = (tier: SubscriptionTierEnum) => {
    switch (tier) {
      case SubscriptionTierEnum.FREE:
        return 'bg-gray-100 text-gray-800'
      case SubscriptionTierEnum.STARTER:
        return 'bg-blue-100 text-blue-800'
      case SubscriptionTierEnum.PRO:
        return 'bg-purple-100 text-purple-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  if (usageLoading || profileLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-2">
          Welcome back! Here's your content generation overview.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        {/* Usage Card */}
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-900">Monthly Usage</h3>
            {profile && (
              <span
                className={`px-3 py-1 rounded-full text-xs font-medium ${getTierBadgeColor(
                  profile.subscription_tier
                )}`}
              >
                {profile.subscription_tier.toUpperCase()}
              </span>
            )}
          </div>

          {usage && (
            <>
              <div className="mb-2">
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600">Posts Generated</span>
                  <span className="font-medium">
                    {usage.posts_count} / {usage.posts_limit}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`${getUsageColor()} h-2 rounded-full transition-all`}
                    style={{ width: `${Math.min(usagePercentage, 100)}%` }}
                  ></div>
                </div>
              </div>

              {usagePercentage >= 80 && (
                <div className="mt-4 p-3 bg-yellow-50 rounded-lg">
                  <p className="text-sm text-yellow-800">
                    {usagePercentage >= 100
                      ? "You've reached your monthly limit. "
                      : "You're running low on posts. "}
                    <Link to="/pricing" className="font-medium underline">
                      Upgrade your plan
                    </Link>
                  </p>
                </div>
              )}
            </>
          )}
        </div>

        {/* Quick Generate Card */}
        <div className="card bg-gradient-to-br from-primary-500 to-primary-700 text-white">
          <h3 className="text-lg font-medium mb-2">Quick Generate</h3>
          <p className="text-primary-100 mb-4 text-sm">
            Transform your content into platform-optimized posts
          </p>
          <Link to="/generate" className="btn bg-white text-primary-600 hover:bg-gray-100">
            Generate Content
          </Link>
        </div>

        {/* Subscription Card */}
        <div className="card">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Subscription</h3>
          {profile && (
            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-600">Current Plan</p>
                <p className="text-xl font-bold capitalize">{profile.subscription_tier}</p>
              </div>

              {profile.subscription_tier === SubscriptionTierEnum.FREE ? (
                <Link to="/pricing" className="btn btn-primary w-full text-sm">
                  Upgrade Plan
                </Link>
              ) : (
                <div className="text-sm text-gray-600">
                  <p>Active subscription</p>
                  {profile.stripe_subscription_id && (
                    <p className="text-xs text-gray-500 mt-1">
                      Manage in billing portal
                    </p>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Recent Posts */}
      <div className="card">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900">Recent Posts</h2>
          <Link to="/generate" className="text-primary-600 hover:text-primary-700 text-sm font-medium">
            View All
          </Link>
        </div>

        {postsLoading ? (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600 mx-auto"></div>
          </div>
        ) : posts && posts.length > 0 ? (
          <div className="space-y-4">
            {posts.slice(0, 5).map((post) => (
              <div
                key={post.id}
                className="border border-gray-200 rounded-lg p-4 hover:border-primary-300 transition-colors"
              >
                <div className="flex items-start justify-between mb-2">
                  <p className="text-sm text-gray-900 line-clamp-2">{post.base_content}</p>
                  <span className="text-xs text-gray-500 ml-4 whitespace-nowrap">
                    {new Date(post.created_at).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  {post.linkedin_version && (
                    <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                      LinkedIn
                    </span>
                  )}
                  {post.twitter_version && (
                    <span className="text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded">
                      Twitter
                    </span>
                  )}
                  {post.instagram_version && (
                    <span className="text-xs bg-pink-100 text-pink-800 px-2 py-1 rounded">
                      Instagram
                    </span>
                  )}
                  {post.facebook_version && (
                    <span className="text-xs bg-blue-200 text-blue-900 px-2 py-1 rounded">
                      Facebook
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-5xl mb-4">📝</div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No posts yet</h3>
            <p className="text-gray-600 mb-4">
              Generate your first AI-optimized content for social media
            </p>
            <Link to="/generate" className="btn btn-primary">
              Create First Post
            </Link>
          </div>
        )}
      </div>

      {/* Tips Section */}
      <div className="mt-8 grid md:grid-cols-2 gap-6">
        <div className="card bg-blue-50 border-blue-200">
          <h3 className="font-bold text-blue-900 mb-2">💡 Pro Tip</h3>
          <p className="text-sm text-blue-800">
            For best results, provide clear, detailed base content. The AI will adapt it to each platform's style and best practices.
          </p>
        </div>

        <div className="card bg-green-50 border-green-200">
          <h3 className="font-bold text-green-900 mb-2">✨ Did you know?</h3>
          <p className="text-sm text-green-800">
            Content generated by PostCraft uses Claude by Anthropic, ensuring high-quality, contextually appropriate posts for each platform.
          </p>
        </div>
      </div>
    </div>
  )
}
