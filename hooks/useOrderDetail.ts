"use client";
import { useState, useEffect } from "react";
import { PedidoService } from "../services/pedidoService";
import { PedidoInterface, PedidoProducto } from "../interfaces/pedido.interface";

/**
 * Normaliza el campo productos de un pedido
 */
function normalizeProductos(productos: any): PedidoProducto[] {
  if (!productos) {
    return [];
  }

  if (Array.isArray(productos)) {
    return productos;
  }

  if (typeof productos === 'string') {
    try {
      const parsed = JSON.parse(productos);
      if (Array.isArray(parsed)) {
        return parsed;
      }
      return [];
    } catch {
      return [];
    }
  }

  if (typeof productos === 'object') {
    return [productos];
  }

  return [];
}

export function useOrderDetail(orderId: number | string | null) {
  const [pedido, setPedido] = useState<PedidoInterface | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadPedido = async () => {
      if (!orderId) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);

        const id = typeof orderId === "string" ? parseInt(orderId) : orderId;
        
        if (isNaN(id)) {
          setError("ID de pedido inválido");
          setLoading(false);
          return;
        }

        const response = await PedidoService.getPedidoById(id);

        if (response.success && response.data) {
          // Normalizar el pedido para asegurar que productos sea un array
          const normalizedPedido = {
            ...response.data,
            productos: normalizeProductos(response.data.productos)
          };
          setPedido(normalizedPedido);
        } else {
          setError(response.message || "Pedido no encontrado");
          setPedido(null);
        }
      } catch (err: any) {
        console.error("Error al cargar pedido:", err);
        setError(err.response?.data?.message || "Error inesperado al cargar el pedido");
        setPedido(null);
      } finally {
        setLoading(false);
      }
    };

    loadPedido();
  }, [orderId]);

  return {
    pedido,
    loading,
    error
  };
}

