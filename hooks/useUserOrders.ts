"use client";
import { useState, useEffect } from "react";
import { useAuth } from "./useAuthContext";
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

export function useUserOrders() {
  const { user } = useAuth();
  const [pedidos, setPedidos] = useState<PedidoInterface[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadPedidos = async () => {
      if (!user?.id) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);

        const userId = parseInt(user.id, 10);
        if (isNaN(userId)) {
          setError("ID de usuario inválido");
          setLoading(false);
          return;
        }

        const response = await PedidoService.getPedidosByUserId(userId);

        if (response.success) {
          if (response.data) {
            const normalizedPedidos = response.data.map(normalizePedido);
            setPedidos(normalizedPedidos);
          } else {
            setPedidos([]);
          }
        } else {
          setError(response.message || "Error al cargar los pedidos");
          setPedidos([]);
        }
      } catch (err: any) {
        console.error("Error al cargar pedidos:", err);
        setError(err.message || "Error inesperado al cargar los pedidos");
        setPedidos([]);
      } finally {
        setLoading(false);
      }
    };

    loadPedidos();
  }, [user?.id]);

  const refetch = async () => {
    if (!user?.id) return;

    try {
      setLoading(true);
      setError(null);

      const userId = parseInt(user.id, 10);
      if (isNaN(userId)) {
        setError("ID de usuario inválido");
        setLoading(false);
        return;
      }

      const response = await PedidoService.getPedidosByUserId(userId);

      if (response.success) {
        if (response.data) {
          const normalizedPedidos = response.data.map(normalizePedido);
          setPedidos(normalizedPedidos);
        } else {
          setPedidos([]);
        }
      } else {
        setError(response.message || "Error al cargar los pedidos");
        setPedidos([]);
      }
    } catch (err: any) {
      console.error("Error al cargar pedidos:", err);
      setError(err.message || "Error inesperado al cargar los pedidos");
      setPedidos([]);
    } finally {
      setLoading(false);
    }
  };

  return {
    pedidos,
    loading,
    error,
    refetch
  };
}

