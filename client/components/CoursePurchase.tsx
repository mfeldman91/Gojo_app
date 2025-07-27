import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { loadStripe } from "@stripe/stripe-js";
import {
  CreditCard,
  Lock,
  CheckCircle,
  Loader2,
  Play,
  Clock,
  Users,
  Star,
} from "lucide-react";
import { getCurrentUser } from "@/lib/auth";
import { createPaymentIntent } from "@/lib/auth-supabase";

interface Course {
  id: string;
  title: string;
  description: string;
  price: number;
  currency: string;
  instructor_id: string;
  instructor_name: string;
  duration_hours: number;
  students_count: number;
  rating: number;
  thumbnail_url?: string;
  stripe_price_id?: string;
}

interface CoursePurchaseProps {
  course: Course;
  instructorStripeId: string;
  onPurchaseComplete?: () => void;
}

export default function CoursePurchase({
  course,
  instructorStripeId,
  onPurchaseComplete,
}: CoursePurchaseProps) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const formatPrice = (amount: number, currency: string = "USD") => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency.toUpperCase(),
    }).format(amount);
  };

  const handlePurchase = async () => {
    try {
      setIsProcessing(true);
      setError(null);

      // Check if user is logged in
      const user = await getCurrentUser();
      if (!user) {
        window.location.href =
          "/login?redirect=" + encodeURIComponent(window.location.pathname);
        return;
      }

      // Create payment intent
      const result = await createPaymentIntent(
        course.id,
        Math.round(course.price * 100), // Convert to cents
        instructorStripeId,
      );

      if (!result.success) {
        throw new Error(result.error || "Failed to create payment");
      }

      // Initialize Stripe
      const stripe = await loadStripe(
        import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY,
      );
      if (!stripe) {
        throw new Error("Stripe failed to load");
      }

      // Redirect to Stripe Checkout
      const { error: stripeError } = await stripe.redirectToCheckout({
        sessionId: result.clientSecret,
      });

      if (stripeError) {
        throw new Error(stripeError.message);
      }
    } catch (err) {
      console.error("Purchase error:", err);
      setError(err instanceof Error ? err.message : "Purchase failed");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleEnrollFree = async () => {
    // For free courses
    setIsProcessing(true);
    try {
      const user = await getCurrentUser();
      if (!user) {
        window.location.href =
          "/login?redirect=" + encodeURIComponent(window.location.pathname);
        return;
      }

      // TODO: Create enrollment record in database
      setSuccess(true);
      onPurchaseComplete?.();
    } catch (err) {
      setError("Failed to enroll in course");
    } finally {
      setIsProcessing(false);
    }
  };

  if (success) {
    return (
      <Card className="border-green-200 bg-green-50">
        <CardContent className="p-6">
          <div className="text-center space-y-4">
            <CheckCircle className="w-12 h-12 text-green-600 mx-auto" />
            <h3 className="text-lg font-semibold text-green-800">
              Enrollment Successful!
            </h3>
            <p className="text-green-700">
              You now have access to this course. Start learning!
            </p>
            <Button className="w-full">
              <Play className="w-4 h-4 mr-2" />
              Start Course
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="sticky top-24">
      <CardContent className="p-6 space-y-6">
        {/* Course Preview */}
        <div className="aspect-video bg-gradient-to-br from-primary/20 to-accent/20 rounded-lg flex items-center justify-center relative overflow-hidden">
          {course.thumbnail_url ? (
            <img
              src={course.thumbnail_url}
              alt={course.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <Play className="w-12 h-12 text-primary" />
          )}
          <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
            <Button size="lg" variant="secondary" className="rounded-full">
              <Play className="w-5 h-5 ml-1" />
            </Button>
          </div>
        </div>

        {/* Pricing */}
        <div className="text-center space-y-2">
          {course.price > 0 ? (
            <>
              <div className="text-3xl font-bold">
                {formatPrice(course.price, course.currency)}
              </div>
              <p className="text-sm text-muted-foreground">
                One-time payment • Lifetime access
              </p>
            </>
          ) : (
            <>
              <div className="text-3xl font-bold text-green-600">Free</div>
              <p className="text-sm text-muted-foreground">
                No payment required
              </p>
            </>
          )}
        </div>

        {/* Purchase Button */}
        {error && (
          <div className="p-3 bg-red-100 text-red-800 rounded-lg text-sm">
            {error}
          </div>
        )}

        <Button
          className="w-full text-lg py-3"
          size="lg"
          onClick={course.price > 0 ? handlePurchase : handleEnrollFree}
          disabled={isProcessing}
        >
          {isProcessing ? (
            <>
              <Loader2 className="w-5 h-5 mr-2 animate-spin" />
              Processing...
            </>
          ) : (
            <>
              {course.price > 0 ? (
                <>
                  <CreditCard className="w-5 h-5 mr-2" />
                  Buy Now
                </>
              ) : (
                <>
                  <Play className="w-5 h-5 mr-2" />
                  Enroll Free
                </>
              )}
            </>
          )}
        </Button>

        {/* Course Stats */}
        <div className="space-y-3 pt-4 border-t">
          <div className="flex items-center justify-between text-sm">
            <span className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              Duration
            </span>
            <span className="font-medium">{course.duration_hours}h</span>
          </div>

          <div className="flex items-center justify-between text-sm">
            <span className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              Students
            </span>
            <span className="font-medium">
              {course.students_count.toLocaleString()}
            </span>
          </div>

          <div className="flex items-center justify-between text-sm">
            <span className="flex items-center gap-2">
              <Star className="w-4 h-4" />
              Rating
            </span>
            <span className="font-medium">{course.rating.toFixed(1)}/5</span>
          </div>
        </div>

        {/* Security Notice */}
        <div className="flex items-center gap-2 text-xs text-muted-foreground pt-4 border-t">
          <Lock className="w-3 h-3" />
          <span>Secure payment powered by Stripe</span>
        </div>

        {/* Instructor */}
        <div className="text-center pt-4 border-t">
          <p className="text-sm text-muted-foreground">Taught by</p>
          <p className="font-semibold">{course.instructor_name}</p>
        </div>
      </CardContent>
    </Card>
  );
}
