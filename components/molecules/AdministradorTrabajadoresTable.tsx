"use client";

import { Pencil, Trash2 } from "lucide-react";
import { Trabajador } from "../../interfaces/trabajador.interface";

interface AdministradorTrabajadoresTableProps {
  trabajadores: Trabajador[];
  onEdit: (trabajador: Trabajador) => void;
  onDelete: (id: number) => void;
  loading?: boolean;
}

export default function AdministradorTrabajadoresTable({ 
  trabajadores, 
  onEdit, 
  onDelete,
  loading = false 
}: AdministradorTrabajadoresTableProps) {
  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="h-6 bg-gray-200 rounded animate-pulse w-48 mx-auto mb-4" />
        <div className="h-4 bg-gray-200 rounded animate-pulse w-64 mx-auto" />
      </div>
    );
  }

  if (trabajadores.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        No hay trabajadores registrados
      </div>
    );
  }

  return (
    <div className="overflow-x-auto -mx-4 sm:mx-0">
      <table className="w-full min-w-[640px]">
        <thead className="bg-gray-50 border-b">
          <tr>
            <th className="px-2 sm:px-4 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase">Nombre</th>
            <th className="px-2 sm:px-4 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase">Apellido</th>
            <th className="px-2 sm:px-4 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase">Correo</th>
            <th className="px-2 sm:px-4 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase hidden md:table-cell">Teléfono</th>
            <th className="px-2 sm:px-4 py-2 sm:py-3 text-right text-xs font-medium text-gray-500 uppercase">Acciones</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y">
          {trabajadores.map(trabajador => (
            <tr key={trabajador.id_trabajador} className="hover:bg-gray-50">
              <td className="px-2 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm font-medium text-gray-900">{trabajador.nombre}</td>
              <td className="px-2 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm text-gray-700">{trabajador.apellido}</td>
              <td className="px-2 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm text-gray-700">{trabajador.correo}</td>
              <td className="px-2 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm text-gray-700 hidden md:table-cell">{trabajador.telefono || "-"}</td>
              <td className="px-2 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm text-right">
                <div className="flex items-center justify-end gap-2">
                  <button 
                    onClick={() => onEdit(trabajador)}
                    className="text-[#57ad63] hover:text-[#459a52] p-1"
                    aria-label="Editar"
                  >
                    <Pencil size={14} className="sm:w-4 sm:h-4" />
                  </button>
                  <button 
                    onClick={() => trabajador.id_trabajador && onDelete(trabajador.id_trabajador)}
                    className="text-red-600 hover:text-red-700 p-1"
                    aria-label="Eliminar"
                  >
                    <Trash2 size={14} className="sm:w-4 sm:h-4" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

