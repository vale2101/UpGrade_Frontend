"use client";
import { useMemo } from "react";
import Image from "next/image";
import { useProduct } from "../../hooks/useProduct";
import CartProductDetails from "./CartProductDetails";
import { mapProductoToProduct } from "../../utils/productMapper";

interface CartItemCardProps {
  item: any;
  updateQuantity: (id: string, quantity: number) => void;
  removeFromCart: (id: string) => void;
}

export default function CartItemCard({ item, updateQuantity, removeFromCart }: CartItemCardProps) {
  const { product: producto, loading: productLoading } = useProduct(item.id);
  
  const productData = useMemo(() => {
    if (producto) {
      const mappedProduct = mapProductoToProduct(producto);
      return {
        name: mappedProduct.name || item.name,
        image: mappedProduct.image || item.image,
        price: mappedProduct.currentPrice || item.price,
        originalPrice: mappedProduct.originalPrice || item.originalPrice,
        condition: producto.tipo || item.condition || "Reacondicionado",
        capacity: producto.capacidad || item.capacity || "128GB",
        color: producto.color || item.color || "Negro",
      };
    }
    return {
      name: item.name,
      image: item.image,
      price: item.price,
      originalPrice: item.originalPrice,
      condition: item.condition || "Reacondicionado",
      capacity: item.capacity || "128GB",
      color: item.color || "Negro",
    };
  }, [producto, item]);

  return (
    <div className="p-4 sm:p-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
        <div className="flex-shrink-0 w-full sm:w-auto">
          <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gray-100 rounded-lg overflow-hidden mx-auto sm:mx-0">
            {productLoading ? (
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
        </div>

        <div className="flex-1 min-w-0 w-full sm:w-auto">
          {productLoading ? (
            <div className="h-6 bg-gray-200 rounded animate-pulse mb-2" />
          ) : (
            <h3 className="text-base sm:text-lg font-medium text-gray-900 truncate text-center sm:text-left">
              {productData.name}
            </h3>
          )}
          <div className="mt-2 text-center sm:text-left">
            {productLoading ? (
              <div className="space-y-2">
                <div className="h-4 bg-gray-200 rounded animate-pulse" />
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
        </div>

        <div className="flex-shrink-0 text-center sm:text-right w-full sm:w-auto">
          {productLoading ? (
            <div className="h-6 bg-gray-200 rounded animate-pulse mb-3" />
          ) : (
            <>
              <p className="text-lg font-semibold text-gray-900">{productData.price}</p>
              {productData.originalPrice && (
                <p className="text-sm text-gray-500 line-through">{productData.originalPrice}</p>
              )}
            </>
          )}
          
          <div className="mt-3 flex items-center justify-center sm:justify-end space-x-2">
            <button
              onClick={() => updateQuantity(item.id, item.quantity - 1)}
              className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50"
              disabled={productLoading}
            >
              -
            </button>
            <span className="w-8 text-center font-medium">{item.quantity}</span>
            <button
              onClick={() => updateQuantity(item.id, item.quantity + 1)}
              className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50"
              disabled={productLoading}
            >
              +
            </button>
          </div>

          <button
            onClick={() => removeFromCart(item.id)}
            className="mt-2 text-red-600 hover:text-red-800 text-sm font-medium"
            disabled={productLoading}
          >
            Eliminar
          </button>
        </div>
      </div>
    </div>
  );
}

