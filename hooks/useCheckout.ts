"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "../contexts/CartContext";
import { useAuth } from "./useAuthContext";
import { PedidoService } from "../services/pedidoService";
import { PedidoInterface, PedidoProducto } from "../interfaces/pedido.interface";

export function useCheckout() {
  const router = useRouter();
  const { items, getTotalPrice, clearCart } = useCart();
  const { user } = useAuth();
  const [selectedAddressId, setSelectedAddressId] = useState<number | null>(null);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAddressSelect = (addressId: number) => {
    setSelectedAddressId(addressId);
    setError(null);
  };

  const handlePaymentMethodSelect = (methodId: string) => {
    setSelectedPaymentMethod(methodId);
    setError(null);
  };

  const handleCreateOrder = async () => {
    if (!user?.id) {
      setError("Debes estar autenticado para realizar un pedido");
      return;
    }

    if (!selectedAddressId) {
      setError("Debes seleccionar una dirección de entrega");
      return;
    }

    if (!selectedPaymentMethod) {
      setError("Debes seleccionar un método de pago");
      return;
    }

    if (items.length === 0) {
      setError("Tu carrito está vacío");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Convertir items del carrito a productos del pedido
      const productos: PedidoProducto[] = items.map((item) => {
        // Extraer el precio numérico del string formateado
        const priceString = item.price.replace(/[^0-9]/g, '');
        const precio = parseFloat(priceString) || 0;

        return {
          id_producto: parseInt(item.id, 10),
          cantidad: item.quantity,
          precio: precio
        };
      });

      const total = getTotalPrice();

      const pedidoData: PedidoInterface = {
        id_user: parseInt(user.id, 10),
        id_direccion: selectedAddressId,
        productos: productos,
        total: total,
        estado: 'Pendiente'
      };

      const response = await PedidoService.createPedido(pedidoData);

      if (response.success && response.data) {
        // Limpiar el carrito
        clearCart();
        
        // Redirigir a la página principal con mensaje de éxito
        router.push('/?pedido=exitoso');
      } else {
        setError(response.message || "Error al crear el pedido");
      }
    } catch (err: any) {
      console.error("Error al crear el pedido:", err);
      setError(err.response?.data?.message || "Error inesperado al crear el pedido");
    } finally {
      setLoading(false);
    }
  };

  return {
    selectedAddressId,
    selectedPaymentMethod,
    loading,
    error,
    handleAddressSelect,
    handlePaymentMethodSelect,
    handleCreateOrder
  };
}

