"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter, useSearchParams } from "next/navigation";
import { AdministradorService } from "../services/administradorService";
import Swal from "sweetalert2";

interface AdministradorLoginFormData {
  correo: string;
  contrasena: string;
}

export function useAdministradorLogin() {
  const [error, setError] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();

  const {
    register: registerField,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<AdministradorLoginFormData>({
    defaultValues: {
      correo: "",
      contrasena: "",
    },
  });

  const onSubmit = async (data: AdministradorLoginFormData) => {
    setError("");
    try {
      const res = await AdministradorService.login({
        correo: data.correo,
        contrasena: data.contrasena,
      });

      if (res.success && res.data) {
        // Limpiar primero cualquier dato antiguo
        localStorage.removeItem("administrador");
        
        // Asegurarse de sobrescribir cualquier dato antiguo con los datos del backend
        const administradorData = res.data.administrador;
        
        // Guardar los nuevos datos
        localStorage.setItem("administrador", JSON.stringify(administradorData));
        
        // Disparar evento personalizado para actualizar otros componentes en la misma pestaña
        window.dispatchEvent(new Event("administradorStorageChange"));
        
        // Forzar una actualización adicional después de un pequeño delay
        setTimeout(() => {
          window.dispatchEvent(new Event("administradorStorageChange"));
        }, 100);

        await Swal.fire({
          icon: "success",
          title: "Bienvenido",
          text: "Login exitoso",
          timer: 2000,
          showConfirmButton: false,
        });

        const redirect = searchParams.get("redirect") || "/administrador/dashboard";
        router.push(redirect);
      } else {
        const message = res.message || "Credenciales incorrectas";
        
        // Mostrar SweetAlert si el mensaje es "Usuario no encontrado"
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
      
      // Solo mostrar SweetAlert de "Acceso restringido" si el error es específicamente de autorización/rol
      // No mostrar si es solo un error de credenciales incorrectas
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
          // Verificar si es "Usuario no encontrado"
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
          // Error de credenciales incorrectas - mostrar en el formulario
          setError(errorMessage);
        }
      } else {
        // Verificar si es "Usuario no encontrado" en otros errores
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
          // Otros errores - mostrar SweetAlert
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

  const register = (name: keyof AdministradorLoginFormData) => {
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
