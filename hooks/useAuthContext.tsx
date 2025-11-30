"use client";
import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { UserService } from "../services/userService";
import { User as LoginRequest } from "../interfaces/user.interface";
import Swal from "sweetalert2"; 
import { useRouter } from "next/navigation"; 

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
  const router = useRouter();

  useEffect(() => {
    const savedUser = localStorage.getItem("upgrade-user");
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
        document.cookie = "upgrade-auth=true; path=/; max-age=2592000"; 
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
        document.cookie = "upgrade-auth=true; path=/; max-age=2592000";
        return true;
      }
      return false;
    } catch (error: any) {
      if (error.response?.status === 401) {
        Swal.fire({
          icon: "warning",
          title: "Acceso restringido",
          text: "Los vendedores no pueden acceder por ese formulario",
          confirmButtonText: "Ir al inicio del vendedor", 
        }).then((result) => {
          if (result.isConfirmed) {
            router.push("/login"); 
          }
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

