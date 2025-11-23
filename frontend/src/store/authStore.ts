import { create } from 'zustand'
import { supabase } from '@/lib/supabase'
import type { User } from '@/types'

interface AuthState {
  user: User | null
  loading: boolean
  signIn: (email: string, password: string) => Promise<void>
  signUp: (email: string, password: string) => Promise<void>
  signOut: () => Promise<void>
  initialize: () => Promise<void>
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  loading: true,

  signIn: async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) throw error

    set({ user: data.user as User })
  },

  signUp: async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    })

    if (error) throw error

    set({ user: data.user as User })
  },

  signOut: async () => {
    const { error } = await supabase.auth.signOut()
    if (error) throw error

    set({ user: null })
  },

  initialize: async () => {
    try {
      const { data } = await supabase.auth.getSession()
      set({ user: data.session?.user as User | null, loading: false })

      supabase.auth.onAuthStateChange((_event, session) => {
        set({ user: session?.user as User | null })
      })
    } catch (error) {
      console.error('Auth initialization error:', error)
      set({ loading: false })
    }
  },
}))
