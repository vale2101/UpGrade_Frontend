"use client";

import { useMemo } from "react";
import { useUserRepairs } from "../../hooks/useUserRepairs";
import LoadingState from "../atoms/LoadingState";
import { reparacionInterface } from "../../interfaces/reparacion.interface";

interface ServiceHistoryItem {
  id: string;
  date: string;
  device: string;
  service: string;
  status: string;
  amount?: string;
}

const formatPrice = (costo: number): string => {
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    minimumFractionDigits: 0,
  }).format(costo);
};

// Función para mapear reparaciones a items del historial
const mapReparacionToHistoryItem = (reparacion: reparacionInterface & { fecha?: string; fecha_creacion?: string; created_at?: string }): ServiceHistoryItem => {
  // Intentar extraer fecha del objeto (puede venir en diferentes campos)
  let date = new Date().toISOString();
  
  // Buscar cualquier campo que pueda contener una fecha
  const fechaFields = ['fecha', 'fecha_creacion', 'created_at', 'fecha_reparacion'];
  for (const field of fechaFields) {
    if ((reparacion as any)[field]) {
      try {
        const fechaValue = (reparacion as any)[field];
        if (fechaValue) {
          date = new Date(fechaValue).toISOString();
          break;
        }
      } catch {
        // Si no se puede parsear, usar fecha actual
      }
    }
  }

  return {
    id: reparacion.id_reparacion?.toString() || "",
    date: date,
    device: reparacion.dispositivo,
    service: reparacion.observaciones || "Reparación de dispositivo",
    status: reparacion.estado,
    amount: reparacion.costo > 0 ? formatPrice(reparacion.costo) : undefined,
  };
};

export default function ServiceHistory() {
  const { reparaciones, loading, error } = useUserRepairs();

  // Mapear reparaciones a items del historial
  const items = useMemo(() => {
    return reparaciones.map(mapReparacionToHistoryItem);
  }, [reparaciones]);

  if (loading) {
    return <LoadingState message="Cargando historial de servicios..." />;
  }

  if (error) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 text-center text-red-600">
        {error}
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 text-center text-gray-600">
        No tienes historial de servicios todavía.
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100">
      <div className="px-4 sm:px-6 py-3 sm:py-4 border-b text-xs sm:text-sm text-gray-600 font-medium">
        Historial de servicios
      </div>
      <ul className="divide-y">
        {items.map(item => (
          <li key={item.id} className="px-4 sm:px-6 py-3 sm:py-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4 md:gap-6">
            <div className="text-xs sm:text-sm text-gray-500 w-full sm:w-32 md:w-40 shrink-0">
              {new Date(item.date).toLocaleDateString()}
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-medium text-sm sm:text-base truncate">{item.device}</div>
              <div className="text-xs sm:text-sm text-gray-600 mt-1 line-clamp-2">{item.service}</div>
            </div>
            <div className="flex items-center gap-2 sm:gap-4 shrink-0">
              <div className="text-xs sm:text-sm">
                <span className={`px-2 py-1 rounded-full whitespace-nowrap ${
                  /reparado|entregado/i.test(item.status) ? "bg-[#57ad63] text-white" : 
                  /cancelado/i.test(item.status) ? "bg-gray-500 text-white" : 
                  "bg-[#fb64b61a] text-[#fb64b6]"
                }`}>{item.status}</span>
              </div>
              {item.amount && (
                <div className="text-xs sm:text-sm font-semibold whitespace-nowrap">
                  {item.amount}
                </div>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
