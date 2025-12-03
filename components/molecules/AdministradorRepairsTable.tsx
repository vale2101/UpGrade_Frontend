"use client";

import { useAllRepairsWithDetails, ReparacionWithDetails } from "../../hooks/useAllRepairsWithDetails";
import LoadingState from "../atoms/LoadingState";
import EmptyTableState from "../atoms/EmptyTableState";

const formatPrice = (costo: number): string => {
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    minimumFractionDigits: 0,
  }).format(costo);
};

const getEstadoBadgeColor = (estado: string) => {
  switch (estado) {
    case "Recibido":
      return "bg-blue-100 text-blue-800";
    case "Revisión":
      return "bg-yellow-100 text-yellow-800";
    case "Reparación":
      return "bg-purple-100 text-purple-800";
    case "Reparado":
      return "bg-green-100 text-green-800";
    case "Cancelado":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

interface RepairRowProps {
  reparacion: ReparacionWithDetails;
}

function RepairRow({ reparacion }: RepairRowProps) {
  return (
    <tr className="hover:bg-gray-50">
      <td className="px-2 sm:px-4 py-3 text-xs sm:text-sm text-gray-900">
        #{reparacion.id_reparacion || "N/A"}
      </td>
      <td className="px-2 sm:px-4 py-3 text-xs sm:text-sm text-gray-900">
        {reparacion.cliente ? (
          <div>
            <div className="font-medium">
              {reparacion.cliente.nombre} {reparacion.cliente.apellido}
            </div>
            <div className="text-xs text-gray-500">{reparacion.cliente.correo}</div>
          </div>
        ) : (
          <span className="text-gray-400">Cliente no encontrado (ID: {reparacion.id_user})</span>
        )}
      </td>
      <td className="px-2 sm:px-4 py-3 text-xs sm:text-sm text-gray-900">
        {reparacion.trabajador ? (
          <div>
            <div className="font-medium">
              {reparacion.trabajador.nombre} {reparacion.trabajador.apellido}
            </div>
            <div className="text-xs text-gray-500">{reparacion.trabajador.correo}</div>
          </div>
        ) : (
          <span className="text-gray-400">Trabajador no encontrado (ID: {reparacion.id_trabajador})</span>
        )}
      </td>
      <td className="px-2 sm:px-4 py-3 text-xs sm:text-sm text-gray-900 font-medium">
        {reparacion.dispositivo}
      </td>
      <td className="px-2 sm:px-4 py-3 text-xs sm:text-sm">
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getEstadoBadgeColor(reparacion.estado)}`}>
          {reparacion.estado}
        </span>
      </td>
      <td className="px-2 sm:px-4 py-3 text-xs sm:text-sm text-gray-700 hidden md:table-cell">
        {reparacion.observaciones || (
          <span className="text-gray-400 italic">Sin observaciones</span>
        )}
      </td>
      <td className="px-2 sm:px-4 py-3 text-xs sm:text-sm text-gray-900 font-medium">
        {reparacion.costo > 0 ? formatPrice(reparacion.costo) : "-"}
      </td>
    </tr>
  );
}

function RepairCard({ reparacion }: RepairRowProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 space-y-3">
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1 min-w-0">
          <div className="text-xs text-gray-500 mb-1">ID: #{reparacion.id_reparacion || "N/A"}</div>
          <h3 className="font-semibold text-sm sm:text-base text-gray-900 truncate">{reparacion.dispositivo}</h3>
        </div>
        <span className={`px-2 py-1 rounded-full text-xs font-medium whitespace-nowrap flex-shrink-0 ${getEstadoBadgeColor(reparacion.estado)}`}>
          {reparacion.estado}
        </span>
      </div>
      
      <div className="grid grid-cols-1 gap-2 text-xs sm:text-sm">
        <div>
          <span className="text-gray-500">Cliente: </span>
          {reparacion.cliente ? (
            <span className="text-gray-900">
              {reparacion.cliente.nombre} {reparacion.cliente.apellido}
              <span className="block text-gray-500 text-xs">{reparacion.cliente.correo}</span>
            </span>
          ) : (
            <span className="text-gray-400">No encontrado (ID: {reparacion.id_user})</span>
          )}
        </div>
        
        <div>
          <span className="text-gray-500">Trabajador: </span>
          {reparacion.trabajador ? (
            <span className="text-gray-900">
              {reparacion.trabajador.nombre} {reparacion.trabajador.apellido}
              <span className="block text-gray-500 text-xs">{reparacion.trabajador.correo}</span>
            </span>
          ) : (
            <span className="text-gray-400">No encontrado (ID: {reparacion.id_trabajador})</span>
          )}
        </div>
        
        {reparacion.observaciones && (
          <div>
            <span className="text-gray-500">Observaciones: </span>
            <span className="text-gray-900">{reparacion.observaciones}</span>
          </div>
        )}
        
        {reparacion.costo > 0 && (
          <div>
            <span className="text-gray-500">Costo: </span>
            <span className="text-gray-900 font-semibold">{formatPrice(reparacion.costo)}</span>
          </div>
        )}
      </div>
    </div>
  );
}

export default function AdministradorRepairsTable() {
  const { reparaciones, loading, error } = useAllRepairsWithDetails();

  if (loading) {
    return <LoadingState message="Cargando reparaciones..." />;
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600 text-lg mb-2">Error al cargar las reparaciones</p>
        <p className="text-gray-400 text-sm">{error}</p>
      </div>
    );
  }

  if (reparaciones.length === 0) {
    return <EmptyTableState message="No hay reparaciones registradas" />;
  }

  return (
    <>
      <div className="lg:hidden space-y-3">
        {reparaciones.map((reparacion) => (
          <RepairCard key={reparacion.id_reparacion || `rep-${reparacion.dispositivo}`} reparacion={reparacion} />
        ))}
      </div>

      <div className="hidden lg:block overflow-x-auto -mx-4 sm:mx-0">
        <table className="w-full min-w-[800px]">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-2 sm:px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                ID
              </th>
              <th className="px-2 sm:px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Cliente
              </th>
              <th className="px-2 sm:px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Trabajador
              </th>
              <th className="px-2 sm:px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Dispositivo
              </th>
              <th className="px-2 sm:px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Estado
              </th>
              <th className="px-2 sm:px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Observaciones
              </th>
              <th className="px-2 sm:px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Costo
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y">
            {reparaciones.map((reparacion) => (
              <RepairRow key={reparacion.id_reparacion || `rep-${reparacion.dispositivo}`} reparacion={reparacion} />
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

