"use client";

import { useState, useEffect } from "react";
import { UserService } from "../../services/userService";
import { DireccionService } from "../../services/DireccionService";
import { direccionInterface } from "../../interfaces/direccion.interface";
import { useAuth } from "../../contexts/AuthContext";
import { MapPin, Trash2 } from "lucide-react";

interface AddressListProps {
  onRefresh?: () => void;
  refreshKey?: number;
}

export default function AddressList({ onRefresh, refreshKey }: AddressListProps) {
  const { user } = useAuth();
  const [direcciones, setDirecciones] = useState<direccionInterface[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  const loadDirecciones = async () => {
    if (!user?.id) {
      setError("Usuario no autenticado");
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const userData = await UserService.getUserWithDireccion(user.id);
      
      let direccionesData: direccionInterface[] = [];
      
      if ((userData as any).direcciones && Array.isArray((userData as any).direcciones)) {
        direccionesData = (userData as any).direcciones;
      }
      else if ((userData as any).direccion) {
        direccionesData = Array.isArray((userData as any).direccion) 
          ? (userData as any).direccion 
          : [(userData as any).direccion];
      }
      else if (Array.isArray(userData)) {
        direccionesData = userData as any;
      }
      else {
        direccionesData = [];
      }
      
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
        if (onRefresh) {
          onRefresh();
        }
      } else {
        alert(res.message || "Error al eliminar la dirección");
      }
    } catch (err: any) {
      alert(err.message || "Error inesperado al eliminar");
    } finally {
      setDeletingId(null);
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <p className="text-gray-600 text-center">Cargando direcciones...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-red-200 p-6">
        <p className="text-red-600 text-center">{error}</p>
        <button
          onClick={loadDirecciones}
          className="mt-4 mx-auto block text-sm text-blue-600 hover:text-blue-800"
        >
          Intentar de nuevo
        </button>
      </div>
    );
  }

  if (direcciones.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="text-center py-8">
          <MapPin size={48} className="mx-auto text-gray-400 mb-4" />
          <p className="text-gray-600 mb-2">No tienes direcciones registradas</p>
          <p className="text-sm text-gray-500">Agrega una dirección usando el formulario</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Direcciones registradas ({direcciones.length})
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {direcciones.map((direccion) => (
          <div
            key={direccion.id_direccion}
            className="bg-white border border-gray-200 rounded-lg p-5 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-2">
                <MapPin size={20} className="text-gray-400" />
                <h4 className="font-semibold text-gray-900">
                  Dirección #{direccion.id_direccion}
                </h4>
              </div>
              <button
                onClick={() => direccion.id_direccion && handleDelete(direccion.id_direccion)}
                disabled={deletingId === direccion.id_direccion}
                className="text-red-600 hover:text-red-800 hover:bg-red-50 p-2 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                title="Eliminar dirección"
              >
                <Trash2 size={18} />
              </button>
            </div>
            
            <div className="space-y-2 text-sm text-gray-700">
              <div>
                <span className="font-medium">País:</span> {direccion.pais}
              </div>
              <div>
                <span className="font-medium">Departamento:</span> {direccion.departamento}
              </div>
              <div>
                <span className="font-medium">Ciudad:</span> {direccion.ciudad}
              </div>
              <div className="pt-2 border-t border-gray-100">
                <span className="font-medium">Dirección completa:</span>
                <p className="text-gray-900 mt-1">{direccion.completa}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

