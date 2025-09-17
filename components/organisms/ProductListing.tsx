"use client";

import ProductGrid from "../molecules/ProductGrid";

interface Product {
  id: string;
  name: string;
  image: string;
  currentPrice: string;
  originalPrice?: string;
  discount?: string;
  installments?: number;
  monthlyAmount?: string;
  condition: "Nuevo" | "Como Nuevo" | "Outlet";
}

interface ProductListingProps {
  products: Product[];
  onAddToCart?: (productId: string) => void;
  className?: string;
}

export default function ProductListing({ products, onAddToCart, className = "" }: ProductListingProps) {
  return (
    <div className={`flex-1 ${className}`}>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div className="flex items-center space-x-4">
          <span className="text-base sm:text-lg font-medium text-gray-700">
            {products.length} productos
          </span>
        </div>
        <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-2 w-full sm:w-auto">
          <label className="text-sm text-gray-600">Ordenar por:</label>
          <select className="border border-gray-300 rounded-md px-3 py-2 text-sm w-full sm:w-auto min-w-[200px]">
            <option>Características</option>
            <option>Precio: Menor a Mayor</option>
            <option>Precio: Mayor a Menor</option>
            <option>Nombre A-Z</option>
            <option>Nombre Z-A</option>
          </select>
        </div>
      </div>
      
      <ProductGrid products={products} onAddToCart={onAddToCart} />
    </div>
  );
}
