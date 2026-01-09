/**
 * Authentication error handler for token expiration and invalid token scenarios
 */

export interface AuthErrorHandler {
  handleTokenExpiration: () => void;
  handleInvalidToken: () => void;
  handleAuthError: (error: any) => void;
}

class AuthErrorService implements AuthErrorHandler {
  private loginRedirectUrl: string;

  constructor(loginRedirectUrl = '/login') {
    this.loginRedirectUrl = loginRedirectUrl;
  }

  /**
   * Handle token expiration scenario
   */
  handleTokenExpiration(): void {
    console.warn('Token has expired. Redirecting to login.');
    this.redirectToLogin();
  }

  /**
   * Handle invalid token scenario
   */
  handleInvalidToken(): void {
    console.warn('Invalid token provided. Redirecting to login.');
    this.redirectToLogin();
  }

  /**
   * General authentication error handler
   */
  handleAuthError(error: any): void {
    const status = error?.response?.status;

    switch (status) {
      case 401:
        // Unauthorized - token expired or invalid
        console.error('Authentication failed:', error.message);
        this.handleTokenExpiration();
        break;
      case 403:
        // Forbidden - token valid but insufficient permissions
        console.error('Access forbidden:', error.message);
        break;
      default:
        console.error('Authentication error:', error.message);
        break;
    }
  }

  /**
   * Redirect to login page
   */
  private redirectToLogin(): void {
    // In a Next.js environment, we'd use router.push('/login')
    // For now, we'll use window.location for demonstration
    if (typeof window !== 'undefined') {
      window.location.href = this.loginRedirectUrl;
    }
  }
}

// Create a singleton instance
const authErrorHandler = new AuthErrorService();

export default authErrorHandler;