"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { CreateUserRequest } from "../interfaces/user.interface";
import { UserService } from "../services/userService";
import Swal from "sweetalert2";

export interface CreateUserFormData {
  nombre: string;
  apellido: string;
  correo: string;
  contrasena: string;
  telefono?: string;
}

interface UseCreateUserFormProps {
  onSuccess?: (user: any) => void;
}

export function useCreateUserForm({ onSuccess }: UseCreateUserFormProps = {}) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CreateUserFormData>({
    defaultValues: {
      nombre: "",
      apellido: "",
      correo: "",
      contrasena: "",
      telefono: "",
    },
  });

  const onSubmit = async (data: CreateUserFormData) => {
    setIsSubmitting(true);

    try {
      const userData: CreateUserRequest = {
        nombre: data.nombre.trim(),
        apellido: data.apellido.trim(),
        correo: data.correo.trim(),
        contrasena: data.contrasena,
        telefono: data.telefono?.trim() || undefined,
      };

      const response = await UserService.createUser(userData);

      const message = (response.message || "").toLowerCase();
      const hasSuccessMessage = message.includes("creado") || message.includes("correctamente");
      const hasData = !!response.data;
      const isSuccess = response.success || hasSuccessMessage || hasData;

      if (isSuccess) {
        reset();
        onSuccess?.(response.data);
      } else {
        const errorMessage = response.message || "Error al crear el usuario";
        
        if (!errorMessage.toLowerCase().includes("creado") && 
            !errorMessage.toLowerCase().includes("correctamente")) {
          await Swal.fire({
            icon: "error",
            title: "Error",
            text: errorMessage,
          });
        } else {
          reset();
          onSuccess?.(response.data);
        }
      }
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || error.message || "";
      
      const isSuccessMessage = errorMessage.toLowerCase().includes("creado") || 
                                errorMessage.toLowerCase().includes("correctamente");
      
      if (isSuccessMessage) {
        const createdUser = error.response?.data?.data || error.response?.data;
        reset();
        onSuccess?.(createdUser);
      } else {
        await Swal.fire({
          icon: "error",
          title: "Error",
          text: errorMessage || "Error inesperado al crear el usuario",
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    register,
    handleSubmit,
    errors,
    isSubmitting,
    onSubmit,
    reset,
  };
}

