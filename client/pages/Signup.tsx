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
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Navigation } from "@/components/Navigation";
import {
  User,
  Mail,
  Lock,
  Calendar,
  Target,
  MapPin,
  Camera,
  CheckCircle,
  Star,
  Shield,
  Award,
  Play,
  Users,
  ArrowRight,
  Eye,
  EyeOff,
} from "lucide-react";
import { useState, useEffect } from "react";
import { signup, socialLogin, isAuthenticated, initializeDemoUsers } from "@/lib/auth";

export default function Signup() {
  const [step, setStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [socialLoading, setSocialLoading] = useState<string | null>(null);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  useEffect(() => {
    // Initialize demo users and check if already logged in
    initializeDemoUsers();
    if (isAuthenticated()) {
      window.location.href = '/profile';
    }
  }, []);
  const [formData, setFormData] = useState({
    // Step 1: Basic Info
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",

    // Step 2: Profile Details
    dateOfBirth: "",
    location: "",
    experience: "",
    martialArtsInterest: [],
    goals: "",

    // Step 3: Plan Selection
    selectedPlan: "trial",
    agreedToTerms: false,
    emailUpdates: true,
  });

  const martialArtsOptions = [
    "Boxing",
    "Muay Thai",
    "Wing Chun",
    "Karate",
    "Brazilian Jiu-Jitsu",
    "Mixed Martial Arts",
    "Self-Defense",
    "Tai Chi",
  ];

  const experienceLevels = [
    { value: "complete-beginner", label: "Complete Beginner" },
    { value: "some-experience", label: "Some Experience" },
    { value: "intermediate", label: "Intermediate" },
    { value: "advanced", label: "Advanced" },
    { value: "instructor", label: "Instructor/Coach" },
  ];

  const plans = [
    {
      id: "trial",
      name: "Free Trial",
      price: "Free for 7 days",
      description: "Try 3 courses and explore the platform",
      features: ["3 course previews", "Basic community access", "Mobile app"],
      popular: false,
    },
    {
      id: "monthly",
      name: "All-Access Pass",
      price: "$39/month",
      description: "Unlimited access to all courses",
      features: [
        "Unlimited courses",
        "Download videos",
        "Live Q&A",
        "Certificates",
      ],
      popular: true,
    },
    {
      id: "annual",
      name: "Annual Pass",
      price: "$29/month",
      description: "Save 25% with annual billing",
      features: ["Everything in monthly", "25% savings", "Priority support"],
      popular: false,
      savings: "Save $120/year",
    },
  ];

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleMartialArtsToggle = (art: string) => {
    setFormData((prev) => ({
      ...prev,
      martialArtsInterest: prev.martialArtsInterest.includes(art)
        ? prev.martialArtsInterest.filter((item) => item !== art)
        : [...prev.martialArtsInterest, art],
    }));
  };

  const nextStep = () => {
    if (step < 3) setStep(step + 1);
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  const canProceedStep1 =
    formData.firstName &&
    formData.lastName &&
    formData.email &&
    formData.password &&
    formData.confirmPassword &&
    formData.password === formData.confirmPassword;

  const canProceedStep2 =
    formData.experience && formData.martialArtsInterest.length > 0;

  const canCompleteSignup =
    canProceedStep1 && canProceedStep2 && formData.agreedToTerms;

  const handleSignup = async () => {
    if (!canCompleteSignup) return;

    setIsSubmitting(true);
    setMessage(null);

    try {
      const result = await signup({
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password,
        confirmPassword: formData.confirmPassword,
        dateOfBirth: formData.dateOfBirth,
        experience: formData.experience,
        martialArtsInterest: formData.martialArtsInterest,
        goals: formData.goals ? [formData.goals] : [],
        plan: formData.selectedPlan,
        agreedToTerms: formData.agreedToTerms,
      });

      if (result.success && result.user) {
        setMessage({ type: 'success', text: `Welcome to Gojo, ${result.user.firstName}! Your account has been created.` });
        // Redirect after successful signup
        setTimeout(() => {
          window.location.href = '/profile';
        }, 2000);
      } else {
        setMessage({ type: 'error', text: result.error || 'Signup failed. Please try again.' });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'An unexpected error occurred. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSocialSignup = async (provider: 'google' | 'apple') => {
    setSocialLoading(provider);
    setMessage(null);

    try {
      const result = await socialLogin(provider);

      if (result.success && result.user) {
        setMessage({ type: 'success', text: `Welcome to Gojo, ${result.user.firstName}!` });
        setTimeout(() => {
          window.location.href = '/profile';
        }, 1000);
      } else {
        setMessage({ type: 'error', text: result.error || 'Social signup failed' });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Social signup failed. Please try again.' });
    } finally {
      setSocialLoading(null);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        {/* Header */}
        <div className="text-center space-y-4 mb-8 lg:mb-12">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground">
            Start Your Martial Arts Journey
          </h1>
          <p className="text-base sm:text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto">
            Join thousands of students learning from world-class instructors.
            Create your profile and begin training today.
          </p>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center justify-center mb-8 lg:mb-12">
          <div className="flex items-center space-x-4">
            {[1, 2, 3].map((stepNumber) => (
              <div key={stepNumber} className="flex items-center">
                <div
                  className={`w-8 h-8 lg:w-10 lg:h-10 rounded-full flex items-center justify-center text-sm font-semibold ${
                    step >= stepNumber
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {step > stepNumber ? (
                    <CheckCircle className="w-4 h-4 lg:w-5 lg:h-5" />
                  ) : (
                    stepNumber
                  )}
                </div>
                {stepNumber < 3 && (
                  <div
                    className={`w-12 lg:w-16 h-1 mx-2 ${
                      step > stepNumber ? "bg-primary" : "bg-muted"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl lg:text-2xl">
                  {step === 1 && "Create Your Account"}
                  {step === 2 && "Tell Us About Yourself"}
                  {step === 3 && "Choose Your Plan"}
                </CardTitle>
                <CardDescription>
                  {step === 1 && "Basic information to get started"}
                  {step === 2 && "Help us personalize your experience"}
                  {step === 3 && "Select the perfect plan for your goals"}
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-6">
                {/* Step 1: Basic Information */}
                {step === 1 && (
                  <div className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">First Name *</Label>
                        <div className="relative">
                          <User className="w-4 h-4 absolute left-3 top-3 text-muted-foreground" />
                          <Input
                            id="firstName"
                            placeholder="John"
                            className="pl-10"
                            value={formData.firstName}
                            onChange={(e) =>
                              handleInputChange("firstName", e.target.value)
                            }
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="lastName">Last Name *</Label>
                        <div className="relative">
                          <User className="w-4 h-4 absolute left-3 top-3 text-muted-foreground" />
                          <Input
                            id="lastName"
                            placeholder="Smith"
                            className="pl-10"
                            value={formData.lastName}
                            onChange={(e) =>
                              handleInputChange("lastName", e.target.value)
                            }
                          />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address *</Label>
                      <div className="relative">
                        <Mail className="w-4 h-4 absolute left-3 top-3 text-muted-foreground" />
                        <Input
                          id="email"
                          type="email"
                          placeholder="john@example.com"
                          className="pl-10"
                          value={formData.email}
                          onChange={(e) =>
                            handleInputChange("email", e.target.value)
                          }
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="password">Password *</Label>
                      <div className="relative">
                        <Lock className="w-4 h-4 absolute left-3 top-3 text-muted-foreground" />
                        <Input
                          id="password"
                          type={showPassword ? "text" : "password"}
                          placeholder="••••••••"
                          className="pl-10 pr-10"
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
                      <p className="text-xs text-muted-foreground">
                        Must be at least 8 characters with letters and numbers
                      </p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword">
                        Confirm Password *
                      </Label>
                      <div className="relative">
                        <Lock className="w-4 h-4 absolute left-3 top-3 text-muted-foreground" />
                        <Input
                          id="confirmPassword"
                          type="password"
                          placeholder="••••••••"
                          className="pl-10"
                          value={formData.confirmPassword}
                          onChange={(e) =>
                            handleInputChange("confirmPassword", e.target.value)
                          }
                        />
                      </div>
                      {formData.confirmPassword &&
                        formData.password !== formData.confirmPassword && (
                          <p className="text-xs text-red-500">
                            Passwords do not match
                          </p>
                        )}
                    </div>
                  </div>
                )}

                {/* Step 2: Profile Details */}
                {step === 2 && (
                  <div className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="dateOfBirth">Date of Birth</Label>
                        <div className="relative">
                          <Calendar className="w-4 h-4 absolute left-3 top-3 text-muted-foreground" />
                          <Input
                            id="dateOfBirth"
                            type="date"
                            className="pl-10"
                            value={formData.dateOfBirth}
                            onChange={(e) =>
                              handleInputChange("dateOfBirth", e.target.value)
                            }
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="location">Location</Label>
                        <div className="relative">
                          <MapPin className="w-4 h-4 absolute left-3 top-3 text-muted-foreground" />
                          <Input
                            id="location"
                            placeholder="City, Country"
                            className="pl-10"
                            value={formData.location}
                            onChange={(e) =>
                              handleInputChange("location", e.target.value)
                            }
                          />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Experience Level *</Label>
                      <Select
                        value={formData.experience}
                        onValueChange={(value) =>
                          handleInputChange("experience", value)
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select your experience level" />
                        </SelectTrigger>
                        <SelectContent>
                          {experienceLevels.map((level) => (
                            <SelectItem key={level.value} value={level.value}>
                              {level.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-3">
                      <Label>
                        Martial Arts Interests * (Select all that apply)
                      </Label>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                        {martialArtsOptions.map((art) => (
                          <div
                            key={art}
                            className={`p-3 border rounded-lg cursor-pointer transition-all hover:border-primary ${
                              formData.martialArtsInterest.includes(art)
                                ? "border-primary bg-primary/10"
                                : "border-muted"
                            }`}
                            onClick={() => handleMartialArtsToggle(art)}
                          >
                            <div className="text-sm font-medium text-center">
                              {art}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="goals">Your Goals (Optional)</Label>
                      <Textarea
                        id="goals"
                        placeholder="What do you hope to achieve with martial arts? (e.g., fitness, self-defense, competition, personal growth)"
                        className="min-h-[100px]"
                        value={formData.goals}
                        onChange={(e) =>
                          handleInputChange("goals", e.target.value)
                        }
                      />
                    </div>
                  </div>
                )}

                {/* Step 3: Plan Selection */}
                {step === 3 && (
                  <div className="space-y-6">
                    <div className="grid md:grid-cols-3 gap-4">
                      {plans.map((plan) => (
                        <Card
                          key={plan.id}
                          className={`cursor-pointer transition-all hover:shadow-lg ${
                            formData.selectedPlan === plan.id
                              ? "border-primary shadow-lg"
                              : "border-muted"
                          } ${plan.popular ? "relative" : ""}`}
                          onClick={() =>
                            handleInputChange("selectedPlan", plan.id)
                          }
                        >
                          {plan.popular && (
                            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                              <Badge className="bg-primary text-primary-foreground">
                                <Star className="w-3 h-3 mr-1" />
                                Popular
                              </Badge>
                            </div>
                          )}

                          <CardHeader className="text-center pb-2">
                            <CardTitle className="text-lg">
                              {plan.name}
                            </CardTitle>
                            <div className="text-2xl font-bold text-primary">
                              {plan.price}
                            </div>
                            {plan.savings && (
                              <div className="text-sm text-green-600 font-medium">
                                {plan.savings}
                              </div>
                            )}
                            <CardDescription className="text-sm">
                              {plan.description}
                            </CardDescription>
                          </CardHeader>

                          <CardContent className="pt-0">
                            <div className="space-y-2">
                              {plan.features.map((feature, index) => (
                                <div
                                  key={index}
                                  className="flex items-center gap-2 text-sm"
                                >
                                  <CheckCircle className="w-4 h-4 text-primary" />
                                  <span>{feature}</span>
                                </div>
                              ))}
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>

                    <div className="space-y-4 pt-4 border-t">
                      <div className="flex items-start gap-3">
                        <Checkbox
                          id="terms"
                          checked={formData.agreedToTerms}
                          onCheckedChange={(checked) =>
                            handleInputChange("agreedToTerms", checked)
                          }
                        />
                        <div className="text-sm">
                          <Label htmlFor="terms" className="cursor-pointer">
                            I agree to the{" "}
                            <Link
                              to="/terms"
                              className="text-primary hover:underline"
                            >
                              Terms of Service
                            </Link>{" "}
                            and{" "}
                            <Link
                              to="/privacy"
                              className="text-primary hover:underline"
                            >
                              Privacy Policy
                            </Link>
                          </Label>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <Checkbox
                          id="emails"
                          checked={formData.emailUpdates}
                          onCheckedChange={(checked) =>
                            handleInputChange("emailUpdates", checked)
                          }
                        />
                        <div className="text-sm">
                          <Label htmlFor="emails" className="cursor-pointer">
                            Send me training tips, new course announcements, and
                            special offers
                          </Label>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Navigation Buttons */}
                <div className="flex items-center justify-between pt-6 border-t">
                  <div>
                    {step > 1 && (
                      <Button variant="outline" onClick={prevStep}>
                        Back
                      </Button>
                    )}
                  </div>

                  <div className="flex gap-3">
                    {step < 3 ? (
                      <Button
                        onClick={nextStep}
                        disabled={
                          (step === 1 && !canProceedStep1) ||
                          (step === 2 && !canProceedStep2)
                        }
                      >
                        Continue
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    ) : (
                      <Button
                        size="lg"
                        disabled={!canCompleteSignup || isSubmitting}
                        className="px-8"
                        onClick={handleSignup}
                      >
                        {isSubmitting ? (
                          <div className="flex items-center gap-2">
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            Creating Account...
                          </div>
                        ) : (
                          <>
                            <Play className="w-4 h-4 mr-2" />
                            Start Training Now
                          </>
                        )}
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Why Join Gojo */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-primary" />
                  Why Join Gojo?
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <Users className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="font-medium text-sm">
                      Learn from Masters
                    </div>
                    <div className="text-xs text-muted-foreground">
                      50+ world-class instructors with decades of experience
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Play className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="font-medium text-sm">Train Anywhere</div>
                    <div className="text-xs text-muted-foreground">
                      HD videos, mobile app, offline downloads available
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Target className="w-5 h-5 text-secondary mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="font-medium text-sm">Track Progress</div>
                    <div className="text-xs text-muted-foreground">
                      Personalized goals, achievements, and certificates
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Shield className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="font-medium text-sm">Risk-Free</div>
                    <div className="text-xs text-muted-foreground">
                      30-day money-back guarantee on all plans
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Community Stats */}
            <Card>
              <CardHeader>
                <CardTitle>Join the Community</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center space-y-2">
                  <div className="text-2xl font-bold text-primary">10,000+</div>
                  <div className="text-sm text-muted-foreground">
                    Active Students
                  </div>
                </div>

                <div className="text-center space-y-2">
                  <div className="text-2xl font-bold text-accent">67</div>
                  <div className="text-sm text-muted-foreground">Countries</div>
                </div>

                <div className="text-center space-y-2">
                  <div className="text-2xl font-bold text-secondary">4.9★</div>
                  <div className="text-sm text-muted-foreground">
                    Average Rating
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Security Notice */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="w-5 h-5" />
                  Secure & Private
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-primary" />
                  <span>256-bit SSL encryption</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-primary" />
                  <span>GDPR compliant</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-primary" />
                  <span>No spam, ever</span>
                </div>
              </CardContent>
            </Card>

            {/* Help */}
            <Card>
              <CardHeader>
                <CardTitle>Need Help?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full text-sm">
                  Chat with Support
                </Button>
                <div className="text-center text-xs text-muted-foreground">
                  Questions? Email us at hello@gojo.com
                </div>
              </CardContent>
            </Card>
          </div>
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
