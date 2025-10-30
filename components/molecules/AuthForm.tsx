"use client";

import { useState } from "react";
import FormInput from "../atoms/FormInput";
import SubmitButton from "../atoms/SubmitButton";

interface AuthFormProps {
  isLogin: boolean;
  onSubmit: (data: AuthFormData) => Promise<void>;
  isLoading: boolean;
}

export interface AuthFormData {
  name?: string;
  email: string;
  password: string;
  confirmPassword?: string;
}

export default function AuthForm({ isLogin, onSubmit, isLoading }: AuthFormProps) {
  const [formData, setFormData] = useState<AuthFormData>({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {!isLogin && (
        <FormInput
          label="Nombre completo"
          type="text"
          name="name"
          value={formData.name || ""}
          onChange={handleChange}
          placeholder="Tu nombre completo"
          required={!isLogin}
        />
      )}

      <FormInput
        label="Correo electrónico"
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="tu@email.com"
        required
      />

      <FormInput
        label="Contraseña"
        type="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
        placeholder="Tu contraseña"
        required
      />

      {!isLogin && (
        <FormInput
          label="Confirmar contraseña"
          type="password"
          name="confirmPassword"
          value={formData.confirmPassword || ""}
          onChange={handleChange}
          placeholder="Confirma tu contraseña"
          required={!isLogin}
        />
      )}

      <SubmitButton loading={isLoading}>
        {isLogin ? "Iniciar Sesión" : "Crear Cuenta"}
      </SubmitButton>
    </form>
  );
}

