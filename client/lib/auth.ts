// Authentication service using Supabase
import { useState, useEffect } from 'react';
import * as supabaseAuth from './auth-supabase';
import { supabase } from './supabase';

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  dateOfBirth?: string;
  experience?: string;
  martialArtsInterest?: string[];
  goals?: string[];
  plan?: string;
  createdAt: string;
  avatar?: string;
  role?: 'student' | 'instructor' | 'admin';
}

export interface LoginCredentials {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface SignupData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  dateOfBirth?: string;
  experience?: string;
  martialArtsInterest?: string[];
  goals?: string[];
  plan?: string;
  agreedToTerms: boolean;
}

// Session management using Supabase
export const getCurrentUser = async (): Promise<User | null> => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return null;

    // Get user profile from our users table
    const profile = await supabaseAuth.getUserProfile(user.id);
    if (!profile) return null;

    return {
      id: profile.id,
      email: profile.email,
      firstName: profile.first_name,
      lastName: profile.last_name,
      avatar: profile.avatar_url,
      role: profile.role,
      createdAt: profile.created_at,
    };
  } catch (error) {
    console.error('Get current user error:', error);
    return null;
  }
};

export const getCurrentUserSync = (): User | null => {
  // For compatibility with existing code that expects synchronous access
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    getCurrentUser().then(setUser);

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session?.user) {
        const profile = await supabaseAuth.getUserProfile(session.user.id);
        if (profile) {
          setUser({
            id: profile.id,
            email: profile.email,
            firstName: profile.first_name,
            lastName: profile.last_name,
            avatar: profile.avatar_url,
            role: profile.role,
            createdAt: profile.created_at,
          });
        }
      } else {
        setUser(null);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  return user;
};

export const isAuthenticated = async (): Promise<boolean> => {
  const session = await supabaseAuth.getCurrentSession();
  return session !== null;
};

// For immediate sync check (less reliable but faster)
export const isAuthenticatedSync = (): boolean => {
  const user = getCurrentUserSync();
  return user !== null;
};

// Authentication functions using Supabase
export const login = async (credentials: LoginCredentials): Promise<{ success: boolean; user?: User; error?: string }> => {
  try {
    const result = await supabaseAuth.signIn({
      email: credentials.email,
      password: credentials.password,
    });

    if (!result.success) {
      return { success: false, error: result.error };
    }

    if (result.user) {
      const profile = await supabaseAuth.getUserProfile(result.user.id);
      if (profile) {
        const user: User = {
          id: profile.id,
          email: profile.email,
          firstName: profile.first_name,
          lastName: profile.last_name,
          avatar: profile.avatar_url,
          role: profile.role,
          createdAt: profile.created_at,
        };
        return { success: true, user };
      }
    }

    return { success: false, error: 'Failed to load user profile' };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Login failed'
    };
  }
};

export const signup = async (signupData: SignupData): Promise<{ success: boolean; user?: User; error?: string }> => {
  try {
    // Validate signup data
    if (signupData.password !== signupData.confirmPassword) {
      return { success: false, error: 'Passwords do not match' };
    }

    if (!signupData.agreedToTerms) {
      return { success: false, error: 'You must agree to the terms and conditions' };
    }

    const result = await supabaseAuth.signUp({
      email: signupData.email,
      password: signupData.password,
      firstName: signupData.firstName,
      lastName: signupData.lastName,
      role: 'student', // Default role
    });

    if (!result.success) {
      return { success: false, error: result.error };
    }

    if (result.user) {
      // Wait a moment for the trigger to create the user profile
      await new Promise(resolve => setTimeout(resolve, 1000));

      const profile = await supabaseAuth.getUserProfile(result.user.id);
      if (profile) {
        const user: User = {
          id: profile.id,
          email: profile.email,
          firstName: profile.first_name,
          lastName: profile.last_name,
          avatar: profile.avatar_url,
          role: profile.role,
          createdAt: profile.created_at,
          experience: signupData.experience,
          martialArtsInterest: signupData.martialArtsInterest,
          goals: signupData.goals,
          plan: signupData.plan,
        };
        return { success: true, user };
      }
    }

    return { success: false, error: 'Failed to create user profile' };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Signup failed'
    };
  }
};

export const logout = () => {
  clearSession();
  // Redirect to home page
  window.location.href = '/';
};

// Social login (mock implementation)
export const socialLogin = async (provider: 'google' | 'apple'): Promise<{ success: boolean; user?: User; error?: string }> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1200));
  
  // In a real implementation, this would redirect to OAuth provider
  // For demo purposes, we'll create a mock user
  const mockUser: User = {
    id: generateUserId(),
    email: `demo.${provider}@example.com`,
    firstName: 'Demo',
    lastName: 'User',
    createdAt: new Date().toISOString(),
  };
  
  const users = getStoredUsers();
  
  // Check if user already exists
  const existingUser = users.find(u => u.email === mockUser.email);
  if (existingUser) {
    createSession(existingUser, true);
    return { success: true, user: existingUser };
  }
  
  // Create new social user
  users.push(mockUser);
  storeUsers(users);
  
  createSession(mockUser, true);
  return { success: true, user: mockUser };
};

// Password reset (mock)
export const requestPasswordReset = async (email: string): Promise<{ success: boolean; message?: string; error?: string }> => {
  await new Promise(resolve => setTimeout(resolve, 800));
  
  const users = getStoredUsers();
  const user = users.find(u => u.email.toLowerCase() === email.toLowerCase());
  
  if (!user) {
    return { success: false, error: 'No account found with this email address' };
  }
  
  return { 
    success: true, 
    message: 'Password reset instructions have been sent to your email address' 
  };
};

// Profile update
export const updateProfile = async (updates: Partial<User>): Promise<{ success: boolean; user?: User; error?: string }> => {
  await new Promise(resolve => setTimeout(resolve, 600));
  
  const currentUser = getCurrentUser();
  if (!currentUser) {
    return { success: false, error: 'Not authenticated' };
  }
  
  const users = getStoredUsers();
  const userIndex = users.findIndex(u => u.id === currentUser.id);
  
  if (userIndex === -1) {
    return { success: false, error: 'User not found' };
  }
  
  // Update user
  const updatedUser = { ...users[userIndex], ...updates };
  users[userIndex] = updatedUser;
  storeUsers(users);
  
  // Update session
  const session = getSession();
  if (session) {
    createSession(updatedUser, session.rememberMe);
  }
  
  return { success: true, user: updatedUser };
};

// Get user statistics (for dashboard)
export const getUserStats = (userId: string) => {
  // Mock user progress data
  return {
    coursesEnrolled: 3 + Math.floor(Math.random() * 10),
    coursesCompleted: 1 + Math.floor(Math.random() * 5),
    totalWatchTime: Math.floor(Math.random() * 100) + 20,
    currentStreak: Math.floor(Math.random() * 30) + 1,
    achievements: Math.floor(Math.random() * 15) + 3,
    joinDate: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000).toISOString(),
  };
};

// Initialize demo users if none exist
export const initializeDemoUsers = () => {
  const users = getStoredUsers();
  if (users.length === 0) {
    const demoUsers: User[] = [
      {
        id: 'demo_user_1',
        email: 'demo@gojo.com',
        firstName: 'Demo',
        lastName: 'User',
        experience: 'some-experience',
        martialArtsInterest: ['boxing', 'karate'],
        plan: 'monthly',
        createdAt: new Date().toISOString(),
      }
    ];
    storeUsers(demoUsers);
  }
};
