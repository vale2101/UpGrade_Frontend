"use client";

import ProductGrid from "./ProductGrid";
import { Product } from "../../utils/productMapper";

interface ProductListingProps {
  products: Product[];
  onAddToCart?: (productId: string) => void;
  onProductClick?: (productId: string) => void;
  className?: string;
}

export default function ProductListing({ products, onAddToCart, onProductClick, className = "" }: ProductListingProps) {
  return (
    <div className={`flex-1 ${className}`}>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 sm:mb-6 gap-3 sm:gap-4">
        <div className="flex items-center">
          <span className="text-sm sm:text-base md:text-lg font-medium text-gray-700">
            {products.length} producto{products.length !== 1 ? 's' : ''}
          </span>
        </div>
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 w-full sm:w-auto">
          <label className="text-xs sm:text-sm text-gray-600 whitespace-nowrap">Ordenar por:</label>
          <select className="border border-gray-300 rounded-md px-3 py-2 text-xs sm:text-sm w-full sm:w-auto min-w-[180px] sm:min-w-[200px] focus:outline-none focus:ring-2 focus:ring-black">
            <option>Características</option>
            <option>Precio: Menor a Mayor</option>
            <option>Precio: Mayor a Menor</option>
            <option>Nombre A-Z</option>
            <option>Nombre Z-A</option>
          </select>
        </div>
      </div>
      
      <ProductGrid products={products} onAddToCart={onAddToCart} onProductClick={onProductClick} />
    </div>
  );
}

