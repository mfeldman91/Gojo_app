import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Navigation } from '@/components/Navigation';

export default function AuthCallback() {
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        // Get the hash from URL (Supabase sends auth data in URL hash)
        const { data, error } = await supabase.auth.getSession();
        
        if (error) {
          throw error;
        }

        if (data.session) {
          setStatus('success');
          setMessage('Successfully signed in! Redirecting...');
          
          // Redirect to profile page after successful authentication
          setTimeout(() => {
            window.location.href = '/profile';
          }, 2000);
        } else {
          throw new Error('No session found');
        }
      } catch (error) {
        console.error('Auth callback error:', error);
        setStatus('error');
        setMessage(error instanceof Error ? error.message : 'Authentication failed');
        
        // Redirect to login page after error
        setTimeout(() => {
          window.location.href = '/login';
        }, 3000);
      }
    };

    handleAuthCallback();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="max-w-md mx-auto px-4 py-16">
        <div className="text-center space-y-4">
          {status === 'loading' && (
            <>
              <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
              <h1 className="text-2xl font-bold">Completing sign in...</h1>
              <p className="text-muted-foreground">Please wait while we finish setting up your account.</p>
            </>
          )}
          
          {status === 'success' && (
            <>
              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center mx-auto">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h1 className="text-2xl font-bold text-green-600">Sign in successful!</h1>
              <p className="text-muted-foreground">{message}</p>
            </>
          )}
          
          {status === 'error' && (
            <>
              <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center mx-auto">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
              <h1 className="text-2xl font-bold text-red-600">Sign in failed</h1>
              <p className="text-muted-foreground">{message}</p>
              <p className="text-sm text-muted-foreground">Redirecting to login page...</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
