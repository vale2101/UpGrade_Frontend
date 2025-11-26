"use client";
import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { UserService } from "../services/userService";
import { User as LoginRequest, CreateUserRequest } from "../interfaces/user.interface";
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
  register: (name: string, email: string, password: string, phone?: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

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
        console.error("Error loading user from localStorage:", error);
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
      } else {
        console.error("Error en login:", error);
      }
      return false;
    }
  };

  const register = async (
    name: string,
    email: string,
    password: string,
    phone?: string
  ): Promise<boolean> => {
    try {
      const nameParts = name.trim().split(" ");
      const nombre = nameParts[0] || "";
      const apellido = nameParts.slice(1).join(" ") || "";

      const res = await UserService.createUser({
        nombre: nombre,
        apellido: apellido,
        correo: email,
        contrasena: password,
        telefono: phone,
      } as CreateUserRequest);

      if (res.success && res.data) {
        const userData: User = {
          id: res.data.id_user?.toString() || "",
          name: `${res.data.nombre} ${res.data.apellido}`.trim(),
          email: res.data.correo,
        };

        setUser(userData);
        localStorage.setItem("upgrade-user", JSON.stringify(userData));
        document.cookie = "upgrade-auth=true; path=/; max-age=2592000";
        return true;
      }
      return false;
    } catch (error) {
      console.error("Error en registro:", error);
      return false;
    }
  };

  const logout = async () => {
    try {
      await UserService.logout();
    } catch (error) {
      console.error("Error en logout:", error);
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
        register,
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
