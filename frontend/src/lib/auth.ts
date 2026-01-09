/**
 * Better Auth configuration for the frontend application.
 * Handles user authentication, JWT token management, and API integration.
 */

import { createAuth, createAuthEndpoint } from "@better-auth/react";
import { betterAuth } from "better-auth";

// Initialize Better Auth client with JWT plugin
export const auth = betterAuth({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:8000",
  secret: process.env.BETTER_AUTH_SECRET || "your-super-secret-jwt-key-change-in-production",
  database: {
    provider: "sqlite",
    url: process.env.DATABASE_URL || "./sqlite.db",
  },
  // Enable JWT plugin for token-based authentication
  jwt: {
    secret: process.env.BETTER_AUTH_SECRET || "your-super-secret-jwt-key-change-in-production",
    expiresIn: "15m", // 15 minutes for access tokens
    refreshExpiresIn: "7d", // 7 days for refresh tokens
  },
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
    slidingExpiration: true,
    updateAge: 60 * 60 * 24, // Update session every 24 hours if active
  },
  // User configuration
  user: {
    include: {
      // Any additional fields to include in user object
    },
  },
  // Advanced configurations
  advanced: {
    generateUserId: () => crypto.randomUUID(), // Use UUID for user IDs
    prefix: "/api/auth", // API prefix for auth endpoints
  },
  // Hooks for custom logic
  hooks: {
    afterUserSignIn: [
      async (ctx) => {
        // Custom logic after sign in
        console.log("User signed in:", ctx.user.email);
      }
    ],
    afterUserSignUp: [
      async (ctx) => {
        // Custom logic after sign up
        console.log("New user registered:", ctx.user.email);
      }
    ]
  }
});

// Create React hooks for authentication
export const {
  useSession,
  useSignOut,
  useSignIn,
  useSignUp
} = createAuth({
  auth,
  plugins: [
    // Add any additional plugins here
  ]
});

// Helper function to get the access token
export const getAccessToken = async (): Promise<string | null> => {
  try {
    const session = await auth.getSession();
    return session?.accessToken || null;
  } catch (error) {
    console.error("Error getting access token:", error);
    return null;
  }
};

// Helper function to get the refresh token
export const getRefreshToken = async (): Promise<string | null> => {
  try {
    const session = await auth.getSession();
    return session?.refreshToken || null;
  } catch (error) {
    console.error("Error getting refresh token:", error);
    return null;
  }
};

// Helper function to check if user is authenticated
export const isAuthenticated = async (): Promise<boolean> => {
  try {
    const session = await auth.getSession();
    return !!session;
  } catch (error) {
    console.error("Error checking authentication status:", error);
    return false;
  }
};

// Helper function to sign out
export const signOut = async (): Promise<void> => {
  try {
    await auth.client.signOut();
  } catch (error) {
    console.error("Error signing out:", error);
    throw error;
  }
};