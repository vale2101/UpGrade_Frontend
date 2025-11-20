"use client";

import { useVendedorLogin } from "../../hooks/useVendedorLogin";
import FormInput from "../atoms/FormInput";
import Button from "../atoms/Button";
import ErrorAlert from "../atoms/ErrorAlert";
import FormLink from "../atoms/FormLink";

interface VendedorLoginFormData {
  email: string;
  password: string;
}

export default function VendedorLoginForm() {
  const { register, handleSubmit, errors, error, loading } = useVendedorLogin();

  return (
    <div className="space-y-4 sm:space-y-6">
      <ErrorAlert message={error} />

      <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
        <FormInput<VendedorLoginFormData>
          label="Correo del Vendedor"
          type="email"
          name="email"
          placeholder="vendedor@negocio.com"
          required
          register={register("email")}
          errors={errors}
        />
        
        <FormInput<VendedorLoginFormData>
          label="Contraseña"
          type="password"
          name="password"
          placeholder="Ingresa tu contraseña"
          required
          register={register("password")}
          errors={errors}
        />
        
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

