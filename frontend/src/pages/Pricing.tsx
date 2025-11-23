import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '@/store/authStore'
import { api } from '@/lib/api'
import { SubscriptionTierEnum } from '@/types'

const plans = [
  {
    name: 'Free',
    tier: SubscriptionTierEnum.FREE,
    price: 0,
    features: [
      '10 posts per month',
      'LinkedIn + Twitter only',
      'All tone options',
      'Character count tracking',
      'Copy to clipboard',
    ],
    cta: 'Current Plan',
    popular: false,
  },
  {
    name: 'Starter',
    tier: SubscriptionTierEnum.STARTER,
    price: 19,
    features: [
      '50 posts per month',
      'All 4 platforms',
      'LinkedIn, Twitter, Instagram, Facebook',
      'Priority support',
      'Save post history',
    ],
    cta: 'Upgrade to Starter',
    popular: true,
  },
  {
    name: 'Pro',
    tier: SubscriptionTierEnum.PRO,
    price: 49,
    features: [
      '200 posts per month',
      'All 4 platforms',
      'Advanced analytics (coming soon)',
      'Priority support',
      'Unlimited history',
      'Brand voice customization',
    ],
    cta: 'Upgrade to Pro',
    popular: false,
  },
]

export default function Pricing() {
  const { user } = useAuthStore()
  const navigate = useNavigate()
  const [loading, setLoading] = useState<string | null>(null)
  const [error, setError] = useState('')

  const handleUpgrade = async (tier: SubscriptionTierEnum) => {
    if (!user) {
      navigate('/signup')
      return
    }

    if (tier === SubscriptionTierEnum.FREE) {
      return
    }

    setLoading(tier)
    setError('')

    try {
      const { checkout_url } = await api.createCheckout({
        tier,
        success_url: `${window.location.origin}/dashboard?success=true`,
        cancel_url: `${window.location.origin}/pricing`,
      })

      window.location.href = checkout_url
    } catch (err: any) {
      setError(err.message || 'Failed to create checkout session')
      setLoading(null)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Choose Your Plan
          </h1>
          <p className="text-xl text-gray-600">
            Start free, upgrade when you need more posts
          </p>
        </div>

        {error && (
          <div className="max-w-2xl mx-auto mb-8 rounded-md bg-red-50 p-4">
            <p className="text-sm text-red-800">{error}</p>
          </div>
        )}

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan) => (
            <div
              key={plan.tier}
              className={`card relative ${
                plan.popular ? 'border-2 border-primary-600 shadow-xl' : 'border border-gray-200'
              }`}
            >
              {plan.popular && (
                <div className="absolute top-0 right-0 bg-primary-600 text-white px-3 py-1 rounded-bl-lg rounded-tr-lg text-sm font-medium">
                  Most Popular
                </div>
              )}

              <div className="mb-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                <div className="flex items-baseline">
                  <span className="text-5xl font-extrabold text-gray-900">${plan.price}</span>
                  <span className="text-xl text-gray-600 ml-2">/month</span>
                </div>
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <svg
                      className="h-6 w-6 text-green-500 mr-2 flex-shrink-0"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                onClick={() => handleUpgrade(plan.tier)}
                disabled={loading === plan.tier}
                className={`w-full ${
                  plan.popular ? 'btn btn-primary' : 'btn btn-outline'
                } ${loading === plan.tier ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {loading === plan.tier ? 'Processing...' : plan.cta}
              </button>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-600 mb-4">
            All plans include AI-powered content generation with Claude by Anthropic
          </p>
          <p className="text-sm text-gray-500">
            Need more? Contact us for enterprise plans with custom limits and features.
          </p>
        </div>
      </div>
    </div>
  )
}
