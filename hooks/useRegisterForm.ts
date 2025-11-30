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

  // Redirigir si ya está autenticado
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
      // Dividir nombre completo en nombre y apellido
      const nameParts = data.fullName.trim().split(" ");
      const nombre = nameParts[0] || "";
      const apellido = nameParts.slice(1).join(" ") || "";

      // Llamar directamente al servicio de usuario
      const res = await UserService.createUser({
        nombre: nombre,
        apellido: apellido,
        correo: data.email,
        contrasena: data.password,
        telefono: data.phone,
      } as CreateUserRequest);

      // Verificar si el registro fue exitoso (success: true o mensaje de éxito)
      if (res && (res.success || res.message?.toLowerCase().includes("creado"))) {
        // Si la respuesta tiene los datos del usuario, guardarlos y hacer login
        if (res.data && res.data.id_user) {
          const userData: User = {
            id: res.data.id_user?.toString() || "",
            name: `${res.data.nombre} ${res.data.apellido}`.trim(),
            email: res.data.correo,
          };

          // Guardar en localStorage temporalmente
          localStorage.setItem("upgrade-user", JSON.stringify(userData));
          document.cookie = "upgrade-auth=true; path=/; max-age=2592000";
          
          // Hacer login para sincronizar el contexto
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

        // Si el registro fue exitoso pero no hay datos del usuario en la respuesta
        // Intentar hacer login automático con las credenciales recién usadas
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

        // Si el login automático falla, aún considerar el registro como exitoso
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
      // Si hay un error pero la respuesta indica que el usuario se creó
      if (err?.response?.data?.message?.toLowerCase().includes("creado")) {
        // Intentar hacer login automático
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
      
      // Si hay un error pero la respuesta tiene datos del usuario creado
      if (err?.response?.data?.data && err.response.data.data.id_user) {
        const userData = err.response.data.data;
        const formattedUser: User = {
          id: userData.id_user?.toString() || "",
          name: `${userData.nombre} ${userData.apellido}`.trim(),
          email: userData.correo,
        };

        // Guardar en localStorage temporalmente
        localStorage.setItem("upgrade-user", JSON.stringify(formattedUser));
        document.cookie = "upgrade-auth=true; path=/; max-age=2592000";
        
        // Hacer login para sincronizar el contexto
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

