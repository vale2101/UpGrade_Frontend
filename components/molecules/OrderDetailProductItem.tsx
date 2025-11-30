"use client";
import Image from "next/image";
import { useProduct } from "../../hooks/useProduct";
import { PedidoProducto } from "../../interfaces/pedido.interface";
import CartProductDetails from "./CartProductDetails";

interface OrderDetailProductItemProps {
  producto: PedidoProducto;
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

export default function OrderDetailProductItem({ producto, className = "" }: OrderDetailProductItemProps) {
  const { product: productoData, loading } = useProduct(producto.id_producto);

  const subtotal = producto.precio * producto.cantidad;

  return (
    <div className={`flex gap-4 py-4 border-b border-gray-200 last:border-b-0 ${className}`}>
      <div className="flex-shrink-0 w-20 h-20 sm:w-24 sm:h-24 bg-gray-100 rounded-lg overflow-hidden">
        {loading ? (
          <div className="w-full h-full bg-gray-200 animate-pulse" />
        ) : (
          <Image 
            src={productoData?.foto || '/placeholder.png'} 
            alt={productoData?.nombre || 'Producto'} 
            width={96} 
            height={96} 
            className="w-full h-full object-cover" 
          />
        )}
      </div>
      
      <div className="flex-1 min-w-0">
        {loading ? (
          <div className="space-y-2">
            <div className="h-5 bg-gray-200 rounded animate-pulse" />
            <div className="h-4 bg-gray-200 rounded animate-pulse w-2/3" />
          </div>
        ) : (
          <>
            <h4 className="font-medium text-gray-900 truncate">{productoData?.nombre || 'Producto no disponible'}</h4>
            
            {productoData && (
              <div className="mt-2">
                <CartProductDetails 
                  condition={productoData.tipo || "Reacondicionado"}
                  capacity={productoData.capacidad || ""}
                  color={productoData.color || ""}
                />
              </div>
            )}
          </>
        )}
        
        <div className="mt-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <div className="flex items-center gap-4 text-sm">
            <span className="text-gray-600">
              Cantidad: <strong className="text-gray-900">{producto.cantidad}</strong>
            </span>
            <span className="text-gray-400">•</span>
            <span className="text-gray-600">
              Precio unitario: <strong className="text-gray-900">{formatPrice(producto.precio)}</strong>
            </span>
          </div>
          <span className="font-semibold text-lg text-gray-900">
            {formatPrice(subtotal)}
          </span>
        </div>
      </div>
    </div>
  );
}

