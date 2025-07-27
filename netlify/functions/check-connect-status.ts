import { Handler } from '@netlify/functions';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-06-20',
});

export const handler: Handler = async (event, context) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  if (event.httpMethod !== 'GET') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  try {
    const accountId = event.queryStringParameters?.accountId;

    if (!accountId) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Missing accountId parameter' }),
      };
    }

    // Retrieve account information
    const account = await stripe.accounts.retrieve(accountId);

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        accountId: account.id,
        chargesEnabled: account.charges_enabled,
        payoutsEnabled: account.payouts_enabled,
        detailsSubmitted: account.details_submitted,
        requirements: account.requirements,
      }),
    };
  } catch (error) {
    console.error('Error checking Connect account:', error);
    
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ 
        error: 'Failed to check account status',
        details: error instanceof Error ? error.message : 'Unknown error'
      }),
    };
  }
};
