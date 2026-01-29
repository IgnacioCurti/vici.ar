export interface RegisterData {
  email: string;
  username: string;
  password: string;
  displayName?: string;
  description?: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface User {
  id: number;
  email: string;
  username: string;
  displayName?: string;
  description?: string;
  emailVerified: boolean;
}

export interface AuthResponse {
  message: string;
  token: string;
  user: User;
}

export interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (data: LoginData) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  isLoading: boolean;
}
