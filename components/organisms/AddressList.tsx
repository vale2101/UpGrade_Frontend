"use client";

import { MapPin, Trash2 } from "lucide-react";
import { useAddressList } from "../../hooks/useAddressList";
import { direccionInterface } from "../../interfaces/direccion.interface";

interface AddressListProps {
  onRefresh?: () => void;
  refreshKey?: number;
}

export default function AddressList({ onRefresh, refreshKey }: AddressListProps) {
  const { direcciones, loading, error, deletingId, handleDelete, loadDirecciones } = useAddressList({ refreshKey });

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 sm:p-6">
        <p className="text-sm sm:text-base text-gray-600 text-center">Cargando direcciones...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-red-200 p-4 sm:p-6">
        <p className="text-sm sm:text-base text-red-600 text-center">{error}</p>
        <button
          onClick={loadDirecciones}
          className="mt-3 sm:mt-4 mx-auto block text-xs sm:text-sm text-blue-600 hover:text-blue-800 transition-colors"
        >
          Intentar de nuevo
        </button>
      </div>
    );
  }

  if (direcciones.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 sm:p-6">
        <div className="text-center py-6 sm:py-8">
          <MapPin size={40} className="sm:w-12 sm:h-12 mx-auto text-gray-400 mb-3 sm:mb-4" />
          <p className="text-sm sm:text-base text-gray-600 mb-2">No tienes direcciones registradas</p>
          <p className="text-xs sm:text-sm text-gray-500">Agrega una dirección usando el formulario</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-3 sm:space-y-4">
      <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">
        Direcciones registradas ({direcciones.length})
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
        {direcciones.map((direccion) => (
          <div
            key={direccion.id_direccion}
            className="bg-white border border-gray-200 rounded-lg p-4 sm:p-5 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-2">
                <MapPin size={18} className="sm:w-5 sm:h-5 text-gray-400 flex-shrink-0" />
                <h4 className="text-sm sm:text-base font-semibold text-gray-900">
                  Dirección #{direccion.id_direccion}
                </h4>
              </div>
              <button
                onClick={() => {
                  if (direccion.id_direccion) {
                    handleDelete(direccion.id_direccion);
                    onRefresh?.();
                  }
                }}
                disabled={deletingId === direccion.id_direccion}
                className="text-red-600 hover:text-red-800 hover:bg-red-50 p-1.5 sm:p-2 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0"
                title="Eliminar dirección"
                aria-label="Eliminar dirección"
              >
                <Trash2 size={16} className="sm:w-[18px] sm:h-[18px]" />
              </button>
            </div>

            <div className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm text-gray-700">
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
                <p className="text-gray-900 mt-1 break-words">{direccion.completa}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

