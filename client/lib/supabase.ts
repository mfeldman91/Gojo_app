import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://tgqfnaacjpjyjasasszy.supabase.co'
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseKey) {
  throw new Error('Missing Supabase anon key. Please set VITE_SUPABASE_ANON_KEY environment variable.')
}

export const supabase = createClient(supabaseUrl, supabaseKey)

// Database types for TypeScript
export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string
          first_name: string
          last_name: string
          avatar_url?: string
          role: 'student' | 'instructor' | 'admin'
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          email: string
          first_name: string
          last_name: string
          avatar_url?: string
          role?: 'student' | 'instructor' | 'admin'
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          first_name?: string
          last_name?: string
          avatar_url?: string
          role?: 'student' | 'instructor' | 'admin'
          updated_at?: string
        }
      }
      instructor_profiles: {
        Row: {
          id: string
          user_id: string
          bio?: string
          experience?: string
          martial_arts_specialties: string[]
          qualifications: string[]
          verification_status: 'pending' | 'approved' | 'rejected'
          stripe_account_id?: string
          stripe_onboarding_complete: boolean
          hourly_rate?: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          bio?: string
          experience?: string
          martial_arts_specialties?: string[]
          qualifications?: string[]
          verification_status?: 'pending' | 'approved' | 'rejected'
          stripe_account_id?: string
          stripe_onboarding_complete?: boolean
          hourly_rate?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          bio?: string
          experience?: string
          martial_arts_specialties?: string[]
          qualifications?: string[]
          verification_status?: 'pending' | 'approved' | 'rejected'
          stripe_account_id?: string
          stripe_onboarding_complete?: boolean
          hourly_rate?: number
          updated_at?: string
        }
      }
      courses: {
        Row: {
          id: string
          instructor_id: string
          title: string
          description: string
          price: number
          currency: string
          category: string
          difficulty_level: 'beginner' | 'intermediate' | 'advanced'
          duration_hours: number
          status: 'draft' | 'published' | 'archived'
          thumbnail_url?: string
          video_url?: string
          stripe_price_id?: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          instructor_id: string
          title: string
          description: string
          price: number
          currency?: string
          category: string
          difficulty_level: 'beginner' | 'intermediate' | 'advanced'
          duration_hours: number
          status?: 'draft' | 'published' | 'archived'
          thumbnail_url?: string
          video_url?: string
          stripe_price_id?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          instructor_id?: string
          title?: string
          description?: string
          price?: number
          currency?: string
          category?: string
          difficulty_level?: 'beginner' | 'intermediate' | 'advanced'
          duration_hours?: number
          status?: 'draft' | 'published' | 'archived'
          thumbnail_url?: string
          video_url?: string
          stripe_price_id?: string
          updated_at?: string
        }
      }
      enrollments: {
        Row: {
          id: string
          user_id: string
          course_id: string
          stripe_payment_intent_id: string
          amount_paid: number
          currency: string
          enrollment_date: string
          completion_date?: string
          progress_percentage: number
        }
        Insert: {
          id?: string
          user_id: string
          course_id: string
          stripe_payment_intent_id: string
          amount_paid: number
          currency?: string
          enrollment_date?: string
          completion_date?: string
          progress_percentage?: number
        }
        Update: {
          id?: string
          user_id?: string
          course_id?: string
          stripe_payment_intent_id?: string
          amount_paid?: number
          currency?: string
          enrollment_date?: string
          completion_date?: string
          progress_percentage?: number
        }
      }
    }
  }
}
