import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { Navigation } from "@/components/Navigation";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  LogIn,
  Shield,
  CheckCircle,
  AlertCircle,
  Users,
  Play,
  Award,
  Target,
  ArrowRight,
} from "lucide-react";
import { useState, useEffect } from "react";
import { login, socialLogin, requestPasswordReset, isAuthenticated, initializeDemoUsers } from "@/lib/auth";

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [socialLoading, setSocialLoading] = useState<string | null>(null);
  const [resetLoading, setResetLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [errors, setErrors] = useState({
    email: "",
    password: "",
    general: "",
  });

  useEffect(() => {
    // Initialize demo users and check if already logged in
    initializeDemoUsers();
    if (isAuthenticated()) {
      window.location.href = '/profile';
    }
  }, []);

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear errors when user starts typing
    if (errors[field as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = { email: "", password: "", general: "" };
    let isValid = true;

    if (!formData.email) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
      isValid = false;
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleLogin = async () => {
    if (!validateForm()) return;

    setIsLoading(true);
    setMessage(null);

    try {
      const result = await login({
        email: formData.email,
        password: formData.password,
        rememberMe: formData.rememberMe,
      });

      if (result.success && result.user) {
        setMessage({ type: 'success', text: `Welcome back, ${result.user.firstName}!` });
        // Redirect after successful login
        setTimeout(() => {
          window.location.href = '/profile';
        }, 1000);
      } else {
        setMessage({ type: 'error', text: result.error || 'Login failed' });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'An unexpected error occurred. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialLogin = async (provider: 'google' | 'apple') => {
    setSocialLoading(provider);
    setMessage(null);

    try {
      const result = await socialLogin(provider);

      if (result.success && result.user) {
        setMessage({ type: 'success', text: `Welcome, ${result.user.firstName}!` });
        setTimeout(() => {
          window.location.href = '/profile';
        }, 1000);
      } else {
        setMessage({ type: 'error', text: result.error || 'Social login failed' });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Social login failed. Please try again.' });
    } finally {
      setSocialLoading(null);
    }
  };

  const handleForgotPassword = async () => {
    if (!formData.email) {
      setMessage({ type: 'error', text: 'Please enter your email address first' });
      return;
    }

    setResetLoading(true);
    setMessage(null);

    try {
      const result = await requestPasswordReset(formData.email);

      if (result.success) {
        setMessage({ type: 'success', text: result.message || 'Password reset email sent!' });
      } else {
        setMessage({ type: 'error', text: result.error || 'Failed to send reset email' });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'An error occurred. Please try again.' });
    } finally {
      setResetLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Welcome Back */}
          <div className="space-y-8 order-2 lg:order-1">
            <div className="space-y-4">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground">
                Welcome Back, Warrior
              </h1>
              <p className="text-base sm:text-lg lg:text-xl text-muted-foreground">
                Continue your martial arts journey. Sign in to access your
                courses, track progress, and connect with the community.
              </p>
            </div>

            {/* Benefits */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-foreground">
                When you sign in, you get:
              </h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-primary" />
                  <span className="text-sm lg:text-base">
                    Access to your enrolled courses
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-primary" />
                  <span className="text-sm lg:text-base">
                    Progress tracking and achievements
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-primary" />
                  <span className="text-sm lg:text-base">
                    Community discussions and support
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-primary" />
                  <span className="text-sm lg:text-base">
                    Personalized recommendations
                  </span>
                </div>
              </div>
            </div>

            {/* Social Proof */}
            <div className="grid grid-cols-3 gap-6 pt-8">
              <div className="text-center">
                <div className="text-2xl lg:text-3xl font-bold text-primary">
                  10K+
                </div>
                <div className="text-xs lg:text-sm text-muted-foreground">
                  Active Students
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl lg:text-3xl font-bold text-accent">
                  500+
                </div>
                <div className="text-xs lg:text-sm text-muted-foreground">
                  Video Lessons
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl lg:text-3xl font-bold text-secondary">
                  4.9★
                </div>
                <div className="text-xs lg:text-sm text-muted-foreground">
                  Average Rating
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Login Form */}
          <div className="order-1 lg:order-2">
            <Card className="w-full max-w-md mx-auto">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">Sign In</CardTitle>
                <CardDescription>
                  Enter your credentials to access your account
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-6">
                {/* Social Login Options */}
                <div className="space-y-3">
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => handleSocialLogin("google")}
                    disabled={socialLoading !== null}
                  >
                    {socialLoading === 'google' ? (
                      <div className="w-4 h-4 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin mr-2" />
                    ) : (
                      <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24">
                        <path
                          fill="currentColor"
                          d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                        />
                        <path
                          fill="currentColor"
                          d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                        />
                        <path
                          fill="currentColor"
                          d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                        />
                        <path
                          fill="currentColor"
                          d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                        />
                      </svg>
                    )}
                    Continue with Google
                  </Button>

                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => handleSocialLogin("apple")}
                  >
                    <svg
                      className="w-4 h-4 mr-2"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                    </svg>
                    Continue with Apple
                  </Button>
                </div>

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <Separator />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-2 text-muted-foreground">
                      Or continue with email
                    </span>
                  </div>
                </div>

                {/* General Error */}
                {errors.general && (
                  <div className="p-3 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-red-500" />
                    <span className="text-sm text-red-600">
                      {errors.general}
                    </span>
                  </div>
                )}

                {/* Email Field */}
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <div className="relative">
                    <Mail className="w-4 h-4 absolute left-3 top-3 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="john@example.com"
                      className={`pl-10 ${errors.email ? "border-red-500" : ""}`}
                      value={formData.email}
                      onChange={(e) =>
                        handleInputChange("email", e.target.value)
                      }
                    />
                  </div>
                  {errors.email && (
                    <p className="text-xs text-red-500">{errors.email}</p>
                  )}
                </div>

                {/* Password Field */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password">Password</Label>
                    <Link
                      to="/forgot-password"
                      className="text-xs text-primary hover:underline"
                    >
                      Forgot password?
                    </Link>
                  </div>
                  <div className="relative">
                    <Lock className="w-4 h-4 absolute left-3 top-3 text-muted-foreground" />
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      className={`pl-10 pr-10 ${errors.password ? "border-red-500" : ""}`}
                      value={formData.password}
                      onChange={(e) =>
                        handleInputChange("password", e.target.value)
                      }
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-3 text-muted-foreground hover:text-foreground"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="text-xs text-red-500">{errors.password}</p>
                  )}
                </div>

                {/* Remember Me */}
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="remember"
                    checked={formData.rememberMe}
                    onCheckedChange={(checked) =>
                      handleInputChange("rememberMe", checked)
                    }
                  />
                  <Label htmlFor="remember" className="text-sm cursor-pointer">
                    Remember me for 30 days
                  </Label>
                </div>

                {/* Login Button */}
                <Button
                  className="w-full"
                  size="lg"
                  onClick={handleLogin}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Signing in...
                    </div>
                  ) : (
                    <>
                      <LogIn className="w-4 h-4 mr-2" />
                      Sign In
                    </>
                  )}
                </Button>

                {/* Sign Up Link */}
                <div className="text-center text-sm">
                  <span className="text-muted-foreground">
                    Don't have an account?{" "}
                  </span>
                  <Link
                    to="/signup"
                    className="text-primary hover:underline font-medium"
                  >
                    Sign up for free
                  </Link>
                </div>

                {/* Security Notice */}
                <div className="text-center pt-4 border-t">
                  <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
                    <Shield className="w-3 h-3" />
                    <span>
                      Your data is protected with 256-bit SSL encryption
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Help Section */}
            <div className="text-center mt-6 space-y-3">
              <p className="text-sm text-muted-foreground">
                Need help signing in?
              </p>
              <div className="flex flex-col sm:flex-row gap-2 justify-center">
                <Button variant="outline" size="sm" asChild>
                  <Link to="/help">Contact Support</Link>
                </Button>
                <Button variant="outline" size="sm" asChild>
                  <Link to="/forgot-password">Reset Password</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="mt-20 lg:mt-32">
          <h2 className="text-2xl lg:text-3xl font-bold text-foreground text-center mb-12">
            What's Waiting for You
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-6 space-y-4">
                <Play className="w-12 h-12 text-primary mx-auto" />
                <h3 className="font-semibold text-lg">Premium Courses</h3>
                <p className="text-sm text-muted-foreground">
                  Access hundreds of expert-led martial arts courses from
                  beginner to advanced levels.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-6 space-y-4">
                <Target className="w-12 h-12 text-accent mx-auto" />
                <h3 className="font-semibold text-lg">Track Progress</h3>
                <p className="text-sm text-muted-foreground">
                  Monitor your training journey with detailed analytics and
                  achievement badges.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-6 space-y-4">
                <Users className="w-12 h-12 text-secondary mx-auto" />
                <h3 className="font-semibold text-lg">Join Community</h3>
                <p className="text-sm text-muted-foreground">
                  Connect with fellow martial artists and share your training
                  experiences.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16 lg:mt-20 bg-gradient-to-r from-primary/10 to-accent/10 rounded-3xl p-8 lg:p-12">
          <h2 className="text-2xl lg:text-3xl font-bold text-foreground mb-4">
            New to Gojo?
          </h2>
          <p className="text-base lg:text-xl text-muted-foreground mb-6 max-w-2xl mx-auto">
            Join thousands of students learning martial arts from world-class
            instructors. Start your free trial today.
          </p>
          <Button
            size="lg"
            className="text-base lg:text-lg px-6 lg:px-8"
            asChild
          >
            <Link to="/signup">
              <Award className="w-4 h-4 lg:w-5 lg:h-5 mr-2" />
              Start Free Trial
              <ArrowRight className="w-4 h-4 lg:w-5 lg:h-5 ml-2" />
            </Link>
          </Button>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-secondary text-secondary-foreground py-12 lg:py-16 mt-16 lg:mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <img
                src="https://cdn.builder.io/api/v1/image/assets%2F063165da271649ceb7c8b43e87a943e7%2F24ea7adf3b8a40f39841dcd598dfcd35?format=webp&width=800"
                alt="Gojo Martial Arts Logo"
                className="w-8 h-8 lg:w-10 lg:h-10 object-contain"
                style={{
                  mixBlendMode: "screen",
                  filter: "contrast(1.2) brightness(1.1)",
                }}
              />
              <span className="font-bold text-lg lg:text-xl">Gojo</span>
            </div>
            <p className="text-sm lg:text-base text-secondary-foreground/80">
              Master martial arts with the world's leading online training
              platform.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
