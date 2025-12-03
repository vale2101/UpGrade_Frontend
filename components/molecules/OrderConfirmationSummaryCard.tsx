"use client";

interface OrderConfirmationSummaryCardProps {
  subtotal: number;
  shipping?: number;
  tax?: number;
  total: number;
  className?: string;
}

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
};

export default function OrderConfirmationSummaryCard({ 
  subtotal, 
  shipping = 0, 
  tax = 0, 
  total,
  className = "" 
}: OrderConfirmationSummaryCardProps) {
  return (
    <div className={`bg-white rounded-lg shadow-md p-4 sm:p-6 sticky top-4 ${className}`}>
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Resumen del pedido</h3>
      
      <div className="space-y-3">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Subtotal</span>
          <span className="font-medium">{formatPrice(subtotal)}</span>
        </div>
        
        {shipping > 0 ? (
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Envío</span>
            <span className="font-medium">{formatPrice(shipping)}</span>
          </div>
        ) : (
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Envío</span>
            <span className="font-medium text-green-600">Gratis</span>
          </div>
        )}
        
        {tax > 0 && (
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Impuestos</span>
            <span className="font-medium">{formatPrice(tax)}</span>
          </div>
        )}
        
        <div className="border-t border-gray-200 pt-3">
          <div className="flex justify-between text-lg font-semibold">
            <span>Total</span>
            <span>{formatPrice(total)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

