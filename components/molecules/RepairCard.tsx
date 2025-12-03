"use client";

import { useState, useEffect } from "react";
import { reparacionInterface } from "../../interfaces/reparacion.interface";
import { ReparacionService } from "../../services/reparacionService";
import Swal from "sweetalert2";

interface RepairCardProps {
  reparacion: reparacionInterface;
  onStatusUpdate?: () => void;
}

const estadosValidos: reparacionInterface["estado"][] = ["Recibido", "Revisión", "Reparación", "Reparado", "Cancelado"];

export default function RepairCard({ reparacion, onStatusUpdate }: RepairCardProps) {
  const [currentEstado, setCurrentEstado] = useState<reparacionInterface["estado"]>(
    reparacion.estado || "Recibido"
  );
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    setCurrentEstado(reparacion.estado || "Recibido");
  }, [reparacion.estado]);

  const handleStatusChange = async (newEstado: string) => {
    if (!reparacion.id_reparacion) return;

    if (!estadosValidos.includes(newEstado as reparacionInterface["estado"])) {
      await Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Estado no válido'
      });
      return;
    }

    const estadoValido = newEstado as reparacionInterface["estado"];
    setIsUpdating(true);

    try {
      const response = await ReparacionService.updateEstadoReparacion(
        reparacion.id_reparacion,
        estadoValido
      );

      const isSuccess = response.success ||
                       response.message?.toLowerCase().includes('actualizado') ||
                       response.message?.toLowerCase().includes('correctamente');

      if (isSuccess) {
        setCurrentEstado(estadoValido);
        await Swal.fire({
          icon: 'success',
          title: 'Éxito',
          text: response.message || 'Estado actualizado correctamente',
          timer: 2000,
          showConfirmButton: false
        });
        onStatusUpdate?.();
      } else {
        throw new Error(response.message || 'Error al actualizar el estado');
      }
    } catch (error: any) {
      await Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error.response?.data?.message || error.message || 'Error al actualizar el estado'
      });
    } finally {
      setIsUpdating(false);
    }
  };

  const formatPrice = (costo: number) => {
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      minimumFractionDigits: 0,
    }).format(costo);
  };

  return (
    <div className="bg-white border rounded-lg p-3 sm:p-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex-1 min-w-0">
        <h3 className="font-semibold text-sm sm:text-base text-gray-900 truncate">{reparacion.dispositivo}</h3>
        {reparacion.observaciones && (
          <p className="text-xs sm:text-sm text-gray-600 mt-1 line-clamp-2">{reparacion.observaciones}</p>
        )}
        {reparacion.id_reparacion && (
          <p className="text-xs text-gray-500 mt-1">ID: #{reparacion.id_reparacion}</p>
        )}
      </div>
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-4">
        <select
          value={currentEstado}
          onChange={(e) => handleStatusChange(e.target.value)}
          disabled={isUpdating}
          className={`px-3 py-2 sm:py-1 border rounded-md text-xs sm:text-sm focus:ring-2 focus:ring-[#57ad63] outline-none w-full sm:w-auto ${
            isUpdating ? "bg-gray-100 cursor-not-allowed" : ""
          }`}
        >
          {estadosValidos.map((estado) => (
            <option key={estado} value={estado}>
              {estado}
            </option>
          ))}
        </select>
        {reparacion.costo > 0 && (
          <span className="font-semibold text-xs sm:text-sm text-gray-900 whitespace-nowrap text-center sm:text-left">
            {formatPrice(reparacion.costo)}
          </span>
        )}
      </div>
    </div>
  );
}

