"use client";

import { useState } from "react";
import { UserService } from "../services/userService";
import { User, LoginRequest, CreateUserRequest } from "../interfaces/user.interface";

export function useAuthService() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleError = (err: any, defaultMsg: string) => {
    setError(err?.response?.data?.message || err.message || defaultMsg);
  };

  const login = async (email: string, password: string): Promise<boolean> => {
    setLoading(true);
    setError(null);
    try {
      const res = await UserService.login({ correo: email, contrasena: password } as LoginRequest);
      if (res.success && res.data) {
        setUser(res.data.user);
        return true;
      }
      setError(res.message || "Credenciales inválidas");
      return false;
    } catch (err: any) {
      handleError(err, "Error en login");
      return false;
    } finally {
      setLoading(false);
    }
  };

  const register = async (name: string, email: string, password: string): Promise<boolean> => {
    setLoading(true);
    setError(null);
    try {
      const res = await UserService.createUser({
        nombre: name,
        apellido: "",
        correo: email,
        contrasena: password,
      } as CreateUserRequest);

      if (res.success) {
        if (res.data) setUser(res.data);
        return true;
      }
      setError(res.message || "Error al crear la cuenta");
      return false;
    } catch (err: any) {
      handleError(err, "Error en registro");
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    setError(null);
    try {
      await UserService.logout();
      setUser(null);
    } catch (err: any) {
      handleError(err, "Error en logout");
    } finally {
      setLoading(false);
    }
  };

  return {
    user,
    loading,
    error,
    login,
    register,
    logout,
  };
}
