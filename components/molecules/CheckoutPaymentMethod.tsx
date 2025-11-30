"use client";

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

interface CheckoutPaymentMethodProps {
  selectedMethod: string | null;
  onMethodSelect: (methodId: string) => void;
  className?: string;
}

export default function CheckoutPaymentMethod({ 
  selectedMethod, 
  onMethodSelect,
  className = "" 
}: CheckoutPaymentMethodProps) {
  return (
    <div className={`bg-white rounded-lg shadow-md p-4 sm:p-6 ${className}`}>
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Método de pago</h3>
      <div className="space-y-3">
        {paymentMethods.map((method) => (
          <button
            key={method.id}
            onClick={() => onMethodSelect(method.id)}
            className={`w-full text-left p-4 border-2 rounded-lg transition-colors ${
              selectedMethod === method.id
                ? 'border-black bg-gray-50'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                selectedMethod === method.id
                  ? 'border-black'
                  : 'border-gray-300'
              }`}>
                {selectedMethod === method.id && (
                  <div className="w-2 h-2 bg-black rounded-full" />
                )}
              </div>
              <span className="text-xl mr-2">{method.icon}</span>
              <div className="flex-1">
                <p className="font-medium text-gray-900">{method.name}</p>
                {method.description && (
                  <p className="text-sm text-gray-600 mt-1">{method.description}</p>
                )}
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

