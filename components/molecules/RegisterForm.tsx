"use client";

import InputField from "../atoms/InputField"
import Button from "../atoms/Button"
import { useRegisterForm } from "../../hooks/useRegisterForm";

export default function RegisterForm() {
  const { register, handleSubmit, errors, error, loading, authLoading } = useRegisterForm();

  if (authLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="h-8 w-8 border-4 border-[#57ad63] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
        <div>
          <label className="text-sm font-medium text-gray-700">Nombre completo</label>
          <InputField 
            type="text" 
            placeholder="Ingresa tu nombre completo" 
            {...register("fullName", {
              required: "El nombre es requerido",
              minLength: { value: 2, message: "El nombre debe tener al menos 2 caracteres" },
            })}
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
            {...register("email", {
              required: "El correo es requerido",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Correo electrónico inválido",
              },
            })}
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
            {...register("password", {
              required: "La contraseña es requerida",
              minLength: { value: 6, message: "La contraseña debe tener al menos 6 caracteres" },
            })}
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
            {...register("phone", {
              required: "El teléfono es requerido",
              minLength: { value: 10, message: "El teléfono debe tener al menos 10 caracteres" },
            })}
            required
          />
          {errors.phone && (
            <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>
          )}
        </div>
        <Button type="submit" fullWidth disabled={loading}>
          {loading ? "Registrando..." : "Registrarse"}
        </Button>
      </form>

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
