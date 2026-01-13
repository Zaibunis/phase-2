/**
 * Better Auth configuration for the frontend application.
 * Handles user authentication, JWT token management, and API integration.
 */

import { betterAuth } from "better-auth";
import { createAuthClient } from "better-auth/client";

// Initialize Better Auth client for frontend - No database configuration needed
export const auth = betterAuth({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:8000",
  secret: process.env.BETTER_AUTH_SECRET || "your-super-secret-jwt-key-change-in-production",
  // Frontend doesn't need database configuration - this is handled by the backend
  // Email and password authentication
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: false, // Set to true in production
  },
  // Social providers can be added here
  socialProviders: {},
  // Session configuration
  session: {
    expiresIn: 60 * 60 * 24 * 7, // 7 days
    updateAge: 60 * 60 * 24, // Update session every 24 hours if active
  },
  // User configuration
  user: {
    fields: {
      // Map any additional fields if needed
    },
  },
  // Hooks for custom logic
  hooks: {}
});

// Create authentication client
export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:8000",
  plugins: [
    // Add any additional plugins here
  ]
});

// Export BetterAuth hooks
export const { useSession, useSignIn, useSignUp, useSignOut } = authClient;

// Helper function to get the access token
export const getAccessToken = async (): Promise<string | null> => {
  try {
    const session = await auth.api.getSession();
    return session?.session?.token || null;
  } catch (error) {
    console.error("Error getting access token:", error);
    return null;
  }
};

// Helper function to get the refresh token
export const getRefreshToken = async (): Promise<string | null> => {
  try {
    const session = await auth.api.getSession();
    return session?.session?.token || null;
  } catch (error) {
    console.error("Error getting refresh token:", error);
    return null;
  }
};

// Helper function to check if user is authenticated
export const isAuthenticated = async (): Promise<boolean> => {
  try {
    const session = await auth.api.getSession();
    return !!session?.session;
  } catch (error) {
    console.error("Error checking authentication status:", error);
    return false;
  }
};

// Helper function to sign out
export const signOut = async (): Promise<void> => {
  try {
    await auth.api.signOut();
  } catch (error) {
    console.error("Error signing out:", error);
    throw error;
  }
};