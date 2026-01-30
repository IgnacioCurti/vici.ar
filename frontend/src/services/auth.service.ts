import { api } from "./api";
import type { RegisterData, AuthResponse, LoginData } from "../types/auth.types";

export const authService = {
  async register(data: RegisterData): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>('/auth/register', {
      email: data.email,
      username: data.username,
      password: data.password,
      ...(data.displayName && {displayName: data.displayName}),
      ...(data.description && {description: data.description})
    });
    return response.data;
  },

  async verifyEmail(userId: number, code: string): Promise<void> {
    await api.get(`/auth/verify-email/${userId}/${code}`);
  },

  async login(data: LoginData): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>('/auth/login', data);
    return response.data;
  },

  async logout(): Promise<void> {
    // endpoint en el back? api.post('/auth/logout')
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }
}
