import axios from 'axios';

import { getCookie, deleteCookie } from '@shared/lib';
import { COOKIE_NAMES, ROUTES } from '@shared/config';

export const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000/api/',
  withCredentials: true,
  headers: { 'Content-Type': 'application/json' }
});

// Attach auth token to every request
axiosInstance.interceptors.request.use((config) => {
  const token = getCookie(COOKIE_NAMES.AUTH_TOKEN);
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Handle errors globally
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      deleteCookie(COOKIE_NAMES.AUTH_TOKEN);
      deleteCookie(COOKIE_NAMES.USER_ROLE);
      window.location.href = ROUTES.AUTH;
    }
    return Promise.reject(error);
  }
);

export class API {
  async request<T>(
    endpoint: string,
    config: Record<string, unknown> = {}
  ): Promise<ApiResponse<T>> {
    const response = await axiosInstance.request<{ data: unknown; success: boolean }>({
      url: endpoint,
      ...config
    });
    const { data, success } = response.data;
    if (success) {
      return { data: data as T, status: response.status, success: true };
    }
    return { data: data as { message: string }, status: response.status, success: false };
  }

  get<T>(endpoint: string) {
    return this.request<T>(endpoint, { method: 'GET' });
  }

  post<T>(endpoint: string, body: Record<string, unknown>) {
    return this.request<T>(endpoint, { method: 'POST', data: body });
  }

  put<T>(endpoint: string, body: Record<string, unknown>) {
    return this.request<T>(endpoint, { method: 'PUT', data: body });
  }

  patch<T>(endpoint: string, body: Record<string, unknown>) {
    return this.request<T>(endpoint, { method: 'PATCH', data: body });
  }

  delete<T>(endpoint: string) {
    return this.request<T>(endpoint, { method: 'DELETE' });
  }
}

export const api = new API();
