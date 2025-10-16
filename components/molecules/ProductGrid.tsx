"use client";

import ProductCard from "./ProductCard";
import { Product } from "../../contexts/DataContext";

interface ProductGridProps {
  products: Product[];
  onAddToCart?: (productId: string) => void;
  onProductClick?: (productId: string) => void;
  className?: string;
}

export default function ProductGrid({ products, onAddToCart, onProductClick, className = "" }: ProductGridProps) {
  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 ${className}`}>
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onAddToCart={onAddToCart}
          onProductClick={onProductClick}
        />
      ))}
    </div>
  );
}