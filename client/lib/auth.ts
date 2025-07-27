// Authentication service using Supabase
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

// Mock user database (in real app, this would be in a database)
const USERS_KEY = 'gojo_users';
const CURRENT_USER_KEY = 'gojo_current_user';
const SESSION_KEY = 'gojo_session';

// Utility functions for local storage
const getStoredUsers = (): User[] => {
  try {
    const users = localStorage.getItem(USERS_KEY);
    return users ? JSON.parse(users) : [];
  } catch {
    return [];
  }
};

const storeUsers = (users: User[]) => {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
};

const generateUserId = () => {
  return 'user_' + Math.random().toString(36).substr(2, 9);
};

// Session management
export const createSession = (user: User, rememberMe = false) => {
  const sessionData = {
    user,
    expiresAt: rememberMe 
      ? Date.now() + (30 * 24 * 60 * 60 * 1000) // 30 days
      : Date.now() + (24 * 60 * 60 * 1000), // 1 day
    rememberMe
  };
  
  localStorage.setItem(SESSION_KEY, JSON.stringify(sessionData));
  localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
};

export const getSession = () => {
  try {
    const session = localStorage.getItem(SESSION_KEY);
    if (!session) return null;
    
    const sessionData = JSON.parse(session);
    if (Date.now() > sessionData.expiresAt) {
      clearSession();
      return null;
    }
    
    return sessionData;
  } catch {
    return null;
  }
};

export const getCurrentUser = (): User | null => {
  const session = getSession();
  if (!session) return null;
  
  try {
    const user = localStorage.getItem(CURRENT_USER_KEY);
    return user ? JSON.parse(user) : null;
  } catch {
    return null;
  }
};

export const clearSession = () => {
  localStorage.removeItem(SESSION_KEY);
  localStorage.removeItem(CURRENT_USER_KEY);
};

export const isAuthenticated = (): boolean => {
  return getSession() !== null;
};

// Mock API functions
export const login = async (credentials: LoginCredentials): Promise<{ success: boolean; user?: User; error?: string }> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  const users = getStoredUsers();
  const user = users.find(u => u.email.toLowerCase() === credentials.email.toLowerCase());
  
  if (!user) {
    return { success: false, error: 'No account found with this email address' };
  }
  
  // In real app, password would be hashed and compared
  // For demo, we'll just check if password is not empty
  if (!credentials.password) {
    return { success: false, error: 'Password is required' };
  }
  
  // Create session
  createSession(user, credentials.rememberMe);
  
  return { success: true, user };
};

export const signup = async (signupData: SignupData): Promise<{ success: boolean; user?: User; error?: string }> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  const users = getStoredUsers();
  
  // Check if user already exists
  const existingUser = users.find(u => u.email.toLowerCase() === signupData.email.toLowerCase());
  if (existingUser) {
    return { success: false, error: 'An account with this email already exists' };
  }
  
  // Validate signup data
  if (signupData.password !== signupData.confirmPassword) {
    return { success: false, error: 'Passwords do not match' };
  }
  
  if (!signupData.agreedToTerms) {
    return { success: false, error: 'You must agree to the terms and conditions' };
  }
  
  // Create new user
  const newUser: User = {
    id: generateUserId(),
    email: signupData.email,
    firstName: signupData.firstName,
    lastName: signupData.lastName,
    dateOfBirth: signupData.dateOfBirth,
    experience: signupData.experience,
    martialArtsInterest: signupData.martialArtsInterest,
    goals: signupData.goals,
    plan: signupData.plan,
    createdAt: new Date().toISOString(),
  };
  
  // Store user
  users.push(newUser);
  storeUsers(users);
  
  // Create session
  createSession(newUser, true); // Remember user after signup
  
  return { success: true, user: newUser };
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
