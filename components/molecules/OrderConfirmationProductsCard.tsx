"use client";

import Image from "next/image";
import { useProduct } from "../../hooks/useProduct";
import CartProductDetails from "./CartProductDetails";
import InfoLabel from "../atoms/InfoLabel";

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

interface OrderConfirmationProductsCardProps {
  items: OrderDetailItem[];
  className?: string;
}

function OrderConfirmationProductItem({ item }: { item: OrderDetailItem }) {
  const { product: producto, loading } = useProduct(item.id);
  
  const productData = producto 
    ? {
        name: producto.nombre,
        image: producto.foto,
        condition: producto.tipo || item.condition,
        capacity: producto.capacidad || item.capacity,
        color: producto.color || item.color,
      }
    : {
        name: item.name,
        image: item.image,
        condition: item.condition,
        capacity: item.capacity,
        color: item.color,
      };

  // Calcular subtotal del item
  const priceString = item.price.replace(/[^0-9]/g, '');
  const price = parseFloat(priceString) || 0;
  const subtotal = price * item.quantity;

  const formatPrice = (amount: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="flex flex-col sm:flex-row gap-4 py-4 border-b border-gray-200 last:border-b-0">
      <div className="flex-shrink-0 w-full sm:w-20 h-20 bg-gray-100 rounded-lg overflow-hidden">
        {loading ? (
          <div className="w-full h-full bg-gray-200 animate-pulse" />
        ) : (
          <Image 
            src={productData.image} 
            alt={productData.name} 
            width={80} 
            height={80} 
            className="w-full h-full object-cover" 
          />
        )}
      </div>
      
      <div className="flex-1 min-w-0">
        {loading ? (
          <div className="h-5 bg-gray-200 rounded animate-pulse mb-2" />
        ) : (
          <h4 className="font-medium text-sm sm:text-base text-gray-900 truncate">{productData.name}</h4>
        )}
        
        <div className="mt-2">
          {loading ? (
            <div className="space-y-1">
              <div className="h-4 bg-gray-200 rounded animate-pulse" />
              <div className="h-4 bg-gray-200 rounded animate-pulse" />
            </div>
          ) : (
            <CartProductDetails 
              condition={productData.condition}
              capacity={productData.capacity}
              color={productData.color}
              className="text-xs sm:text-sm"
            />
          )}
        </div>
        
        <div className="mt-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <div className="flex items-center gap-3">
            <InfoLabel>Cantidad:</InfoLabel>
            <span className="text-sm sm:text-base font-medium text-gray-900">{item.quantity}</span>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center gap-2">
            <div className="text-xs sm:text-sm text-gray-600">
              {item.price} x {item.quantity}
            </div>
            <span className="text-sm sm:text-base font-semibold text-gray-900">
              {formatPrice(subtotal)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function OrderConfirmationProductsCard({ 
  items, 
  className = "" 
}: OrderConfirmationProductsCardProps) {
  return (
    <div className={`bg-white rounded-lg shadow-md p-4 sm:p-6 ${className}`}>
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Productos del pedido</h3>
      <div className="space-y-0">
        {items.map((item) => (
          <OrderConfirmationProductItem 
            key={`${item.id}-${item.condition}-${item.capacity}-${item.color}`} 
            item={item} 
          />
        ))}
      </div>
    </div>
  );
}

