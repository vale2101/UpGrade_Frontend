"use client";

import { useForm } from "react-hook-form";
import FormInput from "../atoms/FormInput";
import SubmitButton from "../atoms/SubmitButton";

interface AuthFormData {
  name?: string;
  email: string;
  password: string;
  confirmPassword?: string;
}

interface AuthFormProps {
  isLogin: boolean;
  onSubmit: (data: AuthFormData) => Promise<void>;
  isLoading: boolean;
}

export default function AuthForm({ isLogin, onSubmit, isLoading }: AuthFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<AuthFormData>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const password = watch("password");

  const onFormSubmit = async (data: AuthFormData) => {
    await onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-4">
      {!isLogin && (
        <FormInput<AuthFormData>
          label="Nombre completo"
          type="text"
          name="name"
          placeholder="Tu nombre completo"
          required={!isLogin}
          register={register}
          errors={errors}
        />
      )}

      <FormInput<AuthFormData>
        label="Correo electrónico"
        type="email"
        name="email"
        placeholder="tu@email.com"
        required
        register={register}
        errors={errors}
      />

      <FormInput<AuthFormData>
        label="Contraseña"
        type="password"
        name="password"
        placeholder="Tu contraseña"
        required
        register={register}
        errors={errors}
      />

      {!isLogin && (
        <FormInput<AuthFormData>
          label="Confirmar contraseña"
          type="password"
          name="confirmPassword"
          placeholder="Confirma tu contraseña"
          required={!isLogin}
          register={register}
          errors={errors}
        />
      )}

      <SubmitButton loading={isLoading}>
        {isLogin ? "Iniciar Sesión" : "Crear Cuenta"}
      </SubmitButton>
    </form>
  );
}
