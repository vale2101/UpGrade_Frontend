"use client";

import ProductCard from "./ProductCard";

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

interface ProductGridProps {
  products: Product[];
  onAddToCart?: (productId: string) => void;
  className?: string;
}

export default function ProductGrid({ products, onAddToCart, className = "" }: ProductGridProps) {
  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 ${className}`}>
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onAddToCart={onAddToCart}
        />
      ))}
    </div>
  );
}