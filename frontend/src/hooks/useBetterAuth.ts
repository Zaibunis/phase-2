import { useRouter } from 'next/navigation';
import { useCallback } from 'react';
import apiClient from '../lib/api-client';
import { authClient } from '../lib/auth';

// For now, since BetterAuth uses atoms instead of standard hooks, we'll create a simple wrapper
// that works with our existing system but represents the BetterAuth integration
interface User {
  id: string;
  email: string;
  token?: string;
}

interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
  isAuthenticated: boolean;
}

interface AuthResponse {
  access_token: string;
}


interface AuthContextType extends AuthState {
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  refreshAuth: () => void;
}

export function useBetterAuth(): AuthContextType {
  const router = useRouter();

  // Direct API calls to match our backend endpoints
  const signInHandler = useCallback(async (email: string, password: string) => {
    try {
      const response = await apiClient.post<any>(  // Changed to 'any' to handle varying response structures
        '/auth/auth/signin',
        { email, password }
      );

      // Try to extract token from different possible response formats
      let token = response.data.access_token || response.data.token || response.data.data?.access_token;

      if (token) {
        localStorage.setItem('access_token', token);
        // Don't redirect here - let the form component handle the redirect after context updates
      } else {
        console.error('Sign in response:', response.data); // Log for debugging
        throw new Error('Sign in failed - no token received in response');
      }
    } catch (error: any) {
      console.error('Sign in error:', error); // Log for debugging
      const errorMessage = error.response?.data?.error?.message ||
                          error.response?.data?.detail ||
                          error.response?.data?.message ||
                          error.message ||
                          'Sign in failed';
      throw new Error(errorMessage);
    }
  }, []);

  const signUpHandler = useCallback(async (email: string, password: string) => {
    try {
      const response = await apiClient.post<any>(  // Changed to 'any' to handle varying response structures
        '/auth/auth/signup',
        { email, password }
      );

      // Try to extract token from different possible response formats
      let token = response.data.access_token || response.data.token || response.data.data?.access_token;

      if (token) {
        // Store the token in localStorage for use with API calls
        localStorage.setItem('access_token', token);
        // Don't redirect here - let the form component handle the redirect after context updates
      } else {
        console.error('Sign up response:', response.data); // Log for debugging
        throw new Error('Sign up failed - no token received in response');
      }
    } catch (error: any) {
      console.error('Sign up error:', error); // Log for debugging
      const errorMessage = error.response?.data?.error?.message ||
                          error.response?.data?.detail ||
                          error.response?.data?.message ||
                          error.message ||
                          'Sign up failed';
      throw new Error(errorMessage);
    }
  }, []);

  const signOutHandler = useCallback(async () => {
    try {
      // Clear the stored token
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      // Use authClient to sign out if available
      await authClient.signOut();
      router.push('/signin');
    } catch (error) {
      // Even if sign out fails, redirect to sign in
      router.push('/signin');
    }
  }, [router]);

  const refreshAuth = useCallback(() => {
    // Session refreshing would happen automatically with JWT
  }, []);

  // Return initial state - the actual state will be managed by AuthContext
  return {
    user: null,
    loading: false,
    error: null,
    isAuthenticated: false,
    signIn: signInHandler,
    signUp: signUpHandler,
    signOut: signOutHandler,
    refreshAuth,
  };
}