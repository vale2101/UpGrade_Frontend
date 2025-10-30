"use client";

import { useState, FormEvent } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "../../contexts/AuthContext";
import InputField from "../atoms/InputField"
import Button from "../atoms/Button"

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const success = await login(email, password);
      if (success) {
        const redirect = searchParams.get("redirect") || "/user";
        router.push(redirect);
      } else {
        setError("Credenciales incorrectas");
      }
    } catch (err) {
      setError("Error al iniciar sesión");
    } finally {
      setLoading(false);
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
      <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
        <div>
          <label className="text-sm font-medium text-gray-700">Correo</label>
          <InputField 
            type="email" 
            placeholder="Ingresa tu correo" 
            name="email"
            value={email}
            onChange={(e: any) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="text-sm font-medium text-gray-700">Contraseña</label>
          <InputField 
            type="password" 
            placeholder="Ingresa tu contraseña" 
            name="password"
            value={password}
            onChange={(e: any) => setPassword(e.target.value)}
            required
          />
        </div>
        <Button type="submit" fullWidth disabled={loading}>
          {loading ? "Cargando..." : "Iniciar Sesión"}
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