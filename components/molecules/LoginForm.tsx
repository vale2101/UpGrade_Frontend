"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "../../contexts/AuthContext";
import InputField from "../atoms/InputField"
import Button from "../atoms/Button"

const loginFormSchema = z.object({
  email: z.string().email("Correo electrónico inválido"),
  password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
});

type LoginFormData = z.infer<typeof loginFormSchema>;

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
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onFormSubmit = async (data: LoginFormData) => {
    setError("");
    try {
      const success = await login(data.email, data.password);
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

      {/* Formulario */}
      <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-4 sm:space-y-6">
        <div>
          <label className="text-sm font-medium text-gray-700">Correo</label>
          <InputField 
            type="email" 
            placeholder="Ingresa tu correo" 
            name="email"
            {...register("email")}
            required
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
          )}
        </div>
        <div>
          <label className="text-sm font-medium text-gray-700">Contraseña</label>
          <InputField 
            type="password" 
            placeholder="Ingresa tu contraseña" 
            name="password"
            {...register("password")}
            required
          />
          {errors.password && (
            <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
          )}
        </div>
        <Button type="submit" fullWidth disabled={isSubmitting}>
          {isSubmitting ? "Cargando..." : "Iniciar Sesión"}
        </Button>
      </form>

      {/* Enlaces adicionales */}
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
  )
}