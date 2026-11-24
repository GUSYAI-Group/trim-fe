/**
 * Standard API Client with Fetch for TRIM Frontend
 * Connects to Next.js public API URL with automatic JSON parsing and JWT token handling.
 */

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data: T;
  meta?: Record<string, any>;
}

export class ApiError extends Error {
  public statusCode: number;
  public errors?: any;

  constructor(message: string, statusCode = 500, errors?: any) {
    super(message);
    this.statusCode = statusCode;
    this.errors = errors;
    Object.setPrototypeOf(this, ApiError.prototype);
  }
}

async function request<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  const url = `${API_BASE_URL}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`;

  // Retrieve token from localStorage if available
  let token: string | null = null;
  if (typeof window !== 'undefined') {
    try {
      const authStorage = localStorage.getItem('trim-auth-storage');
      if (authStorage) {
        const parsed = JSON.parse(authStorage);
        token = parsed?.state?.token || null;
      }
    } catch (_err) {
      // ignore JSON parse errors
    }
  }

  const headers = new Headers(options.headers || {});
  headers.set('Content-Type', 'application/json');
  if (token) {
    headers.set('Authorization', `Bearer ${token}`);
  }

  const response = await fetch(url, {
    ...options,
    headers,
  });

  const json: ApiResponse<T> = await response.json();

  if (!response.ok || !json.success) {
    throw new ApiError(
      json.message || `Request failed with status ${response.status}`,
      response.status,
      json
    );
  }

  return json;
}

export const apiClient = {
  get: <T>(url: string, params?: Record<string, string | number | boolean | undefined>) => {
    let finalUrl = url;
    if (params) {
      const queryParams = new URLSearchParams();
      Object.entries(params).forEach(([key, val]) => {
        if (val !== undefined && val !== null && val !== '') {
          queryParams.append(key, String(val));
        }
      });
      const qs = queryParams.toString();
      if (qs) {
        finalUrl += (url.includes('?') ? '&' : '?') + qs;
      }
    }
    return request<T>(finalUrl, { method: 'GET' });
  },

  post: <T>(url: string, body?: any) =>
    request<T>(url, {
      method: 'POST',
      body: body ? JSON.stringify(body) : undefined,
    }),

  put: <T>(url: string, body?: any) =>
    request<T>(url, {
      method: 'PUT',
      body: body ? JSON.stringify(body) : undefined,
    }),

  patch: <T>(url: string, body?: any) =>
    request<T>(url, {
      method: 'PATCH',
      body: body ? JSON.stringify(body) : undefined,
    }),

  delete: <T>(url: string) =>
    request<T>(url, {
      method: 'DELETE',
    }),
};
