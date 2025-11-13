"use client";

import { useVendedorLogin } from "../../hooks/useVendedorLogin";
import InputField from "../atoms/InputField";
import Button from "../atoms/Button";
import ErrorAlert from "../atoms/ErrorAlert";
import FormLink from "../atoms/FormLink";

export default function VendedorLoginForm() {
  const { register, handleSubmit, errors, error, loading } = useVendedorLogin();

  return (
    <div className="space-y-4 sm:space-y-6">
      <ErrorAlert message={error} />

      <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
        <div>
          <label className="text-sm font-medium text-gray-700">Correo del Vendedor</label>
          <InputField 
            type="email" 
            placeholder="vendedor@negocio.com" 
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
        <Button type="submit" fullWidth disabled={loading}>
          {loading ? "Cargando..." : "Iniciar Sesión como Vendedor"}
        </Button>
      </form>

      <div className="text-center space-y-2">
        <FormLink href="#" className="text-xs sm:text-sm">
          ¿Olvidaste tu contraseña?
        </FormLink>
        <p className="text-xs sm:text-sm text-gray-600">
          ¿Quieres ser vendedor?{" "}
          <FormLink href="/contacto">Contáctanos</FormLink>
        </p>
      </div>
    </div>
  );
}

