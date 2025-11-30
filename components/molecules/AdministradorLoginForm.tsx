"use client";

import { useAdministradorLogin } from "../../hooks/useAdministradorLogin";
import FormInput from "../atoms/FormInput";
import Button from "../atoms/Button";
import ErrorAlert from "../atoms/ErrorAlert";
import FormLink from "../atoms/FormLink";

interface AdministradorLoginFormData {
  correo: string;
  contrasena: string;
}

export default function AdministradorLoginForm() {
  const { register, handleSubmit, errors, error, loading } = useAdministradorLogin();

  return (
    <div className="space-y-4 sm:space-y-6">
      <ErrorAlert message={error} />

      <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
        <FormInput<AdministradorLoginFormData>
          label="Correo del Administrador"
          type="email"
          name="correo"
          placeholder="admin@negocio.com"
          required
          register={register("correo")}
          errors={errors}
        />

        <FormInput<AdministradorLoginFormData>
          label="Contraseña"
          type="password"
          name="contrasena"
          placeholder="Ingresa tu contraseña"
          required
          register={register("contrasena")}
          errors={errors}
        />

        <Button type="submit" fullWidth disabled={loading}>
          {loading ? "Cargando..." : "Iniciar Sesión como Administrador"}
        </Button>
      </form>

      <div className="text-center space-y-2">
        <FormLink href="#" className="text-xs sm:text-sm">
          ¿Olvidaste tu contraseña?
        </FormLink>
        <p className="text-xs sm:text-sm text-gray-600">
          ¿Eres cliente?{" "}
          <FormLink href="/login">Inicia sesión aquí</FormLink>
        </p>
      </div>
    </div>
  );
}

