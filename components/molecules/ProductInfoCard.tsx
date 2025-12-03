"use client";

import { useIsStaff } from "../../hooks/useIsStaff";

interface ProductInfoCardProps {
  product: any;
  quantity: number;
  setQuantity: (q: number) => void;
  addedToCart: boolean;
  onAddToCart: () => void;
}

export default function ProductInfoCard({ product, quantity, setQuantity, addedToCart, onAddToCart }: ProductInfoCardProps) {
  const { isStaff } = useIsStaff();
  return (
    <div className="space-y-4 sm:space-y-6">
      <div>
        <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-1 sm:space-y-0 sm:space-x-2 mb-2">
          <span className="text-sm font-semibold text-gray-600">{product.brand}</span>
          <span className="text-sm text-green-600 font-medium">Disponible</span>
        </div>
        <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">{product.name}</h1>
        
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600">Descuento {product.discount} IVA incluido</span>
          </div>
          <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-1 sm:space-y-0 sm:space-x-2">
            <span className="text-2xl sm:text-3xl font-bold text-gray-900">{product.currentPrice}</span>
            <span className="text-lg text-gray-500 line-through">{product.originalPrice}</span>
          </div>
          <div className="text-sm text-gray-600">
            {product.installments} cuotas 0% interés {product.monthlyAmount}*
          </div>
        </div>

        <div className="mt-4 p-3 bg-yellow-100 border border-red-300 rounded-lg">
          <div className="flex items-center space-x-2">
            <svg className="w-5 h-5 text-red-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd" />
            </svg>
            <span className="text-xs sm:text-sm font-semibold text-red-800">¡BAJÓ DE PRECIO! APROVECHA AHORA</span>
          </div>
        </div>
      </div>

      {!isStaff && (
        <>
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Cantidad:</label>
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50"
              >-</button>
              <span className="text-lg font-medium w-8 text-center">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50"
              >+</button>
            </div>
          </div>

          <button
            onClick={onAddToCart}
            className={`w-full font-bold py-4 px-6 rounded-lg transition-colors ${
              addedToCart ? 'bg-green-500 text-white' : 'bg-yellow-400 hover:bg-yellow-500 text-black'
            }`}
          >
            {addedToCart ? '✓ AGREGADO AL CARRITO' : 'AÑADIR AL CARRITO'}
          </button>
          
          {addedToCart && (
            <div className="mt-2 text-center">
              <p className="text-green-600 text-sm font-medium">
                ¡Producto agregado al carrito! ({quantity} unidad{quantity !== 1 ? 'es' : ''})
              </p>
            </div>
          )}
        </>
      )}
    </div>
  );
}

