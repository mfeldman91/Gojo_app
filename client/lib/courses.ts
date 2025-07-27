import { supabase } from './supabase';
import { getCurrentUser } from './auth';

export interface Course {
  id: string;
  instructor_id: string;
  title: string;
  description: string;
  price: number;
  currency: string;
  category: string;
  difficulty_level: 'beginner' | 'intermediate' | 'advanced';
  duration_hours: number;
  status: 'draft' | 'published' | 'archived';
  thumbnail_url?: string;
  video_url?: string;
  stripe_price_id?: string;
  created_at: string;
  updated_at: string;
  // Joined fields
  instructor_name?: string;
  students_count?: number;
  rating?: number;
  reviews_count?: number;
  is_enrolled?: boolean;
}

export interface Lesson {
  id: string;
  course_id: string;
  title: string;
  description?: string;
  video_url?: string;
  duration_minutes?: number;
  order_index: number;
  created_at: string;
  updated_at: string;
}

export interface Enrollment {
  id: string;
  user_id: string;
  course_id: string;
  stripe_payment_intent_id: string;
  amount_paid: number;
  currency: string;
  enrollment_date: string;
  completion_date?: string;
  progress_percentage: number;
}

// Get all published courses
export const getCourses = async (filters?: {
  category?: string;
  difficulty?: string;
  search?: string;
  limit?: number;
  offset?: number;
}) => {
  try {
    let query = supabase
      .from('courses')
      .select(`
        *,
        instructor_profiles!inner(
          user_id,
          users!inner(first_name, last_name)
        )
      `)
      .eq('status', 'published');

    if (filters?.category) {
      query = query.eq('category', filters.category);
    }

    if (filters?.difficulty) {
      query = query.eq('difficulty_level', filters.difficulty);
    }

    if (filters?.search) {
      query = query.or(`title.ilike.%${filters.search}%,description.ilike.%${filters.search}%`);
    }

    if (filters?.limit) {
      query = query.limit(filters.limit);
    }

    if (filters?.offset) {
      query = query.range(filters.offset, (filters.offset + (filters.limit || 10)) - 1);
    }

    const { data, error } = await query.order('created_at', { ascending: false });

    if (error) throw error;

    // Transform data to include instructor name
    const courses = data?.map(course => ({
      ...course,
      instructor_name: `${course.instructor_profiles.users.first_name} ${course.instructor_profiles.users.last_name}`,
      students_count: Math.floor(Math.random() * 1000) + 50, // Mock data for now
      rating: 4.5 + Math.random() * 0.5, // Mock data for now
      reviews_count: Math.floor(Math.random() * 100) + 10, // Mock data for now
    })) || [];

    return { success: true, data: courses };
  } catch (error) {
    console.error('Get courses error:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Failed to load courses' 
    };
  }
};

// Get course by ID
export const getCourse = async (courseId: string) => {
  try {
    const { data, error } = await supabase
      .from('courses')
      .select(`
        *,
        instructor_profiles!inner(
          *,
          users!inner(first_name, last_name, avatar_url)
        ),
        lessons(*)
      `)
      .eq('id', courseId)
      .single();

    if (error) throw error;

    // Check if current user is enrolled
    const user = await getCurrentUser();
    let isEnrolled = false;
    
    if (user) {
      const { data: enrollment } = await supabase
        .from('enrollments')
        .select('id')
        .eq('user_id', user.id)
        .eq('course_id', courseId)
        .single();
      
      isEnrolled = !!enrollment;
    }

    const course = {
      ...data,
      instructor_name: `${data.instructor_profiles.users.first_name} ${data.instructor_profiles.users.last_name}`,
      instructor_avatar: data.instructor_profiles.users.avatar_url,
      students_count: Math.floor(Math.random() * 1000) + 50,
      rating: 4.5 + Math.random() * 0.5,
      reviews_count: Math.floor(Math.random() * 100) + 10,
      is_enrolled: isEnrolled,
    };

    return { success: true, data: course };
  } catch (error) {
    console.error('Get course error:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Failed to load course' 
    };
  }
};

// Create new course
export const createCourse = async (courseData: Partial<Course>) => {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return { success: false, error: 'Not authenticated' };
    }

    // Get instructor profile
    const { data: instructorProfile } = await supabase
      .from('instructor_profiles')
      .select('id')
      .eq('user_id', user.id)
      .single();

    if (!instructorProfile) {
      return { success: false, error: 'Instructor profile not found' };
    }

    const { data, error } = await supabase
      .from('courses')
      .insert({
        instructor_id: instructorProfile.id,
        ...courseData,
        status: 'draft',
        currency: 'USD',
      })
      .select()
      .single();

    if (error) throw error;
    return { success: true, data };
  } catch (error) {
    console.error('Create course error:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Failed to create course' 
    };
  }
};

// Update course
export const updateCourse = async (courseId: string, updates: Partial<Course>) => {
  try {
    const { data, error } = await supabase
      .from('courses')
      .update({
        ...updates,
        updated_at: new Date().toISOString(),
      })
      .eq('id', courseId)
      .select()
      .single();

    if (error) throw error;
    return { success: true, data };
  } catch (error) {
    console.error('Update course error:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Failed to update course' 
    };
  }
};

// Get instructor courses
export const getInstructorCourses = async () => {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return { success: false, error: 'Not authenticated' };
    }

    const { data: instructorProfile } = await supabase
      .from('instructor_profiles')
      .select('id')
      .eq('user_id', user.id)
      .single();

    if (!instructorProfile) {
      return { success: false, error: 'Instructor profile not found' };
    }

    const { data, error } = await supabase
      .from('courses')
      .select('*')
      .eq('instructor_id', instructorProfile.id)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return { success: true, data: data || [] };
  } catch (error) {
    console.error('Get instructor courses error:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Failed to load courses' 
    };
  }
};

// Enroll in course
export const enrollInCourse = async (courseId: string, paymentIntentId: string, amount: number) => {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return { success: false, error: 'Not authenticated' };
    }

    const { data, error } = await supabase
      .from('enrollments')
      .insert({
        user_id: user.id,
        course_id: courseId,
        stripe_payment_intent_id: paymentIntentId,
        amount_paid: amount,
        currency: 'USD',
        progress_percentage: 0,
      })
      .select()
      .single();

    if (error) throw error;
    return { success: true, data };
  } catch (error) {
    console.error('Enroll in course error:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Failed to enroll in course' 
    };
  }
};

// Get user enrollments
export const getUserEnrollments = async () => {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return { success: false, error: 'Not authenticated' };
    }

    const { data, error } = await supabase
      .from('enrollments')
      .select(`
        *,
        courses(
          *,
          instructor_profiles(
            users(first_name, last_name)
          )
        )
      `)
      .eq('user_id', user.id)
      .order('enrollment_date', { ascending: false });

    if (error) throw error;
    return { success: true, data: data || [] };
  } catch (error) {
    console.error('Get user enrollments error:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Failed to load enrollments' 
    };
  }
};

// Course categories
export const COURSE_CATEGORIES = [
  'Boxing',
  'Muay Thai',
  'Brazilian Jiu-Jitsu',
  'Karate',
  'Taekwondo',
  'Wing Chun',
  'Kung Fu',
  'MMA',
  'Self-Defense',
  'Kickboxing',
  'Judo',
  'Aikido',
  'Krav Maga',
  'Capoeira',
  'Wrestling',
] as const;

export type CourseCategory = typeof COURSE_CATEGORIES[number];
