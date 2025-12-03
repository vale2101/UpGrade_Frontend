"use client";

import { direccionInterface } from "../../interfaces/direccion.interface";
import BackToHomeButton from "../atoms/BackToHomeButton";
import Button from "../atoms/Button";
import OrderConfirmationAddressCard from "../molecules/OrderConfirmationAddressCard";
import OrderConfirmationPaymentCard from "../molecules/OrderConfirmationPaymentCard";
import OrderConfirmationProductsCard from "../molecules/OrderConfirmationProductsCard";
import OrderConfirmationSummaryCard from "../molecules/OrderConfirmationSummaryCard";

interface OrderDetailItem {
  id: string;
  name: string;
  image: string;
  price: string;
  quantity: number;
  condition: string;
  capacity: string;
  color: string;
}

interface OrderConfirmationSectionProps {
  address: direccionInterface;
  paymentMethodId: string;
  items: OrderDetailItem[];
  subtotal: number;
  shipping?: number;
  tax?: number;
  total: number;
  loading?: boolean;
  onConfirm: () => void;
  onBack: () => void;
}

export default function OrderConfirmationSection({
  address,
  paymentMethodId,
  items,
  subtotal,
  shipping = 0,
  tax = 0,
  total,
  loading = false,
  onConfirm,
  onBack
}: OrderConfirmationSectionProps) {
  return (
    <div className="min-h-screen bg-gray-50 py-4 sm:py-8">
      <div className="max-w-7xl mx-auto px-4">
        <BackToHomeButton />
        
        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Confirmar Pedido</h1>
          <p className="text-gray-600 mt-2">Revisa los detalles de tu pedido antes de confirmar</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <OrderConfirmationAddressCard address={address} />
            <OrderConfirmationPaymentCard paymentMethodId={paymentMethodId} />
            <OrderConfirmationProductsCard items={items} />
          </div>

          <div className="lg:col-span-1">
            <OrderConfirmationSummaryCard 
              subtotal={subtotal}
              shipping={shipping}
              tax={tax}
              total={total}
            />
            
            <div className="mt-4 space-y-3">
              <Button
                onClick={onConfirm}
                disabled={loading}
                variant="primary"
                size="lg"
                fullWidth
                className="bg-black hover:bg-gray-800"
              >
                {loading ? 'Procesando...' : 'Confirmar y Crear Pedido'}
              </Button>
              
              <Button
                onClick={onBack}
                disabled={loading}
                variant="outline"
                size="lg"
                fullWidth
              >
                Volver a editar
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

