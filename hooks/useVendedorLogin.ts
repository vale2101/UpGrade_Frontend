"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter, useSearchParams } from "next/navigation";
import { TrabajadorService } from "../services/TrabajadorService";
import Swal from "sweetalert2";

interface VendedorLoginFormData {
  correo: string;
  contrasena: string;
}

export function useVendedorLogin() {
  const [error, setError] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();

  const {
    register: registerField,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<VendedorLoginFormData>({
    defaultValues: {
      correo: "",
      contrasena: "",
    },
  });

  const onSubmit = async (data: VendedorLoginFormData) => {
    setError("");
    try {
      const res = await TrabajadorService.login({
        correo: data.correo,
        contrasena: data.contrasena,
      });

      if (res.success && res.data) {
        localStorage.setItem("vendedor", JSON.stringify(res.data.trabajador));

        await Swal.fire({
          icon: "success",
          title: "Bienvenido",
          text: "Login exitoso",
          timer: 2000,
          showConfirmButton: false,
        });

        const redirect = searchParams.get("redirect") || "/vendedor/dashboard";
        router.push(redirect);
      } else {
        const message = res.message || "Credenciales incorrectas";
        
        if (message.toLowerCase().includes('usuario no encontrado')) {
          Swal.fire({
            icon: "error",
            title: "Usuario no encontrado",
            text: message,
            confirmButtonText: "Aceptar",
          }).then(() => {
            router.push("/");
          });
        }
        
        setError(message);
      }
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || err.message || "Error al iniciar sesión";
      
      if (err.response?.status === 401) {
        const isAuthorizationError = errorMessage.toLowerCase().includes('restringido') ||
                                    errorMessage.toLowerCase().includes('no autorizado') ||
                                    errorMessage.toLowerCase().includes('rol') ||
                                    errorMessage.toLowerCase().includes('acceso denegado') ||
                                    errorMessage.toLowerCase().includes('no puede acceder');
        
        if (isAuthorizationError) {
          Swal.fire({
            icon: "warning",
            title: "Acceso restringido",
            text: "Los clientes no pueden acceder por ese formulario",
            confirmButtonText: "Ir al inicio del cliente", 
          }).then((result) => {
            if (result.isConfirmed) {
              router.push("/login"); 
            }
          });
        } else {
          if (errorMessage.toLowerCase().includes('usuario no encontrado')) {
            Swal.fire({
              icon: "error",
              title: "Usuario no encontrado",
              text: errorMessage,
              confirmButtonText: "Aceptar",
            }).then(() => {
              router.push("/");
            });
          }
          setError(errorMessage);
        }
      } else {
        if (errorMessage.toLowerCase().includes('usuario no encontrado')) {
          Swal.fire({
            icon: "error",
            title: "Usuario no encontrado",
            text: errorMessage,
            confirmButtonText: "Aceptar",
          }).then(() => {
            router.push("/");
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: errorMessage,
            confirmButtonText: "Ir al inicio del cliente", 
          }).then((result) => {
            if (result.isConfirmed) {
              router.push("/login"); 
            }
          });
        }
        setError(errorMessage);
      }
    }
  };

  const register = (name: keyof VendedorLoginFormData) => {
    if (name === "correo") {
      return registerField("correo", {
        required: "El correo es requerido",
        pattern: {
          value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
          message: "Correo electrónico inválido",
        },
      }) as any;
    }
    if (name === "contrasena") {
      return registerField("contrasena", {
        required: "La contraseña es requerida",
        minLength: { value: 6, message: "La contraseña debe tener al menos 6 caracteres" },
      }) as any;
    }
    return registerField(name) as any;
  };

  return {
    register,
    handleSubmit: handleSubmit(onSubmit),
    errors,
    error,
    loading: isSubmitting,
  };
}
