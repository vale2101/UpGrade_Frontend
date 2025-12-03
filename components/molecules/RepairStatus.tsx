"use client";

import { useUserActiveRepairs } from "../../hooks/useUserActiveRepairs";
import { reparacionInterface } from "../../interfaces/reparacion.interface";
import LoadingState from "../atoms/LoadingState";

const REPAIR_STATUSES = [
  { key: "Recibido", label: "Recibido" },
  { key: "Revisión", label: "En revisión" },
  { key: "Reparación", label: "En reparación" },
  { key: "Reparado", label: "Reparado" }
];

const getStatusIndex = (estado: reparacionInterface["estado"]): number => {
  switch (estado) {
    case "Recibido":
      return 0;
    case "Revisión":
      return 1;
    case "Reparación":
      return 2;
    case "Reparado":
      return 3;
    default:
      return 0;
  }
};

const formatPrice = (costo: number): string => {
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    minimumFractionDigits: 0,
  }).format(costo);
};

interface RepairProgressBarProps {
  reparacion: reparacionInterface;
}

function RepairProgressBar({ reparacion }: RepairProgressBarProps) {
  const currentIndex = getStatusIndex(reparacion.estado);

  return (
    <div className="mb-4 sm:mb-6 last:mb-0">
      <div className="mb-3 sm:mb-4 pb-3 sm:pb-4 border-b border-gray-200">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-2">
          <div className="flex-1">
            <h3 className="font-semibold text-base sm:text-lg text-gray-900">{reparacion.dispositivo}</h3>
            {reparacion.observaciones && (
              <p className="text-xs sm:text-sm text-gray-600 mt-1">{reparacion.observaciones}</p>
            )}
          </div>
          {reparacion.costo > 0 && (
            <div className="text-xs sm:text-sm font-semibold text-gray-900 whitespace-nowrap">
              {formatPrice(reparacion.costo)}
            </div>
          )}
        </div>
        {reparacion.id_reparacion && (
          <p className="text-xs text-gray-500">ID: #{reparacion.id_reparacion}</p>
        )}
      </div>

      <div className="hidden sm:block">
        <ol className="flex items-center justify-between gap-2">
          {REPAIR_STATUSES.map((status, idx) => {
            const isCurrent = idx === currentIndex;
            const reached = idx <= currentIndex;
            return (
              <li key={status.key} className="flex-1 flex items-center">
                <div className={`flex items-center gap-2 sm:gap-3 w-full`}>
                  <div className={`h-8 w-8 sm:h-10 sm:w-10 rounded-full flex items-center justify-center text-xs sm:text-sm font-semibold flex-shrink-0 ${
                    isCurrent ? "bg-[#fb64b6] text-white" : reached ? "bg-[#57ad63] text-white" : "bg-gray-200 text-gray-600"
                  }`}>
                    {idx + 1}
                  </div>
                  <span className={`text-xs sm:text-sm whitespace-nowrap ${reached ? "text-black" : "text-gray-500"}`}>
                    {status.label}
                  </span>
                </div>
                {idx < REPAIR_STATUSES.length - 1 && (
                  <div className={`h-[2px] flex-1 mx-1 sm:mx-2 ${idx < currentIndex ? "bg-[#57ad63]" : "bg-gray-200"}`}></div>
                )}
              </li>
            );
          })}
        </ol>
      </div>

      <div className="sm:hidden space-y-4">
        {REPAIR_STATUSES.map((status, idx) => {
          const isCurrent = idx === currentIndex;
          const reached = idx <= currentIndex;
          return (
            <div key={status.key} className="flex items-start gap-3">
              <div className="flex flex-col items-center">
                <div className={`h-10 w-10 rounded-full flex items-center justify-center text-sm font-semibold flex-shrink-0 ${
                  isCurrent ? "bg-[#fb64b6] text-white" : reached ? "bg-[#57ad63] text-white" : "bg-gray-200 text-gray-600"
                }`}>
                  {idx + 1}
                </div>
                {idx < REPAIR_STATUSES.length - 1 && (
                  <div className={`w-[2px] h-8 sm:h-12 mt-2 ${idx < currentIndex ? "bg-[#57ad63]" : "bg-gray-200"}`}></div>
                )}
              </div>
              <div className="flex-1 pt-1">
                <span className={`text-sm font-medium block ${reached ? "text-black" : "text-gray-500"}`}>
                  {status.label}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function RepairStatus() {
  const { reparaciones, loading, error } = useUserActiveRepairs();

  if (loading) {
    return <LoadingState message="Cargando estado de reparaciones..." />;
  }

  if (error) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 sm:p-6 text-center text-sm sm:text-base text-red-600">
        {error}
      </div>
    );
  }

  if (reparaciones.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 sm:p-6 text-center text-sm sm:text-base text-gray-600">
        No tienes reparaciones en proceso actualmente.
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 sm:p-6">
      <div className="mb-4 sm:mb-6">
        <h2 className="text-lg sm:text-xl font-semibold">
          Estado de tus reparaciones
          <span className="ml-1 sm:ml-2 text-xs sm:text-sm font-normal text-gray-500 block sm:inline">
            ({reparaciones.length} {reparaciones.length === 1 ? 'reparación' : 'reparaciones'})
          </span>
        </h2>
      </div>

      <div className="space-y-4 sm:space-y-6">
        {reparaciones.map((reparacion) => (
          <RepairProgressBar 
            key={reparacion.id_reparacion || `rep-${reparacion.dispositivo}`} 
            reparacion={reparacion} 
          />
        ))}
      </div>
    </div>
  );
}
