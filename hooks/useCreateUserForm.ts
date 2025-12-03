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

      // Verificar si el usuario se creó correctamente (por success, por mensaje o por data)
      const message = (response.message || "").toLowerCase();
      const hasSuccessMessage = message.includes("creado") || message.includes("correctamente");
      const hasData = !!response.data;
      const isSuccess = response.success || hasSuccessMessage || hasData;

      if (isSuccess) {
        reset();
        // Llamar onSuccess sin mostrar Swal aquí - se mostrará después de cerrar el modal
        // NO mostrar error, siempre tratar como éxito si hay datos o mensaje de éxito
        onSuccess?.(response.data);
      } else {
        // Solo mostrar error si realmente es un error y no hay datos
        const errorMessage = response.message || "Error al crear el usuario";
        
        // Verificar una vez más si el mensaje indica éxito
        if (!errorMessage.toLowerCase().includes("creado") && 
            !errorMessage.toLowerCase().includes("correctamente")) {
          await Swal.fire({
            icon: "error",
            title: "Error",
            text: errorMessage,
          });
        } else {
          // El mensaje indica éxito aunque no haya success: true
          reset();
          onSuccess?.(response.data);
        }
      }
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || error.message || "";
      
      // Verificar si el error realmente indica un fallo o si el mensaje indica éxito
      const isSuccessMessage = errorMessage.toLowerCase().includes("creado") || 
                                errorMessage.toLowerCase().includes("correctamente");
      
      if (isSuccessMessage) {
        // Si el mensaje indica éxito, tratarlo como éxito
        const createdUser = error.response?.data?.data || error.response?.data;
        reset();
        onSuccess?.(createdUser);
      } else {
        // Es un error real
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

