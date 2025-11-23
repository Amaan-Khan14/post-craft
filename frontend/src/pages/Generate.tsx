import { useState } from 'react'
import { useMutation, useQuery } from '@tanstack/react-query'
import { api } from '@/lib/api'
import { ToneEnum, PlatformEnum, GenerateResponse, PlatformContent } from '@/types'

export default function Generate() {
  const [baseContent, setBaseContent] = useState('')
  const [tone, setTone] = useState<ToneEnum>(ToneEnum.PROFESSIONAL)
  const [selectedPlatforms, setSelectedPlatforms] = useState<PlatformEnum[]>([
    PlatformEnum.LINKEDIN,
    PlatformEnum.TWITTER,
  ])
  const [generatedContent, setGeneratedContent] = useState<GenerateResponse | null>(null)
  const [copiedPlatform, setCopiedPlatform] = useState<string | null>(null)

  const { data: usage } = useQuery({
    queryKey: ['usage'],
    queryFn: api.getUsage,
  })

  const generateMutation = useMutation({
    mutationFn: api.generateContent,
    onSuccess: (data) => {
      setGeneratedContent(data)
    },
  })

  const handlePlatformToggle = (platform: PlatformEnum) => {
    if (selectedPlatforms.includes(platform)) {
      setSelectedPlatforms(selectedPlatforms.filter((p) => p !== platform))
    } else {
      setSelectedPlatforms([...selectedPlatforms, platform])
    }
  }

  const handleGenerate = () => {
    if (!baseContent.trim() || selectedPlatforms.length === 0) {
      return
    }

    generateMutation.mutate({
      base_content: baseContent,
      tone,
      platforms: selectedPlatforms,
    })
  }

  const handleCopy = async (content: string, platform: string) => {
    try {
      await navigator.clipboard.writeText(content)
      setCopiedPlatform(platform)
      setTimeout(() => setCopiedPlatform(null), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  const getPlatformIcon = (platform: PlatformEnum) => {
    switch (platform) {
      case PlatformEnum.LINKEDIN:
        return '💼'
      case PlatformEnum.TWITTER:
        return '🐦'
      case PlatformEnum.INSTAGRAM:
        return '📸'
      case PlatformEnum.FACEBOOK:
        return '👥'
    }
  }

  const getPlatformColor = (platform: PlatformEnum) => {
    switch (platform) {
      case PlatformEnum.LINKEDIN:
        return 'bg-blue-600'
      case PlatformEnum.TWITTER:
        return 'bg-blue-400'
      case PlatformEnum.INSTAGRAM:
        return 'bg-gradient-to-br from-purple-600 via-pink-600 to-orange-600'
      case PlatformEnum.FACEBOOK:
        return 'bg-blue-700'
    }
  }

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Generate Content</h1>
        <p className="text-gray-600">
          Transform your content for multiple platforms with AI
        </p>
        {usage && (
          <div className="mt-4 inline-flex items-center px-4 py-2 bg-primary-50 rounded-lg">
            <span className="text-sm font-medium text-primary-900">
              {usage.posts_count} / {usage.posts_limit} posts this month
            </span>
          </div>
        )}
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Input Section */}
        <div className="space-y-6">
          <div className="card">
            <h2 className="text-xl font-bold mb-4">Your Content</h2>
            <textarea
              className="input min-h-[200px] resize-y"
              placeholder="Paste your base content here... (e.g., blog excerpt, announcement, key points)"
              value={baseContent}
              onChange={(e) => setBaseContent(e.target.value)}
            />
            <div className="mt-2 text-sm text-gray-500">
              {baseContent.length} characters
            </div>
          </div>

          <div className="card">
            <h2 className="text-xl font-bold mb-4">Tone</h2>
            <div className="grid grid-cols-3 gap-3">
              {Object.values(ToneEnum).map((t) => (
                <button
                  key={t}
                  onClick={() => setTone(t)}
                  className={`px-4 py-3 rounded-lg border-2 transition-all ${
                    tone === t
                      ? 'border-primary-600 bg-primary-50 text-primary-900'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="font-medium capitalize">{t}</div>
                </button>
              ))}
            </div>
          </div>

          <div className="card">
            <h2 className="text-xl font-bold mb-4">Select Platforms</h2>
            <div className="grid grid-cols-2 gap-3">
              {Object.values(PlatformEnum).map((platform) => (
                <button
                  key={platform}
                  onClick={() => handlePlatformToggle(platform)}
                  className={`px-4 py-3 rounded-lg border-2 transition-all ${
                    selectedPlatforms.includes(platform)
                      ? 'border-primary-600 bg-primary-50 text-primary-900'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center justify-center">
                    <span className="text-2xl mr-2">{getPlatformIcon(platform)}</span>
                    <span className="font-medium capitalize">{platform}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={handleGenerate}
            disabled={
              !baseContent.trim() ||
              selectedPlatforms.length === 0 ||
              generateMutation.isPending
            }
            className="btn btn-primary w-full text-lg py-3"
          >
            {generateMutation.isPending ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                Generating...
              </div>
            ) : (
              'Generate Content'
            )}
          </button>

          {generateMutation.isError && (
            <div className="rounded-md bg-red-50 p-4">
              <p className="text-sm text-red-800">
                {(generateMutation.error as Error).message}
              </p>
            </div>
          )}
        </div>

        {/* Results Section */}
        <div className="space-y-6">
          {generatedContent ? (
            <>
              <div className="card bg-green-50 border-green-200">
                <div className="flex items-start">
                  <svg
                    className="h-6 w-6 text-green-600 mr-2"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M5 13l4 4L19 7"></path>
                  </svg>
                  <div className="flex-1">
                    <h3 className="font-medium text-green-900">Content Generated!</h3>
                    <p className="text-sm text-green-700 mt-1">
                      {generatedContent.ai_disclaimer}
                    </p>
                  </div>
                </div>
              </div>

              {generatedContent.platforms.map((platformContent: PlatformContent) => (
                <div key={platformContent.platform} className="card">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      <div
                        className={`${getPlatformColor(
                          platformContent.platform
                        )} text-white rounded-lg p-2 mr-3`}
                      >
                        <span className="text-xl">{getPlatformIcon(platformContent.platform)}</span>
                      </div>
                      <div>
                        <h3 className="font-bold capitalize">{platformContent.platform}</h3>
                        <p className="text-sm text-gray-500">
                          {platformContent.character_count} characters
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() =>
                        handleCopy(platformContent.content, platformContent.platform)
                      }
                      className="btn btn-secondary text-sm"
                    >
                      {copiedPlatform === platformContent.platform ? (
                        <>
                          <svg
                            className="h-4 w-4 mr-1 inline"
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path d="M5 13l4 4L19 7"></path>
                          </svg>
                          Copied!
                        </>
                      ) : (
                        <>
                          <svg
                            className="h-4 w-4 mr-1 inline"
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
                          </svg>
                          Copy
                        </>
                      )}
                    </button>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <pre className="whitespace-pre-wrap font-sans text-sm text-gray-800">
                      {platformContent.content}
                    </pre>
                  </div>
                  {platformContent.hashtags.length > 0 && (
                    <div className="mt-3">
                      <p className="text-xs text-gray-500 mb-2">
                        Hashtags: {platformContent.hashtags.length}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {platformContent.hashtags.slice(0, 10).map((tag, idx) => (
                          <span
                            key={idx}
                            className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </>
          ) : (
            <div className="card text-center py-12">
              <div className="text-6xl mb-4">✨</div>
              <h3 className="text-xl font-medium text-gray-900 mb-2">
                Ready to Generate
              </h3>
              <p className="text-gray-600">
                Enter your content, choose platforms and tone, then click generate to see AI-optimized versions for each platform.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
