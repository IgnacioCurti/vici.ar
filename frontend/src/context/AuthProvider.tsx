import React, { useState } from "react";
import type { User, LoginData, RegisterData } from "../types/auth.types";
import { authService } from "../services/auth.service";
import { AuthContext } from "./AuthContext";

const getStoredAuth = () => {
  const storedToken = localStorage.getItem("token");
  const storedUser = localStorage.getItem("user");

  if (storedToken && storedUser) {
    try {
      return {
        token: storedToken,
        user: JSON.parse(storedUser) as User,
      };
    } catch {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      return { token: null, user: null };
    }
  }

  return { token: null, user: null };
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { token: initialToken, user: initialUser } = getStoredAuth();

  const [user, setUser] = useState<User | null>(initialUser);
  const [token, setToken] = useState<string | null>(initialToken);
  const [isLoading, setIsLoading] = useState(false);

  const register = async (data: RegisterData) => {
    setIsLoading(true);
    const response = await authService.register(data);
    setToken(response.token);
    setUser(response.user);
    localStorage.setItem("token", response.token);
    localStorage.setItem("user", JSON.stringify(response.user));
  };

  const login = async (data: LoginData) => {
    const response = await authService.login(data);
    setToken(response.token);
    setUser(response.user);
    localStorage.setItem("token", response.token);
    localStorage.setItem("user", JSON.stringify(response.user));
  };

  const logout = () => {
    authService.logout();
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        login,
        register,
        logout,
        isAuthenticated: !!token,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
