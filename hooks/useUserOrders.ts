"use client";
import { useState, useEffect } from "react";
import { useAuth } from "./useAuthContext";
import { PedidoService } from "../services/pedidoService";
import { PedidoInterface, PedidoProducto } from "../interfaces/pedido.interface";

/**
 * Normaliza el campo productos de un pedido
 * Puede venir como array, string JSON, o null/undefined
 */
function normalizeProductos(productos: any): PedidoProducto[] {
  if (!productos) {
    return [];
  }

  // Si ya es un array, retornarlo
  if (Array.isArray(productos)) {
    return productos;
  }

  // Si es un string, intentar parsearlo como JSON
  if (typeof productos === 'string') {
    try {
      const parsed = JSON.parse(productos);
      if (Array.isArray(parsed)) {
        return parsed;
      }
      // Si el JSON parseado no es un array, retornar array vacío
      return [];
    } catch {
      // Si falla el parseo, retornar array vacío
      return [];
    }
  }

  // Si es un objeto único, convertirlo a array
  if (typeof productos === 'object') {
    return [productos];
  }

  return [];
}

/**
 * Normaliza un pedido para asegurar que productos sea siempre un array
 */
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
          // Si hay datos, normalizarlos. Si no hay datos (array vacío), está bien para usuarios nuevos
          if (response.data) {
            const normalizedPedidos = response.data.map(normalizePedido);
            setPedidos(normalizedPedidos);
          } else {
            // Si no hay datos pero fue exitoso (como un 404 manejado), mostrar lista vacía
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
        // Si hay datos, normalizarlos. Si no hay datos (array vacío), está bien para usuarios nuevos
        if (response.data) {
          const normalizedPedidos = response.data.map(normalizePedido);
          setPedidos(normalizedPedidos);
        } else {
          // Si no hay datos pero fue exitoso (como un 404 manejado), mostrar lista vacía
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

