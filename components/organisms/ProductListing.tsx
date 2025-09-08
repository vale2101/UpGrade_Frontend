"use client";

import ProductGrid from "../molecules/ProductGrid";

interface Product {
  id: string;
  name: string;
  image: string;
  currentPrice: string;
  originalPrice?: string;
  discount?: string;
  installments: number;
  monthlyAmount: string;
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
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center space-x-4">
          <span className="text-lg font-medium text-gray-700">
            {products.length} productos
          </span>
        </div>
        <div className="flex items-center space-x-2">
          <label className="text-sm text-gray-600">Ordenar por:</label>
          <select className="border border-gray-300 rounded-md px-3 py-1 text-sm">
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
