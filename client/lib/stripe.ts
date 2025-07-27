import { loadStripe } from "@stripe/stripe-js";

const stripePublishableKey = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY;

if (!stripePublishableKey) {
  throw new Error(
    "Missing Stripe publishable key. Please set VITE_STRIPE_PUBLISHABLE_KEY environment variable.",
  );
}

// Initialize Stripe
export const stripePromise = loadStripe(stripePublishableKey);

// Stripe-related types
export interface PaymentIntent {
  id: string;
  amount: number;
  currency: string;
  status: string;
  client_secret: string;
}

export interface Course {
  id: string;
  title: string;
  price: number;
  currency: string;
  instructor_id: string;
}

export interface StripeConnectAccount {
  id: string;
  charges_enabled: boolean;
  payouts_enabled: boolean;
  details_submitted: boolean;
}

// Helper functions for price formatting
export const formatPrice = (
  amount: number,
  currency: string = "USD",
): string => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency.toUpperCase(),
  }).format(amount);
};

export const centsToDollars = (cents: number): number => {
  return cents / 100;
};

export const dollarsToCents = (dollars: number): number => {
  return Math.round(dollars * 100);
};
