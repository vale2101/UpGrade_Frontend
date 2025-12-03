import { useState, useEffect } from "react";
import { UserService } from "../services/userService";
import { DireccionService } from "../services/DireccionService";
import { direccionInterface } from "../interfaces/direccion.interface";
import { useAuth } from "./useAuthContext";

interface UseAddressListProps {
  refreshKey?: number;
}

export function useAddressList({ refreshKey }: UseAddressListProps = {}) {
  const { user } = useAuth();
  const [direcciones, setDirecciones] = useState<direccionInterface[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  const extractDirecciones = (userData: any): direccionInterface[] => {
    let direccionesData: direccionInterface[] = [];

    if (userData?.direcciones && Array.isArray(userData.direcciones)) {
      direccionesData = userData.direcciones;
    }
    else if (userData?.direccion && Array.isArray(userData.direccion)) {
      direccionesData = userData.direccion;
    }
    else if (userData?.direccion && typeof userData.direccion === 'object' && !Array.isArray(userData.direccion)) {
      direccionesData = [userData.direccion];
    }
    else if (userData?.data?.direcciones && Array.isArray(userData.data.direcciones)) {
      direccionesData = userData.data.direcciones;
    }
    else if (Array.isArray(userData)) {
      direccionesData = userData.filter((item: any) => 
        item && (item.pais || item.departamento || item.ciudad || item.completa || item.id_direccion)
      );
    }
    else if (userData && typeof userData === 'object') {
      const data = userData;
      if (data.pais || data.departamento || data.ciudad || data.completa || data.id_direccion) {
        if (data.id_direccion) {
          direccionesData = [{
            id_user: data.id_user,
            id_direccion: data.id_direccion,
            pais: data.pais,
            departamento: data.departamento,
            ciudad: data.ciudad,
            completa: data.completa
          }];
        }
        else if (data.pais && data.departamento && data.ciudad && data.completa) {
          direccionesData = [{
            id_user: data.id_user,
            id_direccion: data.id_direccion,
            pais: data.pais,
            departamento: data.departamento,
            ciudad: data.ciudad,
            completa: data.completa
          }];
        }
      }
      else {
        const keys = Object.keys(data || {});
        for (const key of keys) {
          const value = data[key];
          if (Array.isArray(value) && value.length > 0) {
            const firstItem = value[0];
            if (firstItem && (firstItem.pais || firstItem.departamento || firstItem.ciudad || firstItem.completa)) {
              direccionesData = value;
              break;
            }
          }
        }
      }
    }

    return direccionesData;
  };

  const loadDirecciones = async () => {
    const userId = user?.id;
    
    if (!userId) {
      setError("Debes estar autenticado para ver tus direcciones");
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const userIdNum = parseInt(userId, 10);
      
      try {
        const allDireccionesRes = await DireccionService.getDirecciones();
        if (allDireccionesRes.success && allDireccionesRes.data) {
          const userDirecciones = allDireccionesRes.data.filter(
            (dir: direccionInterface) => dir.id_user === userIdNum
          );
          if (userDirecciones.length > 0) {
            setDirecciones(userDirecciones);
            setLoading(false);
            return;
          }
        }
      } catch (err) {
        console.warn("No se pudieron obtener todas las direcciones:", err);
      }

      const userData = await UserService.getUserWithDireccion(userId);
      let direccionesData = extractDirecciones(userData);
      setDirecciones(direccionesData);
    } catch (err: any) {
      setError(err.message || "Error inesperado al cargar direcciones");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDirecciones();
  }, [refreshKey, user?.id]);

  const handleDelete = async (id: number) => {
    if (!confirm("¿Estás seguro de que deseas eliminar esta dirección?")) {
      return;
    }

    try {
      setDeletingId(id);
      const res = await DireccionService.deleteDireccion(id);

      if (res.success) {
        await loadDirecciones();
      } else {
        alert(res.message || "Error al eliminar la dirección");
      }
    } catch (err: any) {
      alert(err.message || "Error inesperado al eliminar");
    } finally {
      setDeletingId(null);
    }
  };

  return {
    direcciones,
    loading,
    error,
    deletingId,
    handleDelete,
    loadDirecciones
  };
}

