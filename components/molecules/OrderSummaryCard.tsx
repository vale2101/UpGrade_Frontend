const formatPrice = (price: number) => {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
};

interface OrderSummaryCardProps {
  total: number;
  onProceedToPayment: () => void;
}

export default function OrderSummaryCard({ total, onProceedToPayment }: OrderSummaryCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 sticky top-4">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Resumen del pedido</h2>
      
      <div className="space-y-3">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Subtotal</span>
          <span className="font-medium">{formatPrice(total)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Envío</span>
          <span className="font-medium text-green-600">Gratis</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Impuestos</span>
          <span className="font-medium">Incluidos</span>
        </div>
        <div className="border-t border-gray-200 pt-3">
          <div className="flex justify-between text-lg font-semibold">
            <span>Total</span>
            <span>{formatPrice(total)}</span>
          </div>
        </div>
      </div>

      <button 
        onClick={onProceedToPayment}
        className="w-full mt-6 bg-black text-white py-3 px-4 rounded-lg hover:bg-gray-800 transition-colors font-medium"
      >
        Proceder al pago
      </button>

      <div className="mt-4 text-center">
        <p className="text-sm text-gray-600">Pago seguro y encriptado</p>
      </div>
    </div>
  );
}

