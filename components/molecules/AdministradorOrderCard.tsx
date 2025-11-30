"use client";

import { useState } from "react";
import { Calendar, Package } from "lucide-react";
import { PedidoInterface } from "../../interfaces/pedido.interface";
import { PedidoService } from "../../services/pedidoService";
import UserOrderStatusBadge from "./UserOrderStatusBadge";
import Swal from "sweetalert2";

interface AdministradorOrderCardProps {
  pedido: PedidoInterface;
  onStatusUpdate?: () => void;
  className?: string;
}

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
};

const formatDate = (dateString?: string) => {
  if (!dateString) return 'Fecha no disponible';
  try {
    return new Date(dateString).toLocaleDateString('es-ES', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  } catch {
    return dateString;
  }
};

type EstadoPedido = 'Pendiente' | 'Pagado' | 'Enviado' | 'Entregado' | 'Cancelado';

export default function AdministradorOrderCard({ 
  pedido, 
  onStatusUpdate,
  className = "" 
}: AdministradorOrderCardProps) {
  const [isUpdating, setIsUpdating] = useState(false);
  const [currentEstado, setCurrentEstado] = useState<EstadoPedido>(pedido.estado || 'Pendiente');

  let productos: any[] = [];
  if (Array.isArray(pedido.productos)) {
    productos = pedido.productos;
  } else if (pedido.productos && typeof pedido.productos === 'string') {
    try {
      const parsed = JSON.parse(pedido.productos);
      productos = Array.isArray(parsed) ? parsed : [];
    } catch {
      productos = [];
    }
  } else if (pedido.productos && typeof pedido.productos === 'object') {
    productos = [pedido.productos];
  }

  const totalItems = productos.reduce((sum, producto) => sum + (producto?.cantidad || 0), 0);
  const total = pedido.total || 0;

  const handleStatusChange = async (newEstado: string) => {
    if (!pedido.id_pedido) return;

    const estadosValidos: EstadoPedido[] = ['Pendiente', 'Pagado', 'Enviado', 'Entregado', 'Cancelado'];
    if (!estadosValidos.includes(newEstado as EstadoPedido)) {
      await Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Estado no válido'
      });
      return;
    }

    const estadoValido = newEstado as EstadoPedido;
    setIsUpdating(true);
    try {
      const response = await PedidoService.updatePedido(pedido.id_pedido, {
        estado: estadoValido
      } as { estado: EstadoPedido });

      const isSuccess = response.success || 
                       response.message?.toLowerCase().includes('actualizado') ||
                       response.message?.toLowerCase().includes('correctamente');

      if (isSuccess) {
        setCurrentEstado(estadoValido);
        await Swal.fire({
          icon: 'success',
          title: 'Éxito',
          text: response.message || 'Pedido actualizado correctamente',
          timer: 2000,
          showConfirmButton: false
        });
        if (onStatusUpdate) {
          await onStatusUpdate();
        }
      } else {
        throw new Error(response.message || 'Error al actualizar el estado');
      }
    } catch (error: any) {
      const errorMessage = error?.response?.data?.message || error.message || 'No se pudo actualizar el estado del pedido';
      const isSuccessMessage = errorMessage.toLowerCase().includes('actualizado') || 
                               errorMessage.toLowerCase().includes('correctamente');

      if (isSuccessMessage) {
        setCurrentEstado(estadoValido);
        await Swal.fire({
          icon: 'success',
          title: 'Éxito',
          text: errorMessage,
          timer: 2000,
          showConfirmButton: false
        });
        if (onStatusUpdate) {
          await onStatusUpdate();
        }
      } else {
        await Swal.fire({
          icon: 'error',
          title: 'Error',
          text: errorMessage
        });
      }
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className={`bg-white border border-gray-200 rounded-lg p-4 sm:p-6 hover:shadow-md transition-shadow ${className}`}>
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div className="flex-1 space-y-3">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="font-semibold text-gray-900 text-lg">
                Pedido #{pedido.id_pedido || 'N/A'}
              </h3>
              <div className="flex items-center gap-2 mt-1 text-sm text-gray-600">
                <Calendar size={14} />
                <span>{formatDate(pedido.fecha)}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-2 text-gray-700">
              <Package size={16} className="text-gray-400" />
              <span className="text-gray-600">
                <strong className="text-gray-900">{totalItems}</strong> {totalItems === 1 ? 'producto' : 'productos'}
              </span>
            </div>
            <span className="text-gray-400">•</span>
            <span className="font-semibold text-lg text-gray-900">
              {formatPrice(total)}
            </span>
          </div>
        </div>

        <div className="flex flex-col items-start lg:items-end gap-3 lg:min-w-[200px]">
          <UserOrderStatusBadge estado={currentEstado} />
          
          <select 
            value={currentEstado}
            onChange={(e) => handleStatusChange(e.target.value)}
            disabled={isUpdating}
            className="w-full lg:w-auto px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#57ad63] focus:border-[#57ad63] outline-none bg-white disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <option value="Pendiente">Pendiente</option>
            <option value="Pagado">Pagado</option>
            <option value="Enviado">Enviado</option>
            <option value="Entregado">Entregado</option>
            <option value="Cancelado">Cancelado</option>
          </select>
        </div>
      </div>
    </div>
  );
}

