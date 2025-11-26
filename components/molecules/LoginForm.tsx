"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "../../hooks/AuthContext";
import InputField from "../atoms/InputField";
import Button from "../atoms/Button";

interface LoginFormData {
  correo: string;
  contrasena: string;
}

export default function LoginForm() {
  const [error, setError] = useState("");
  const { login } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    defaultValues: {
      correo: "",
      contrasena: "",
    },
  });

  const onFormSubmit = async (data: LoginFormData) => {
    setError("");
    try {
      const success = await login(data.correo, data.contrasena);

      if (success) {
        const redirect = searchParams.get("redirect") || "/user";
        router.push(redirect);
      } else {
        setError("Credenciales incorrectas");
      }
    } catch (err) {
      setError("Error al iniciar sesión");
    }
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-4 sm:space-y-6">
        <div>
          <label className="text-sm font-medium text-gray-700">Correo</label>
          <InputField
            type="email"
            placeholder="Ingresa tu correo"
            {...register("correo", {
              required: "El correo es requerido",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Correo electrónico inválido",
              },
            })}
            required
          />
          {errors.correo && (
            <p className="mt-1 text-sm text-red-600">{errors.correo.message}</p>
          )}
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700">Contraseña</label>
          <InputField
            type="password"
            placeholder="Ingresa tu contraseña"
            {...register("contrasena", {
              required: "La contraseña es requerida",
              minLength: {
                value: 4,
                message: "La contraseña debe tener al menos 4 caracteres",
              },
            })}
            required
          />
          {errors.contrasena && (
            <p className="mt-1 text-sm text-red-600">{errors.contrasena.message}</p>
          )}
        </div>

        <Button type="submit" fullWidth disabled={isSubmitting}>
          {isSubmitting ? "Cargando..." : "Iniciar Sesión"}
        </Button>
      </form>

      <div className="text-center space-y-2">
        <a href="#" className="text-xs sm:text-sm text-green-600 hover:text-green-800">
          ¿Olvidaste tu contraseña?
        </a>
        <p className="text-xs sm:text-sm text-gray-600">
          ¿No tienes cuenta?{" "}
          <a href="/register" className="text-green-600 hover:text-green-800 font-medium">
            Regístrate aquí
          </a>
        </p>
      </div>
    </div>
  );
}
