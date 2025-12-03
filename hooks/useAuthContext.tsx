"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { UserService } from "../services/userService";
import { User as LoginRequest } from "../interfaces/user.interface";
import Swal from "sweetalert2";

interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem("upgrade-user");
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
        // Cookie sin expiración hasta logout explícito
        document.cookie = "upgrade-auth=true; path=/"; 
      } catch (error) {
        localStorage.removeItem("upgrade-user");
        document.cookie = "upgrade-auth=; path=/; max-age=0";
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const res = await UserService.login({
        correo: email,
        contrasena: password,
      } as LoginRequest);

      if (res.success && res.data && res.data.user) {
        const userData: User = {
          id: res.data.user.id_user?.toString() || "",
          name: `${res.data.user.nombre} ${res.data.user.apellido}`.trim(),
          email: res.data.user.correo,
        };

        setUser(userData);
        localStorage.setItem("upgrade-user", JSON.stringify(userData));
        // Cookie sin expiración hasta logout explícito
        document.cookie = "upgrade-auth=true; path=/";
        return true;
      }
      
      // Verificar si el mensaje es "Usuario no encontrado"
      const errorMessage = res.message || "";
      if (errorMessage.toLowerCase().includes('usuario no encontrado')) {
        Swal.fire({
          icon: "error",
          title: "Usuario no encontrado",
          text: errorMessage,
          confirmButtonText: "Aceptar",
        }).then(() => {
          window.location.href = "/";
        });
      }
      
      return false;
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || error.message || "Error al iniciar sesión";
      
      // Solo mostrar SweetAlert de "Acceso restringido" si el error es específicamente de autorización/rol
      // No mostrar si es solo un error de credenciales incorrectas
      if (error.response?.status === 401) {
        const isAuthorizationError = errorMessage.toLowerCase().includes('restringido') ||
                                    errorMessage.toLowerCase().includes('no autorizado') ||
                                    errorMessage.toLowerCase().includes('rol') ||
                                    errorMessage.toLowerCase().includes('acceso denegado') ||
                                    errorMessage.toLowerCase().includes('no puede acceder');
        
        if (isAuthorizationError) {
          Swal.fire({
            icon: "warning",
            title: "Acceso restringido",
            text: "Los vendedores no pueden acceder por ese formulario",
            confirmButtonText: "Aceptar",
          });
        } else if (errorMessage.toLowerCase().includes('usuario no encontrado')) {
          // Mostrar SweetAlert si el mensaje es "Usuario no encontrado"
          Swal.fire({
            icon: "error",
            title: "Usuario no encontrado",
            text: errorMessage,
            confirmButtonText: "Aceptar",
          }).then(() => {
            window.location.href = "/";
          });
        }
        // Si es solo credenciales incorrectas, no mostrar SweetAlert, solo retornar false
      } else if (errorMessage.toLowerCase().includes('usuario no encontrado')) {
        // Mostrar SweetAlert si el mensaje es "Usuario no encontrado" (otros códigos de error)
        Swal.fire({
          icon: "error",
          title: "Usuario no encontrado",
          text: errorMessage,
          confirmButtonText: "Aceptar",
        }).then(() => {
          window.location.href = "/";
        });
      }
      return false;
    }
  };

  const logout = async () => {
    try {
      await UserService.logout();
    } catch (error) {
      // Error en logout, continuar con el proceso
    } finally {
      setUser(null);
      localStorage.removeItem("upgrade-user");
      document.cookie = "upgrade-auth=; path=/; max-age=0";
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        logout,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

