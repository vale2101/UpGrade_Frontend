"use client";
import BackToUserButton from "../atoms/BackToUserButton";
import OrderDetailHeader from "../molecules/OrderDetailHeader";
import OrderDetailAddress from "../molecules/OrderDetailAddress";
import OrderDetailProductsList from "../molecules/OrderDetailProductsList";
import OrderDetailSummary from "../molecules/OrderDetailSummary";
import { useOrderDetail } from "../../hooks/useOrderDetail";

interface OrderDetailSectionProps {
  orderId: string;
}

export default function OrderDetailSection({ orderId }: OrderDetailSectionProps) {
  const { pedido, loading, error } = useOrderDetail(orderId);

  // Log para depuración
  if (pedido) {
    console.log("Pedido cargado:", pedido);
    console.log("ID de dirección del pedido:", pedido.id_direccion);
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-4 sm:py-8">
        <div className="max-w-7xl mx-auto px-4">
          <BackToUserButton />
          <div className="mt-6 space-y-4">
            <div className="h-32 bg-white rounded-lg shadow-md animate-pulse" />
            <div className="h-48 bg-white rounded-lg shadow-md animate-pulse" />
          </div>
        </div>
      </div>
    );
  }

  if (error || !pedido) {
    return (
      <div className="min-h-screen bg-gray-50 py-4 sm:py-8">
        <div className="max-w-7xl mx-auto px-4">
          <BackToUserButton />
          <div className="mt-6 bg-white rounded-lg shadow-md p-6 text-center">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Error al cargar el pedido</h2>
            <p className="text-gray-600">{error || "Pedido no encontrado"}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-4 sm:py-8">
      <div className="max-w-7xl mx-auto px-4">
        <BackToUserButton />
        
        <div className="mt-6 mb-6">
          <OrderDetailHeader pedido={pedido} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <OrderDetailAddress addressId={pedido.id_direccion} />
            <OrderDetailProductsList productos={pedido.productos || []} />
          </div>

          <div className="lg:col-span-1">
            <OrderDetailSummary pedido={pedido} />
          </div>
        </div>
      </div>
    </div>
  );
}

