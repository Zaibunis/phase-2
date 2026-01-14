/**
 * API client for frontend application with automatic JWT token attachment.
 * Handles authentication headers, error responses, and token management.
 */

import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { getAccessToken, isAuthenticated } from '../lib/auth';

// Base API configuration
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

// Create axios instance
const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000, // 10 seconds timeout
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to attach JWT token
apiClient.interceptors.request.use(
  async (config: InternalAxiosRequestConfig): Promise<InternalAxiosRequestConfig> => {
    // Check if authentication is required for this endpoint
    const requiresAuth = config.headers?.['X-Requires-Auth'] !== 'false';

    if (requiresAuth) {
      try {
        // Get the current access token
        const token = await getAccessToken();

        if (token) {
          // Attach Authorization header with Bearer token
          config.headers.Authorization = `Bearer ${token}`;
        } else {
          // If no token but auth required, check if user is authenticated
          // This might trigger a refresh or prompt for login
          const authStatus = await isAuthenticated();
          if (!authStatus) {
            console.warn('User not authenticated, redirecting to login...');
            // In a real app, you might redirect to login page
            // router.push('/login');
          }
        }
      } catch (error) {
        console.error('Error getting access token:', error);
        // Handle token retrieval error
      }
    }

    // Remove the custom header we used to determine if auth is required
    if (config.headers?.['X-Requires-Auth']) {
      delete config.headers['X-Requires-Auth'];
    }

    return config;
  },
  (error) => {
    // Handle request error
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor to handle authentication errors
apiClient.interceptors.response.use(
  (response: AxiosResponse) => {
    // Return successful responses as-is
    return response;
  },
  (error) => {
    // Handle response errors
    if (error.response) {
      // Server responded with error status
      const { status, data } = error.response;

      switch (status) {
        case 401:
          // Unauthorized - token may be expired or invalid
          console.error('Unauthorized access - token may be expired:', data);
          // In a real app, you might try to refresh the token or redirect to login
          // refreshTokenOrRedirect();
          break;

        case 403:
          // Forbidden - user doesn't have permission for this resource
          console.error('Forbidden access:', data);
          break;

        case 422:
          // Validation error
          console.error('Validation error:', data);
          break;

        case 500:
          // Server error
          console.error('Server error:', data);
          break;

        default:
          console.error(`HTTP error ${status}:`, data);
      }
    } else if (error.request) {
      // Request was made but no response received
      console.error('Network error - no response received:', error.request);
    } else {
      // Something else happened
      console.error('Error in request setup:', error.message);
    }

    return Promise.reject(error);
  }
);

// API service class with common methods
class APIService {
  /**
   * Make a GET request to the API
   */
  async get<T>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return apiClient.get<T>(url, config);
  }

  /**
   * Make a POST request to the API
   */
  async post<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return apiClient.post<T>(url, data, config);
  }

  /**
   * Make a PUT request to the API
   */
  async put<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return apiClient.put<T>(url, data, config);
  }

  /**
   * Make a PATCH request to the API
   */
  async patch<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return apiClient.patch<T>(url, data, config);
  }

  /**
   * Make a DELETE request to the API
   */
  async delete<T>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return apiClient.delete<T>(url, config);
  }

  /**
   * Upload a file to the API
   */
  async uploadFile(url: string, file: File, config?: AxiosRequestConfig): Promise<AxiosResponse<any>> {
    const formData = new FormData();
    formData.append('file', file);

    const uploadConfig = {
      ...config,
      headers: {
        ...config?.headers,
        'Content-Type': 'multipart/form-data',
      },
    };

    return apiClient.post(url, formData, uploadConfig);
  }

  /**
   * Set a new base URL for the API client
   */
  setBaseURL(newURL: string): void {
    apiClient.defaults.baseURL = newURL;
  }

  /**
   * Set default headers for all requests
   */
  setDefaultHeader(name: string, value: string): void {
    apiClient.defaults.headers.common[name] = value;
  }

  /**
   * Remove a default header
   */
  removeDefaultHeader(name: string): void {
    delete apiClient.defaults.headers.common[name];
  }
}

// Export singleton instance
export const apiService = new APIService();

// Export the raw axios instance for advanced use cases
export default apiClient;