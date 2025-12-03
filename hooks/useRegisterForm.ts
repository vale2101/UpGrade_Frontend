"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useAuth } from "./useAuthContext";
import { UserService } from "../services/userService";
import { CreateUserRequest } from "../interfaces/user.interface";
import Swal from "sweetalert2";

export interface RegisterFormData {
  fullName: string;
  email: string;
  password: string;
  phone: string;
}

interface User {
  id: string;
  name: string;
  email: string;
}

export function useRegisterForm() {
  const [error, setError] = useState("");
  const { login, isAuthenticated, isLoading: authLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (authLoading) return;
    if (isAuthenticated) {
      router.push("/user");
    }
  }, [isAuthenticated, authLoading, router]);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      phone: "",
    },
  });

  const onSubmit = async (data: RegisterFormData) => {
    setError("");
    try {
      const nameParts = data.fullName.trim().split(" ");
      const nombre = nameParts[0] || "";
      const apellido = nameParts.slice(1).join(" ") || "";

      const res = await UserService.createUser({
        nombre: nombre,
        apellido: apellido,
        correo: data.email,
        contrasena: data.password,
        telefono: data.phone,
      } as CreateUserRequest);

      if (res && (res.success || res.message?.toLowerCase().includes("creado"))) {
        if (res.data && res.data.id_user) {
          const userData: User = {
            id: res.data.id_user?.toString() || "",
            name: `${res.data.nombre} ${res.data.apellido}`.trim(),
            email: res.data.correo,
          };

          localStorage.setItem("upgrade-user", JSON.stringify(userData));
          document.cookie = "upgrade-auth=true; path=/";
          
          const loginSuccess = await login(data.email, data.password);
          
          if (loginSuccess) {
            await Swal.fire({
              icon: "success",
              title: "¡Registro exitoso!",
              text: "Tu cuenta ha sido creada correctamente",
              timer: 2000,
              showConfirmButton: false,
            });
            router.push("/user");
            return;
          }
        }

        const loginSuccess = await login(data.email, data.password);
        
        if (loginSuccess) {
          await Swal.fire({
            icon: "success",
            title: "¡Registro exitoso!",
            text: "Tu cuenta ha sido creada correctamente",
            timer: 2000,
            showConfirmButton: false,
          });
          router.push("/user");
          return;
        }

        await Swal.fire({
          icon: "success",
          title: "¡Registro exitoso!",
          text: "Tu cuenta ha sido creada. Por favor, inicia sesión.",
          timer: 2000,
          showConfirmButton: false,
        });
        router.push("/login");
        return;
      }

      setError("Error al registrar. Intenta de nuevo.");
      await Swal.fire({
        icon: "error",
        title: "Error en el registro",
        text: "No se pudo crear tu cuenta. Por favor, intenta de nuevo.",
      });
    } catch (err: any) {
      if (err?.response?.data?.message?.toLowerCase().includes("creado")) {
        const loginSuccess = await login(data.email, data.password);
        if (loginSuccess) {
          await Swal.fire({
            icon: "success",
            title: "¡Registro exitoso!",
            text: "Tu cuenta ha sido creada correctamente",
            timer: 2000,
            showConfirmButton: false,
          });
          router.push("/user");
          return;
        }
      }
      
      if (err?.response?.data?.data && err.response.data.data.id_user) {
        const userData = err.response.data.data;
        const formattedUser: User = {
          id: userData.id_user?.toString() || "",
          name: `${userData.nombre} ${userData.apellido}`.trim(),
          email: userData.correo,
        };

        localStorage.setItem("upgrade-user", JSON.stringify(formattedUser));
        document.cookie = "upgrade-auth=true; path=/";
        
        const loginSuccess = await login(data.email, data.password);
        if (loginSuccess) {
          await Swal.fire({
            icon: "success",
            title: "¡Registro exitoso!",
            text: "Tu cuenta ha sido creada correctamente",
            timer: 2000,
            showConfirmButton: false,
          });
          router.push("/user");
          return;
        }
      }
      
      const errorMessage = err?.response?.data?.message || "Error al registrar. Intenta de nuevo.";
      setError(errorMessage);
      await Swal.fire({
        icon: "error",
        title: "Error en el registro",
        text: errorMessage,
      });
    }
  };

  return {
    register,
    handleSubmit: handleSubmit(onSubmit),
    errors,
    error,
    loading: isSubmitting || authLoading,
    authLoading,
  };
}

