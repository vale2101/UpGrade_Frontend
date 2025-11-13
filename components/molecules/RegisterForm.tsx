"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { useAuth } from "../../contexts/AuthContext";
import InputField from "../atoms/InputField"
import Button from "../atoms/Button"

const registerFormSchema = z.object({
  fullName: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
  email: z.string().email("Correo electrónico inválido"),
  password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
  phone: z.string().min(10, "El teléfono debe tener al menos 10 caracteres"),
});

type RegisterFormData = z.infer<typeof registerFormSchema>;

export default function RegisterForm() {
  const [error, setError] = useState("");
  const { register: registerUser } = useAuth();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      phone: "",
    },
  });

  const onFormSubmit = async (data: RegisterFormData) => {
    setError("");
    try {
      // Usar el método de registro del contexto de autenticación
      const success = await registerUser(
        data.fullName,
        data.email,
        data.password,
        data.phone
      );
      if (success) {
        router.push("/user");
      } else {
        setError("Error al registrar. Intenta de nuevo.");
      }
    } catch (err) {
      setError("Error al registrar. Intenta de nuevo.");
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
          <label className="text-sm font-medium text-gray-700">Nombre completo</label>
          <InputField 
            type="text" 
            placeholder="Ingresa tu nombre completo" 
            name="fullName"
            {...register("fullName")}
            required
          />
          {errors.fullName && (
            <p className="mt-1 text-sm text-red-600">{errors.fullName.message}</p>
          )}
        </div>
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
        <div>
          <label className="text-sm font-medium text-gray-700">Teléfono</label>
          <InputField 
            type="tel" 
            placeholder="Ingresa tu número de teléfono" 
            name="phone"
            {...register("phone")}
            required
          />
          {errors.phone && (
            <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>
          )}
        </div>
        <Button type="submit" fullWidth disabled={isSubmitting}>
          {isSubmitting ? "Registrando..." : "Registrarse"}
        </Button>
      </form>

      {/* Enlaces adicionales */}
      <div className="text-center space-y-2">
        <p className="text-xs sm:text-sm text-gray-600">
          ¿Ya tienes cuenta?{" "}
          <a href="/login" className="text-green-600 hover:text-green-800 font-medium">
            Inicia sesión aquí
          </a>
        </p>
      </div>
    </div>
  )
}
