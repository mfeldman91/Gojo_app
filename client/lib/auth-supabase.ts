import { supabase } from "./supabase";
import { User } from "@supabase/supabase-js";

export interface UserProfile {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  avatar_url?: string;
  role: "student" | "instructor" | "admin";
  created_at: string;
  updated_at: string;
}

export interface InstructorProfile {
  id: string;
  user_id: string;
  bio?: string;
  experience?: string;
  martial_arts_specialties: string[];
  qualifications: string[];
  verification_status: "pending" | "approved" | "rejected";
  stripe_account_id?: string;
  stripe_onboarding_complete: boolean;
  hourly_rate?: number;
}

export interface SignupData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role?: "student" | "instructor";
}

export interface LoginCredentials {
  email: string;
  password: string;
}

// Authentication functions
export const signUp = async (data: SignupData) => {
  try {
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
      options: {
        data: {
          first_name: data.firstName,
          last_name: data.lastName,
          role: data.role || "student",
        },
      },
    });

    if (authError) throw authError;

    return { success: true, user: authData.user, session: authData.session };
  } catch (error) {
    console.error("Signup error:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Signup failed",
    };
  }
};

export const signIn = async (credentials: LoginCredentials) => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: credentials.email,
      password: credentials.password,
    });

    if (error) throw error;

    return { success: true, user: data.user, session: data.session };
  } catch (error) {
    console.error("Sign in error:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Sign in failed",
    };
  }
};

export const signInWithGoogle = async () => {
  try {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    if (error) throw error;

    return { success: true, data };
  } catch (error) {
    console.error("Google sign in error:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Google sign in failed",
    };
  }
};

export const signOut = async () => {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;

    // Redirect to home page
    window.location.href = "/";
    return { success: true };
  } catch (error) {
    console.error("Sign out error:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Sign out failed",
    };
  }
};

export const getCurrentUser = async (): Promise<User | null> => {
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    return user;
  } catch (error) {
    console.error("Get user error:", error);
    return null;
  }
};

export const getCurrentSession = async () => {
  try {
    const {
      data: { session },
    } = await supabase.auth.getSession();
    return session;
  } catch (error) {
    console.error("Get session error:", error);
    return null;
  }
};

// User profile functions
export const getUserProfile = async (
  userId: string,
): Promise<UserProfile | null> => {
  try {
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("id", userId)
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Get user profile error:", error);
    return null;
  }
};

export const updateUserProfile = async (
  userId: string,
  updates: Partial<UserProfile>,
) => {
  try {
    const { data, error } = await supabase
      .from("users")
      .update({
        ...updates,
        updated_at: new Date().toISOString(),
      })
      .eq("id", userId)
      .select()
      .single();

    if (error) throw error;
    return { success: true, data };
  } catch (error) {
    console.error("Update user profile error:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Update failed",
    };
  }
};

// Instructor profile functions
export const createInstructorProfile = async (
  userId: string,
  profileData: Partial<InstructorProfile>,
) => {
  try {
    // First, update user role to instructor
    await supabase
      .from("users")
      .update({ role: "instructor" })
      .eq("id", userId);

    // Then create instructor profile
    const { data, error } = await supabase
      .from("instructor_profiles")
      .insert({
        user_id: userId,
        ...profileData,
      })
      .select()
      .single();

    if (error) throw error;
    return { success: true, data };
  } catch (error) {
    console.error("Create instructor profile error:", error);
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "Failed to create instructor profile",
    };
  }
};

export const getInstructorProfile = async (
  userId: string,
): Promise<InstructorProfile | null> => {
  try {
    const { data, error } = await supabase
      .from("instructor_profiles")
      .select("*")
      .eq("user_id", userId)
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Get instructor profile error:", error);
    return null;
  }
};

export const updateInstructorProfile = async (
  userId: string,
  updates: Partial<InstructorProfile>,
) => {
  try {
    const { data, error } = await supabase
      .from("instructor_profiles")
      .update({
        ...updates,
        updated_at: new Date().toISOString(),
      })
      .eq("user_id", userId)
      .select()
      .single();

    if (error) throw error;
    return { success: true, data };
  } catch (error) {
    console.error("Update instructor profile error:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Update failed",
    };
  }
};

// Stripe Connect functions
export const createStripeConnectAccount = async (
  email: string,
  firstName: string,
  lastName: string,
) => {
  try {
    const response = await fetch("/.netlify/functions/create-connect-account", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        firstName,
        lastName,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Failed to create Stripe account");
    }

    return { success: true, ...data };
  } catch (error) {
    console.error("Create Stripe Connect account error:", error);
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "Failed to create Stripe account",
    };
  }
};

export const checkStripeConnectStatus = async (accountId: string) => {
  try {
    const response = await fetch(
      `/.netlify/functions/check-connect-status?accountId=${accountId}`,
    );
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Failed to check account status");
    }

    return { success: true, ...data };
  } catch (error) {
    console.error("Check Stripe Connect status error:", error);
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "Failed to check account status",
    };
  }
};

// Payment functions
export const createPaymentIntent = async (
  courseId: string,
  amount: number,
  instructorStripeId: string,
) => {
  try {
    const response = await fetch("/.netlify/functions/create-payment-intent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        courseId,
        amount,
        instructorId: instructorStripeId,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Failed to create payment intent");
    }

    return { success: true, ...data };
  } catch (error) {
    console.error("Create payment intent error:", error);
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "Failed to create payment intent",
    };
  }
};

// Reset password
export const resetPassword = async (email: string) => {
  try {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });

    if (error) throw error;

    return {
      success: true,
      message: "Password reset email sent! Check your inbox.",
    };
  } catch (error) {
    console.error("Reset password error:", error);
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "Failed to send reset email",
    };
  }
};

// Auth state listener
export const onAuthStateChange = (callback: (user: User | null) => void) => {
  return supabase.auth.onAuthStateChange((event, session) => {
    callback(session?.user || null);
  });
};
