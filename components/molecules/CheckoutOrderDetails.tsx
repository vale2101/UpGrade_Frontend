"use client";
import Image from "next/image";
import { useProduct } from "../../hooks/useProduct";
import { mapProductoToProduct } from "../../utils/productMapper";
import CartProductDetails from "./CartProductDetails";

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

interface CheckoutOrderDetailsProps {
  items: OrderDetailItem[];
  className?: string;
}

function CheckoutOrderItem({ item }: { item: OrderDetailItem }) {
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

  return (
    <div className="flex gap-4 py-4 border-b border-gray-200 last:border-b-0">
      <div className="flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 bg-gray-100 rounded-lg overflow-hidden">
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
          <h4 className="font-medium text-gray-900 truncate">{productData.name}</h4>
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
            />
          )}
        </div>
        
        <div className="mt-2 flex items-center justify-between">
          <span className="text-sm text-gray-600">Cantidad: {item.quantity}</span>
          <span className="font-semibold text-gray-900">{item.price}</span>
        </div>
      </div>
    </div>
  );
}

export default function CheckoutOrderDetails({ items, className = "" }: CheckoutOrderDetailsProps) {
  return (
    <div className={`bg-white rounded-lg shadow-md p-4 sm:p-6 ${className}`}>
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Detalles del pedido</h3>
      <div className="space-y-0">
        {items.map((item) => (
          <CheckoutOrderItem key={`${item.id}-${item.condition}-${item.capacity}-${item.color}`} item={item} />
        ))}
      </div>
    </div>
  );
}

