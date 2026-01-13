import { useAuth as useAuthContext } from '../../context/AuthContext';

/**
 * Custom hook for authentication functionality.
 * Provides unified interface for auth operations.
 */
export function useAuth() {
  return useAuthContext();
}