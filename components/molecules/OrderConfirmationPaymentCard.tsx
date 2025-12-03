"use client";

import InfoLabel from "../atoms/InfoLabel";
import InfoValue from "../atoms/InfoValue";

interface PaymentMethod {
  id: string;
  name: string;
  icon: string;
  description?: string;
}

const paymentMethods: PaymentMethod[] = [
  {
    id: "credit-card",
    name: "Tarjeta de Crédito/Débito",
    icon: "💳",
    description: "Visa, Mastercard, American Express"
  },
  {
    id: "bank-transfer",
    name: "Transferencia Bancaria",
    icon: "🏦",
    description: "Pago directo desde tu cuenta"
  },
  {
    id: "cash",
    name: "Efectivo",
    icon: "💵",
    description: "Pago en efectivo"
  },
  {
    id: "paypal",
    name: "PayPal",
    icon: "🔒",
    description: "Pago seguro a través de PayPal"
  }
];

interface OrderConfirmationPaymentCardProps {
  paymentMethodId: string;
  className?: string;
}

export default function OrderConfirmationPaymentCard({
  paymentMethodId,
  className = ""
}: OrderConfirmationPaymentCardProps) {
  const selectedMethod = paymentMethods.find(m => m.id === paymentMethodId);

  if (!selectedMethod) {
    return null;
  }

  return (
    <div className={`bg-white rounded-lg shadow-md p-4 sm:p-6 ${className}`}>
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Método de pago</h3>
      <div className="flex items-start gap-3">
        <span className="text-2xl">{selectedMethod.icon}</span>
        <div className="flex-1">
          <InfoLabel>Método seleccionado</InfoLabel>
          <InfoValue className="block mt-1 font-medium">{selectedMethod.name}</InfoValue>
          {selectedMethod.description && (
            <p className="text-xs sm:text-sm text-gray-600 mt-1">{selectedMethod.description}</p>
          )}
        </div>
      </div>
    </div>
  );
}

