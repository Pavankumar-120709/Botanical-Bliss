import axios from "axios";
import Cookies from "js-cookie";
import { ENV } from "../config/index.js";

/**
 * Enhanced API client with better error handling, logging, and retry logic
 */

const apiClient = axios.create({
  baseURL: ENV.API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  timeout: ENV.API_TIMEOUT,
  withCredentials: true,
});

let requestCounter = 0;

apiClient.interceptors.request.use(
  async (config) => {
    const requestId = ++requestCounter;
    config.metadata = { requestId, startTime: Date.now() };

    // Add Clerk JWT token if available
    if (window.Clerk && window.Clerk.session) {
      const token = await window.Clerk.session.getToken();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }

    // CSRF disabled for stateless JWT authentication

    if (ENV.ENABLE_DEBUG_MODE) {
      console.log(`[API Request ${requestId}]`, {
        method: config.method?.toUpperCase(),
        url: config.url,
      });
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const enhancedError = {
      ...error,
      isApiError: true,
      status: error.response?.status,
      errorMessage: error.response?.data?.errorMessage || 
                   error.response?.data?.message || 
                   error.message || 
                   'An unexpected error occurred',
    };

    return Promise.reject(enhancedError);
  }
);

export const createApiMethod = (method) => {
  return async (url, data, config = {}) => {
    try {
      const response = await apiClient[method](url, data, config);
      return response.data;
    } catch (error) {
      throw {
        message: error.errorMessage || error.message,
        status: error.status,
        isApiError: true,
        originalError: error,
      };
    }
  };
};

export const api = {
  get: createApiMethod('get'),
  post: createApiMethod('post'),
  put: createApiMethod('put'),
  patch: createApiMethod('patch'),
  delete: createApiMethod('delete'),
};

export default apiClient;
