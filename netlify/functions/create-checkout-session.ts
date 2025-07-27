import { Handler } from '@netlify/functions';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-06-20',
});

export const handler: Handler = async (event, context) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  try {
    const { 
      courseId, 
      courseName,
      coursePrice, 
      currency = 'USD', 
      instructorStripeId,
      userId,
      successUrl,
      cancelUrl 
    } = JSON.parse(event.body || '{}');

    if (!courseId || !courseName || !coursePrice || !instructorStripeId || !userId) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ 
          error: 'Missing required fields: courseId, courseName, coursePrice, instructorStripeId, userId' 
        }),
      };
    }

    // Calculate application fee (platform takes 10%)
    const applicationFeeAmount = Math.round(coursePrice * 0.1);

    // Create Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: currency.toLowerCase(),
            product_data: {
              name: courseName,
              description: `Access to ${courseName} - Lifetime Access`,
            },
            unit_amount: coursePrice, // Amount in cents
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: successUrl || `${process.env.URL || 'http://localhost:8888'}/course/${courseId}?success=true`,
      cancel_url: cancelUrl || `${process.env.URL || 'http://localhost:8888'}/course/${courseId}`,
      metadata: {
        courseId,
        userId,
        instructorStripeId,
      },
      payment_intent_data: {
        application_fee_amount: applicationFeeAmount,
        transfer_data: {
          destination: instructorStripeId,
        },
        metadata: {
          courseId,
          userId,
          type: 'course_purchase',
        },
      },
      customer_email: event.headers['user-email'] || undefined,
    });

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        sessionId: session.id,
        url: session.url,
      }),
    };
  } catch (error) {
    console.error('Error creating checkout session:', error);
    
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ 
        error: 'Failed to create checkout session',
        details: error instanceof Error ? error.message : 'Unknown error'
      }),
    };
  }
};
