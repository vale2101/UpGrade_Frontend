"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import ProductSection from "./ProductSection";
import { getProductsByCategory } from "../../contexts/DataContext";
import { useCart } from "../../contexts/CartContext";

interface ProductsShowcaseProps {
  title: string;
  selectedCategory: string;
  onAddToCart?: (productId: string) => void;
}

export default function ProductsShowcase({ selectedCategory, onAddToCart }: ProductsShowcaseProps) {
  const [showAll, setShowAll] = useState(false);
  const router = useRouter();
  const { addToCart } = useCart();
  
  const filteredProducts = getProductsByCategory(selectedCategory);
  const displayedProducts = showAll ? filteredProducts : filteredProducts.slice(0, 4);

  const formattedProducts = displayedProducts.map(product => ({
    id: product.id,
    name: product.name,
    image: product.image,
    currentPrice: product.currentPrice,
    originalPrice: product.originalPrice,
    discount: product.discount,
    installments: product.installments || 6,
    monthlyAmount: product.monthlyAmount || "$0",
    condition: product.condition,
    category: product.category
  }));

  const handleProductClick = (productId: string) => {
    router.push(`/producto/${productId}`);
  };

  const handleAddToCart = (productId: string) => {
    const product = filteredProducts.find(p => p.id === productId);
    if (product) {
      addToCart({
        id: product.id,
        name: product.name,
        image: product.image,
        price: product.currentPrice,
        originalPrice: product.originalPrice,
        discount: product.discount,
        condition: product.condition,
        // TODO: capacity y color deben venir del producto desde la base de datos
        capacity: Array.isArray(product.capacity) ? product.capacity[0] : product.capacity || "",
        color: Array.isArray(product.color) ? product.color[0] : product.color || "",
        category: product.category
      });
    }
    onAddToCart?.(productId);
  };

  return (
    <main>
      <ProductSection 
        title="Productos Destacados" 
        products={formattedProducts}
        showAll={showAll}
        onToggleShowAll={() => setShowAll(!showAll)}
        onProductClick={handleProductClick}
        onAddToCart={handleAddToCart}
      />
    </main>
  );
}