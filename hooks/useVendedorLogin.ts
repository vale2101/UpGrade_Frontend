"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "../contexts/AuthContext";

interface VendedorLoginFormData {
  email: string;
  password: string;
}

export function useVendedorLogin() {
  const [error, setError] = useState("");
  const { login } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();

  const {
    register: registerField,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<VendedorLoginFormData>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: VendedorLoginFormData) => {
    setError("");
    try {
      const success = await login(data.email, data.password);
      if (success) {
        const redirect = searchParams.get("redirect") || "/vendedor/dashboard";
        router.push(redirect);
      } else {
        setError("Credenciales incorrectas");
      }
    } catch (err) {
      setError("Error al iniciar sesión");
    }
  };

  const register = (name: keyof VendedorLoginFormData) => {
    if (name === "email") {
      return registerField("email", {
        required: "El correo es requerido",
        pattern: {
          value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
          message: "Correo electrónico inválido",
        },
      }) as any;
    }
    if (name === "password") {
      return registerField("password", {
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

