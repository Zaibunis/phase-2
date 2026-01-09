'use client';

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { useSession, useSignOut, useSignIn, useSignUp } from '../../lib/auth';

interface AuthContextType {
  user: any;
  isLoading: boolean;
  error: string | null;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, name: string) => Promise<void>;
  signOut: () => Promise<void>;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const { data: session, isLoading: sessionLoading, error: sessionError } = useSession();
  const { mutate: signOutMutation } = useSignOut();
  const { mutate: signInMutation } = useSignIn();
  const { mutate: signUpMutation } = useSignUp();
  const [authError, setAuthError] = useState<string | null>(null);
  const [authLoading, setAuthLoading] = useState(false);

  const signIn = async (email: string, password: string) => {
    setAuthLoading(true);
    setAuthError(null);

    try {
      await signInMutation({ email, password });
    } catch (err) {
      setAuthError('Failed to sign in. Please check your credentials.');
      console.error('Sign in error:', err);
      throw err;
    } finally {
      setAuthLoading(false);
    }
  };

  const signUp = async (email: string, password: string, name: string) => {
    setAuthLoading(true);
    setAuthError(null);

    try {
      await signUpMutation({ email, password, name });
    } catch (err) {
      setAuthError('Failed to sign up. Please try again.');
      console.error('Sign up error:', err);
      throw err;
    } finally {
      setAuthLoading(false);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOutMutation();
    } catch (err) {
      setAuthError('Failed to sign out');
      console.error('Sign out error:', err);
    }
  };

  // Combine loading states
  const combinedLoading = sessionLoading || authLoading;

  // Combine error states
  const combinedError = sessionError?.message || authError;

  const value: AuthContextType = {
    user: session?.user || null,
    isLoading: combinedLoading,
    error: combinedError,
    signIn,
    signUp,
    signOut: handleSignOut,
    isAuthenticated: !!session?.user,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === null) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};