"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import ProductSection from "../organisms/ProductSection";
import { getProductsByCategory } from "../../db/data";
import { useCart } from "../../contexts/CartContext";

interface ProductLayoutProps {
  selectedCategory: string;
  onAddToCart?: (productId: string) => void;
}

export default function ProductLayout({ selectedCategory, onAddToCart }: ProductLayoutProps) {
  const [showAll, setShowAll] = useState(false);
  const router = useRouter();
  const { addToCart } = useCart();
  
  // Obtener productos desde la base de datos centralizada
  const filteredProducts = getProductsByCategory(selectedCategory);
  const displayedProducts = showAll ? filteredProducts : filteredProducts.slice(0, 4);

  // Convertir productos al formato esperado por ProductSection
  const formattedProducts = displayedProducts.map(product => ({
    id: product.id,
    name: product.name,
    image: product.image,
    currentPrice: product.currentPrice,
    originalPrice: product.originalPrice,
    discount: product.discount,
    installments: product.installments || 6,
    monthlyAmount: product.monthlyAmount || "$0",
    condition: product.condition
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
        capacity: "128GB", // Valor por defecto
        color: "Gray", // Valor por defecto
        category: product.category
      });
    }
    // Llamar también a la función del padre si existe
    onAddToCart?.(productId);
  };

  return (
    <main>
      {/* Aquí puedes meter más secciones si quieres */}
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
