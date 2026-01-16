/**
 * Better Auth configuration for the frontend application.
 * Handles user authentication, JWT token management, and API integration.
 */

import { createAuthClient } from "better-auth/client";

// Create authentication client
export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000",
  plugins: [],
  // ⚡ Important: Include credentials for cookies
  fetchOptions: {
    credentials: "include", // ensures cookies (session) are sent
    headers: {
      "Content-Type": "application/json",
    },
  },
});

// Export BetterAuth hooks
export const { useSession } = authClient;

// Helper function to get the access token
export const getAccessToken = async (): Promise<string | null> => {
  try {
    // For JWT tokens, we primarily rely on localStorage
    const token = localStorage.getItem('access_token');
    return token;
  } catch (error) {
    console.error("Error getting access token:", error);
    // Fallback to localStorage in case of error
    const token = localStorage.getItem('access_token');
    return token;
  }
};

// Helper function to get the refresh token
export const getRefreshToken = async (): Promise<string | null> => {
  try {
    const token = localStorage.getItem('refresh_token');
    return token || null;
  } catch (error) {
    console.error("Error getting refresh token:", error);
    return null;
  }
};

// Helper function to check if user is authenticated
export const isAuthenticated = async (): Promise<boolean> => {
  try {
    const token = localStorage.getItem('access_token');
    return !!token;
  } catch (error) {
    console.error("Error checking authentication status:", error);
    return false;
  }
};

// Helper function to sign out
export const signOut = async (): Promise<void> => {
  try {
    // Use the authClient to sign out if available, otherwise just clear local storage
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
  } catch (error) {
    console.error("Error signing out:", error);
    // Still try to clear local storage even if there's an error
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    throw error;
  }
};