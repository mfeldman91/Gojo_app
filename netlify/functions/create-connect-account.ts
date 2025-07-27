import { Handler } from "@netlify/functions";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-06-20",
});

export const handler: Handler = async (event, context) => {
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
  };

  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 200, headers, body: "" };
  }

  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: "Method not allowed" }),
    };
  }

  try {
    const {
      email,
      firstName,
      lastName,
      country = "US",
    } = JSON.parse(event.body || "{}");

    if (!email || !firstName || !lastName) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({
          error: "Missing required fields: email, firstName, lastName",
        }),
      };
    }

    // Create Stripe Connect Express account for instructor
    const account = await stripe.accounts.create({
      type: "express",
      country: country,
      email: email,
      capabilities: {
        card_payments: { requested: true },
        transfers: { requested: true },
      },
      business_type: "individual",
      individual: {
        first_name: firstName,
        last_name: lastName,
        email: email,
      },
    });

    // Create account link for onboarding
    const accountLink = await stripe.accountLinks.create({
      account: account.id,
      refresh_url: `${process.env.URL || "http://localhost:8888"}/instructor/dashboard?refresh=true`,
      return_url: `${process.env.URL || "http://localhost:8888"}/instructor/dashboard?setup=complete`,
      type: "account_onboarding",
    });

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        accountId: account.id,
        onboardingUrl: accountLink.url,
      }),
    };
  } catch (error) {
    console.error("Error creating Connect account:", error);

    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        error: "Failed to create Connect account",
        details: error instanceof Error ? error.message : "Unknown error",
      }),
    };
  }
};
