"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import FormInput from "../atoms/FormInput";
import SubmitButton from "../atoms/SubmitButton";

const authFormSchema = z.object({
  name: z.string().min(2, "El nombre debe tener al menos 2 caracteres").optional(),
  email: z.string().email("Correo electrónico inválido"),
  password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
  confirmPassword: z.string().optional(),
}).refine((data) => {
  if (data.confirmPassword) {
    return data.password === data.confirmPassword;
  }
  return true;
}, {
  message: "Las contraseñas no coinciden",
  path: ["confirmPassword"],
});

type AuthFormData = z.infer<typeof authFormSchema>;

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
  } = useForm<AuthFormData>({
    resolver: zodResolver(authFormSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

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


