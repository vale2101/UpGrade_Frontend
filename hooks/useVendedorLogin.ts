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
        setError(res.message || "Credenciales incorrectas");
        Swal.fire({
          icon: "error",
          title: "Acceso denegado",
          text: res.message || "Credenciales incorrectas",
          confirmButtonText: "Ir al inicio del cliente", 
        }).then((result) => {
          if (result.isConfirmed) {
            router.push("/login"); 
          }
        });
      }
    } catch (err: any) {
      if (err.response?.status === 401) {
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
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Error al iniciar sesión",
          confirmButtonText: "Ir al inicio del cliente", 
        }).then((result) => {
          if (result.isConfirmed) {
            router.push("/login"); 
          }
        });
      }
      setError(err.message || "Error al iniciar sesión");
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
