import { getAuthToken } from './supabase'
import type { GenerateRequest, GenerateResponse, Post, Usage, Profile } from '@/types'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000'

async function fetchWithAuth(url: string, options: RequestInit = {}) {
  const token = await getAuthToken()

  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
    ...options.headers,
  }

  const response = await fetch(`${API_URL}${url}`, {
    ...options,
    headers,
  })

  if (!response.ok) {
    const error = await response.json().catch(() => ({ detail: 'An error occurred' }))
    throw new Error(error.detail || `HTTP error! status: ${response.status}`)
  }

  return response.json()
}

export const api = {
  // Content generation
  generateContent: async (data: GenerateRequest): Promise<GenerateResponse> => {
    return fetchWithAuth('/api/generate', {
      method: 'POST',
      body: JSON.stringify(data),
    })
  },

  // Posts
  getPosts: async (limit = 20, offset = 0): Promise<Post[]> => {
    return fetchWithAuth(`/api/posts?limit=${limit}&offset=${offset}`)
  },

  getPost: async (id: string): Promise<Post> => {
    return fetchWithAuth(`/api/posts/${id}`)
  },

  deletePost: async (id: string): Promise<{ message: string }> => {
    return fetchWithAuth(`/api/posts/${id}`, {
      method: 'DELETE',
    })
  },

  // Usage
  getUsage: async (): Promise<Usage> => {
    return fetchWithAuth('/api/usage')
  },

  // Profile
  getProfile: async (): Promise<Profile> => {
    return fetchWithAuth('/api/profile')
  },

  updateProfile: async (data: { brand_voice?: string }): Promise<Profile> => {
    return fetchWithAuth('/api/profile', {
      method: 'PATCH',
      body: JSON.stringify(data),
    })
  },

  // Checkout
  createCheckout: async (data: {
    tier: string
    success_url: string
    cancel_url: string
  }): Promise<{ checkout_url: string }> => {
    return fetchWithAuth('/api/checkout', {
      method: 'POST',
      body: JSON.stringify(data),
    })
  },
}
