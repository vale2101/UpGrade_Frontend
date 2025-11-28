import { useState } from "react";
import { useForm } from "react-hook-form";
import { DireccionService } from "../services/DireccionService";
import { direccionInterface } from "../interfaces/direccion.interface";
import { useAuth } from "./useAuthContext";

export function useAddressForm() {
  const { user } = useAuth();
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [refreshKey, setRefreshKey] = useState(0);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<direccionInterface>({
    defaultValues: {
      pais: "",
      departamento: "",
      ciudad: "",
      completa: "",
    },
  });

  const onSave = async (data: direccionInterface) => {
    if (!user?.id) {
      setError("Debes estar autenticado para agregar una dirección");
      return;
    }

    try {
      setError(null);
      const direccionData: direccionInterface = {
        ...data,
        id_user: parseInt(user.id, 10),
      };
      
      const res = await DireccionService.createDireccion(direccionData);

      if (res.success) {
        setSaved(true);
        reset(); 
        setTimeout(() => setSaved(false), 3000);
        setRefreshKey(prev => prev + 1);
      } else {
        setError(res.message || "Error al guardar la dirección");
      }
    } catch (err: any) {
      setError(err.message || "Error inesperado");
    }
  };

  const handleRefresh = () => {
    setRefreshKey(prev => prev + 1);
  };

  return {
    register,
    handleSubmit,
    errors,
    isSubmitting,
    saved,
    error,
    refreshKey,
    onSave,
    handleRefresh
  };
}

