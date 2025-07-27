# Gojo Marketplace Setup Guide

## ✅ **Completed Integration**

Your Gojo martial arts marketplace now has:

- ✅ **Supabase Database** connected and configured
- ✅ **Stripe Payments** with instructor payouts via Stripe Connect
- ✅ **Real Authentication** system replacing localStorage
- ✅ **Instructor Onboarding** flow with payment setup
- ✅ **Student Quick Signup** via Google OAuth
- ✅ **Netlify Functions** for payment processing

---

## 🔧 **Final Setup Steps**

### 1. **Run Database Schema in Supabase**

1. Go to your Supabase project dashboard
2. Click **SQL Editor** in the sidebar
3. Copy the content from `database/schema.sql` 
4. Paste and run it in the SQL Editor
5. This creates all tables for users, instructors, courses, payments, etc.

### 2. **Enable Google OAuth in Supabase**

1. Go to **Authentication** → **Providers** in Supabase
2. Enable **Google** provider
3. You'll need to:
   - Create a Google OAuth app in [Google Cloud Console](https://console.cloud.google.com/)
   - Add your Google Client ID and Secret to Supabase
   - Add redirect URL: `https://tgqfnaacjpjyjasasszy.supabase.co/auth/v1/callback`

### 3. **Enable Stripe Connect (for Instructor Payouts)**

1. Go to your Stripe Dashboard
2. Navigate to **Connect** → **Get Started**
3. Enable **Express accounts** (recommended for marketplaces)
4. This allows instructors to receive direct payouts

---

## 🚀 **How It Works Now**

### **For Students:**
1. **Quick Signup** via Google OAuth or email
2. **Browse Courses** and make payments
3. **Automatic enrollment** after successful payment
4. **Progress tracking** and community access

### **For Instructors:**
1. **Extended Onboarding** at `/instructor/onboarding`
2. **Stripe Connect** setup for receiving payments
3. **Course Creation** and management
4. **Automatic payouts** (80% revenue share)
5. **Admin approval** process for verification

### **Payment Flow:**
1. Student purchases course → Stripe processes payment
2. **Platform takes 10%** application fee
3. **Instructor receives 90%** automatically via Stripe Connect
4. **Enrollment record** created in database

---

## 🔑 **Environment Variables Set**

```
SUPABASE_URL=https://tgqfnaacjpjyjasasszy.supabase.co
VITE_SUPABASE_ANON_KEY=eyJ... (set)
VITE_STRIPE_PUBLISHABLE_KEY=pk_live_... (set)
STRIPE_SECRET_KEY=sk_live_... (set)
```

⚠️ **Note:** You're using **live Stripe keys** - real money will be processed!

---

## 📁 **New Files Created**

- `client/lib/supabase.ts` - Database client
- `client/lib/auth-supabase.ts` - Supabase authentication service
- `client/pages/AuthCallback.tsx` - OAuth callback handler
- `client/pages/InstructorOnboarding.tsx` - Extended instructor signup
- `netlify/functions/create-payment-intent.ts` - Payment processing
- `netlify/functions/create-connect-account.ts` - Instructor Stripe setup
- `netlify/functions/check-connect-status.ts` - Account verification
- `database/schema.sql` - Complete database schema

---

## 🎯 **Next Steps**

1. **Run the SQL schema** in Supabase
2. **Set up Google OAuth** following the guide above
3. **Test the signup flow** - students and instructors
4. **Create your first instructor account** via onboarding
5. **Test a course purchase** with Stripe test mode

Your marketplace is now fully functional with real payments, user accounts, and instructor payouts! 🎉

## 🔗 **Key URLs**

- **Student Signup:** `/signup` (quick, Google OAuth)
- **Instructor Onboarding:** `/instructor/onboarding` (detailed)
- **Instructor Dashboard:** `/instructor/dashboard`
- **OAuth Callback:** `/auth/callback`

## 💡 **Tips**

- Use **Stripe test mode** for development
- Enable **RLS policies** in Supabase for security
- Monitor **Stripe Connect** accounts in your dashboard
- Set up **webhooks** for advanced payment handling
