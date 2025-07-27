// Authentication service using Supabase
import { useState, useEffect } from "react";
import * as supabaseAuth from "./auth-supabase";
import { supabase } from "./supabase";

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
  role?: "student" | "instructor" | "admin";
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
    const {
      data: { user },
    } = await supabase.auth.getUser();
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
    console.error("Get current user error:", error);
    return null;
  }
};

export const getCurrentUserSync = (): User | null => {
  // For compatibility with existing code that expects synchronous access
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    getCurrentUser().then(setUser);

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
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
export const login = async (
  credentials: LoginCredentials,
): Promise<{ success: boolean; user?: User; error?: string }> => {
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

    return { success: false, error: "Failed to load user profile" };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Login failed",
    };
  }
};

export const signup = async (
  signupData: SignupData,
): Promise<{ success: boolean; user?: User; error?: string }> => {
  try {
    // Validate signup data
    if (signupData.password !== signupData.confirmPassword) {
      return { success: false, error: "Passwords do not match" };
    }

    if (!signupData.agreedToTerms) {
      return {
        success: false,
        error: "You must agree to the terms and conditions",
      };
    }

    const result = await supabaseAuth.signUp({
      email: signupData.email,
      password: signupData.password,
      firstName: signupData.firstName,
      lastName: signupData.lastName,
      role: "student", // Default role
    });

    if (!result.success) {
      return { success: false, error: result.error };
    }

    if (result.user) {
      // Wait a moment for the trigger to create the user profile
      await new Promise((resolve) => setTimeout(resolve, 1000));

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

    return { success: false, error: "Failed to create user profile" };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Signup failed",
    };
  }
};

export const logout = async () => {
  try {
    await supabaseAuth.signOut();
    return { success: true };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Logout failed",
    };
  }
};

// Social login with Google
export const socialLogin = async (
  provider: "google" | "apple",
): Promise<{ success: boolean; user?: User; error?: string }> => {
  try {
    if (provider === "google") {
      const result = await supabaseAuth.signInWithGoogle();
      if (!result.success) {
        return { success: false, error: result.error };
      }

      // Google OAuth will handle the redirect, so we return success
      return { success: true };
    }

    // Apple login not implemented yet
    return { success: false, error: "Apple login not yet implemented" };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Social login failed",
    };
  }
};

// Password reset using Supabase
export const requestPasswordReset = async (
  email: string,
): Promise<{ success: boolean; message?: string; error?: string }> => {
  try {
    const result = await supabaseAuth.resetPassword(email);
    return result;
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Password reset failed",
    };
  }
};

// Profile update using Supabase
export const updateProfile = async (
  updates: Partial<User>,
): Promise<{ success: boolean; user?: User; error?: string }> => {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      return { success: false, error: "Not authenticated" };
    }

    const result = await supabaseAuth.updateUserProfile(currentUser.id, {
      first_name: updates.firstName,
      last_name: updates.lastName,
      avatar_url: updates.avatar,
    });

    if (!result.success) {
      return { success: false, error: result.error };
    }

    // Return updated user
    const updatedUser = await getCurrentUser();
    return { success: true, user: updatedUser || undefined };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Update failed",
    };
  }
};

// Get user statistics (for dashboard)
export const getUserStats = (userId: string) => {
  // Mock user progress data - in real app, this would query the database
  return {
    coursesEnrolled: 3 + Math.floor(Math.random() * 10),
    coursesCompleted: 1 + Math.floor(Math.random() * 5),
    totalWatchTime: Math.floor(Math.random() * 100) + 20,
    currentStreak: Math.floor(Math.random() * 30) + 1,
    achievements: Math.floor(Math.random() * 15) + 3,
    joinDate: new Date(
      Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000,
    ).toISOString(),
  };
};

// Initialize - no longer needed with Supabase
export const initializeDemoUsers = () => {
  // No longer needed - users are stored in Supabase
  console.log("Demo users initialization not needed with Supabase");
};
