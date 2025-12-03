"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "../contexts/CartContext";
import { useAuth } from "./useAuthContext";
import { PedidoService } from "../services/pedidoService";
import { PedidoInterface, PedidoProducto } from "../interfaces/pedido.interface";
import { direccionInterface } from "../interfaces/direccion.interface";
import Swal from "sweetalert2";

export function useCheckout() {
  const router = useRouter();
  const { items, getTotalPrice, clearCart } = useCart();
  const { user } = useAuth();
  const [selectedAddressId, setSelectedAddressId] = useState<number | null>(null);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string | null>(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState<direccionInterface | null>(null);
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

  const handleReviewOrder = (address: direccionInterface) => {
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

    setError(null);
    setSelectedAddress(address);
    setShowConfirmation(true);
  };

  const handleBackToCheckout = () => {
    setShowConfirmation(false);
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
      const productos: PedidoProducto[] = items.map((item) => {
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

      const message = (response.message || "").toLowerCase();
      const isSuccess = response.success || 
                       message.includes('creado') ||
                       message.includes('correctamente') ||
                       !!response.data;

      if (isSuccess) {
        let pedidoId: number | undefined;
        
        if (response.data) {
          pedidoId = (response.data as any)?.id_pedido;
        }
        
        if (!pedidoId && (response as any).id_pedido) {
          pedidoId = (response as any).id_pedido;
        }
        
        clearCart();
        
        await Swal.fire({
          icon: "success",
          title: "¡Pedido creado exitosamente!",
          html: `
            <div style="text-align: left; padding: 10px 0;">
              <p style="color: #374151; margin-bottom: 12px; font-size: 16px;">
                Tu pedido ha sido creado correctamente.
              </p>
              ${pedidoId ? `
                <div style="background-color: #f3f4f6; padding: 12px; border-radius: 8px; margin-top: 12px;">
                  <p style="color: #6b7280; font-size: 14px; margin: 0 0 4px 0;">ID del pedido:</p>
                  <p style="color: #111827; font-size: 18px; font-weight: bold; margin: 0;">#${pedidoId}</p>
                </div>
              ` : ''}
            </div>
          `,
          showConfirmButton: true,
          confirmButtonText: "OK",
          confirmButtonColor: "#57ad63",
          iconColor: "#57ad63",
          width: "400px",
        }).then(() => {
          router.push('/user');
        });
      } else {
        const errorMessage = response.message || "Error al crear el pedido";
        setError(errorMessage);
        await Swal.fire({
          icon: "error",
          title: "Error",
          text: errorMessage,
          confirmButtonColor: "#dc2626",
        });
      }
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || err.message || "Error inesperado al crear el pedido";
      setError(errorMessage);
      
      await Swal.fire({
        icon: "error",
        title: "Error",
        text: errorMessage,
        confirmButtonColor: "#dc2626",
      });
    } finally {
      setLoading(false);
    }
  };

  return {
    selectedAddressId,
    selectedPaymentMethod,
    selectedAddress,
    showConfirmation,
    loading,
    error,
    handleAddressSelect,
    handlePaymentMethodSelect,
    handleReviewOrder,
    handleBackToCheckout,
    handleCreateOrder
  };
}

