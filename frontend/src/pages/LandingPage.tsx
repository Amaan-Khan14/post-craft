import { Link } from 'react-router-dom'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <span className="text-2xl font-bold text-primary-600">PostCraft</span>
            </div>
            <div className="flex items-center space-x-4">
              <Link to="/pricing" className="text-gray-700 hover:text-primary-600">
                Pricing
              </Link>
              <Link to="/signin" className="btn btn-secondary text-sm">
                Sign In
              </Link>
              <Link to="/signup" className="btn btn-primary text-sm">
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-6">
              One Content Piece,
              <br />
              <span className="text-primary-600">Every Platform.</span>
              <br />
              Perfectly Optimized.
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Transform your single piece of content into platform-optimized posts for LinkedIn, Twitter, Instagram, and Facebook using AI. Save hours of reformatting and reach your audience everywhere.
            </p>
            <div className="flex justify-center space-x-4">
              <Link to="/signup" className="btn btn-primary text-lg px-8 py-3">
                Start Free - 10 Posts/Month
              </Link>
              <Link to="/pricing" className="btn btn-outline text-lg px-8 py-3">
                View Pricing
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Problem Statement */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Stop Wasting Time on Reformatting
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Every social platform has different best practices, character limits, and audience expectations. Manually adapting your content for each platform is time-consuming and inconsistent.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="card text-center">
              <div className="text-4xl mb-4">⏰</div>
              <h3 className="text-xl font-bold mb-2">Hours Wasted</h3>
              <p className="text-gray-600">
                Reformatting the same content for multiple platforms takes valuable time away from creating.
              </p>
            </div>
            <div className="card text-center">
              <div className="text-4xl mb-4">🎯</div>
              <h3 className="text-xl font-bold mb-2">Missed Optimization</h3>
              <p className="text-gray-600">
                Each platform has unique requirements for hashtags, length, and tone that are hard to remember.
              </p>
            </div>
            <div className="card text-center">
              <div className="text-4xl mb-4">📉</div>
              <h3 className="text-xl font-bold mb-2">Lower Engagement</h3>
              <p className="text-gray-600">
                Generic posts that aren't optimized for each platform perform poorly and miss opportunities.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Solution Showcase */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              How PostCraft Works
            </h2>
            <p className="text-lg text-gray-600">
              Transform your content in three simple steps
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-primary-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary-600">1</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Input Your Content</h3>
              <p className="text-gray-600">
                Paste your base content, choose a tone (professional, casual, or playful), and select platforms.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-primary-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary-600">2</span>
              </div>
              <h3 className="text-xl font-bold mb-2">AI Optimization</h3>
              <p className="text-gray-600">
                Our AI adapts your content for each platform's best practices, length, and hashtag strategy.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-primary-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary-600">3</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Copy & Post</h3>
              <p className="text-gray-600">
                Review, edit if needed, and copy your optimized content to each platform. Done in seconds.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Platform Features */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Optimized for Every Platform
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="card">
              <div className="flex items-start">
                <div className="bg-blue-100 rounded-lg p-3 mr-4">
                  <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">LinkedIn</h3>
                  <p className="text-gray-600">Professional tone, 1300 character max, strategic hashtags for thought leadership.</p>
                </div>
              </div>
            </div>

            <div className="card">
              <div className="flex items-start">
                <div className="bg-blue-400 rounded-lg p-3 mr-4">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Twitter/X</h3>
                  <p className="text-gray-600">Punchy thread format, conversational tone, attention-grabbing hooks.</p>
                </div>
              </div>
            </div>

            <div className="card">
              <div className="flex items-start">
                <div className="bg-gradient-to-br from-purple-600 via-pink-600 to-orange-600 rounded-lg p-3 mr-4">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Instagram</h3>
                  <p className="text-gray-600">Visual-first captions, storytelling approach, 25-30 relevant hashtags.</p>
                </div>
              </div>
            </div>

            <div className="card">
              <div className="flex items-start">
                <div className="bg-blue-600 rounded-lg p-3 mr-4">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Facebook</h3>
                  <p className="text-gray-600">Community-focused, personal storytelling, engagement questions.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Pricing Preview */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Simple, Transparent Pricing
            </h2>
            <p className="text-lg text-gray-600">
              Start free, upgrade when you need more
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="card border-2 border-gray-200">
              <h3 className="text-2xl font-bold mb-2">Free</h3>
              <div className="text-4xl font-bold mb-4">$0<span className="text-lg text-gray-600">/mo</span></div>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  10 posts/month
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  LinkedIn + Twitter
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  All tones
                </li>
              </ul>
              <Link to="/signup" className="btn btn-secondary w-full">
                Get Started
              </Link>
            </div>

            <div className="card border-2 border-primary-600 relative">
              <div className="absolute top-0 right-0 bg-primary-600 text-white px-3 py-1 rounded-bl-lg rounded-tr-lg text-sm font-medium">
                Popular
              </div>
              <h3 className="text-2xl font-bold mb-2">Starter</h3>
              <div className="text-4xl font-bold mb-4">$19<span className="text-lg text-gray-600">/mo</span></div>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  50 posts/month
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  All 4 platforms
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  Priority support
                </li>
              </ul>
              <Link to="/signup" className="btn btn-primary w-full">
                Start Free Trial
              </Link>
            </div>

            <div className="card border-2 border-gray-200">
              <h3 className="text-2xl font-bold mb-2">Pro</h3>
              <div className="text-4xl font-bold mb-4">$49<span className="text-lg text-gray-600">/mo</span></div>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  200 posts/month
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  All 4 platforms
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  Analytics (coming soon)
                </li>
              </ul>
              <Link to="/signup" className="btn btn-primary w-full">
                Start Free Trial
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-primary-600 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">
            Ready to Save Hours Every Week?
          </h2>
          <p className="text-xl text-primary-100 mb-8">
            Join creators who are already using PostCraft to reach more audiences with less effort.
          </p>
          <Link to="/signup" className="btn bg-white text-primary-600 hover:bg-gray-100 text-lg px-8 py-3">
            Start Free - 10 Posts/Month
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-gray-400">
            <p className="mb-2">PostCraft - Transform content for every platform</p>
            <p className="text-sm">Content generated with AI assistance using Claude by Anthropic</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
