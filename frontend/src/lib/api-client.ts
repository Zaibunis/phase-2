import axios, { AxiosHeaders, AxiosInstance, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { getAccessToken } from '../lib/auth';

class ApiClient {
  private client: AxiosInstance;

  constructor(baseURL: string) {
    this.client = axios.create({
      baseURL,
      timeout: 15000, // 15 seconds timeout for deployed environment
      headers: {
        'Content-Type': 'application/json',
      },
      // Enable cross-site requests to handle deployed backend
      withCredentials: true,
    });

    // Request interceptor to add JWT token
this.client.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    const token = await getAccessToken();

    if (token) {
      if (!config.headers) {
        config.headers = AxiosHeaders.from({});
      }

      config.headers.set("Authorization", `Bearer ${token}`);
    }

    return config;
  },
      (error) => {
        return Promise.reject(error);
      }
    );

    // Response interceptor to handle errors and token expiration
    this.client.interceptors.response.use(
      (response: AxiosResponse) => {
        return response;
      },
      async (error) => {
        if (error.response?.status === 401) {
          // Handle token expiration - redirect to login or refresh token
          console.error('Unauthorized access - token may have expired');
          // In a real app, you might try to refresh the token here
          // before redirecting to login
          try {
            // Attempt token refresh if refresh token is available
            // This would require implementing refresh logic in auth.ts
          } catch (refreshError) {
            // If refresh fails, redirect to login
            // window.location.href = '/login';
          }
        }
        return Promise.reject(error);
      }
    );
  }

  get<T>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.client.get<T>(url, config);
  }

  post<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.client.post<T>(url, data, config);
  }

  put<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.client.put<T>(url, data, config);
  }

  patch<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.client.patch<T>(url, data, config);
  }

  delete<T>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.client.delete<T>(url, config);
  }

  // Method to make requests with retry logic
  async requestWithRetry<T>(
    requestFn: () => Promise<AxiosResponse<T>>,
    maxRetries: number = 3,
    retryDelay: number = 1000
  ): Promise<AxiosResponse<T>> {
    let lastError: any;

    for (let i = 0; i <= maxRetries; i++) {
      try {
        return await requestFn();
      } catch (error: any) {
        lastError = error;

        // Don't retry on 4xx errors (client errors)
        if (error.response && error.response.status >= 400 && error.response.status < 500) {
          break;
        }

        // If this is the last attempt, throw the error
        if (i === maxRetries) {
          break;
        }

        // Wait before retrying
        await this.delay(retryDelay * Math.pow(2, i)); // Exponential backoff
      }
    }

    throw lastError;
  }

  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}



// Configuration interface
export interface ApiConfig {
  baseUrl: string;
  timeout?: number;
  maxRetries?: number;
  retryDelay?: number;
}

// Default configuration
const defaultConfig: ApiConfig = {
  baseUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000',
  timeout: 10000, // 10 seconds
  maxRetries: 3,
  retryDelay: 1000, // 1 second
};

// Create API client instance using environment-based configuration
const apiClient = new ApiClient(defaultConfig.baseUrl);

// Export the configuration for reference
export { defaultConfig };
export default apiClient;