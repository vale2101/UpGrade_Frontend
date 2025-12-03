"use client";

import { useState, useEffect } from "react";
import { PedidoService } from "../services/pedidoService";
import { PedidoInterface, PedidoProducto } from "../interfaces/pedido.interface";


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

function normalizePedido(pedido: any): PedidoInterface {
  return {
    ...pedido,
    productos: normalizeProductos(pedido.productos)
  };
}

export function useAdministradorOrders() {
  const [pedidos, setPedidos] = useState<PedidoInterface[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadPedidos = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await PedidoService.getPedidos();

        if (response.success && response.data) {
          const normalizedPedidos = response.data.map(normalizePedido);
          setPedidos(normalizedPedidos);
        } else {
          setError(response.message || "Error al cargar los pedidos");
          setPedidos([]);
        }
      } catch (err: any) {
        setError(err.message || "Error inesperado al cargar los pedidos");
        setPedidos([]);
      } finally {
        setLoading(false);
      }
    };

    loadPedidos();
  }, []);

  const refetch = async () => {
    try {
      setError(null);

      const response = await PedidoService.getPedidos();

      if (response.success && response.data) {
        const normalizedPedidos = response.data.map(normalizePedido);
        setPedidos(normalizedPedidos);
      } else {
        setError(response.message || "Error al cargar los pedidos");
        setPedidos([]);
      }
    } catch (err: any) {
      setError(err.message || "Error inesperado al cargar los pedidos");
      setPedidos([]);
    }
  };

  return {
    pedidos,
    loading,
    error,
    refetch
  };
}

