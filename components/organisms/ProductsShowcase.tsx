"use client";

import ProductSection from "../molecules/ProductSection";
import { useProductsShowcase } from "../../hooks/useProductsShowcase";

interface ProductsShowcaseProps {
  title: string;
  selectedCategory: string;
  onAddToCart?: (productId: string) => void;
}

export default function ProductsShowcase({ selectedCategory, onAddToCart }: ProductsShowcaseProps) {
  const filteredProducts: any[] = [];
  const { showAll, setShowAll, formattedProducts, handleProductClick, handleAddToCart } = useProductsShowcase({
    products: filteredProducts,
    onAddToCart
  });

  return (
    <main>
      <ProductSection 
        products={formattedProducts}
        showAll={showAll}
        onToggleShowAll={() => setShowAll(!showAll)}
        onProductClick={handleProductClick}
        onAddToCart={handleAddToCart}
      />
    </main>
  );
}