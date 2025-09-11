"use client";

import { useState } from "react";
import HomeLayout from "../components/layouts/HomeLayout";
import CategoryMenu from "../components/molecules/CategoryMenu";
import HeroBanner from "../components/organisms/HeroBanner";
import ProductLayout from "../components/layouts/ProductLayout";
import { useCart } from "../contexts/CartContext";
import { useCategory } from "../contexts/CategoryContext";

export default function HomePage() {
  const { selectedCategory } = useCategory();
  const { addToCart } = useCart();

  const handleAddToCart = (productId: string) => {
    // Aquí puedes agregar lógica adicional si necesitas
    // Por ahora, la lógica está en ProductLayout
  };

  return (
    <HomeLayout>
      {/* Menú superior (blanco) */}
      <CategoryMenu />

      {/* Banner principal (rosado) */}
      <HeroBanner />

      {/* Productos destacados */}
      <ProductLayout 
        selectedCategory={selectedCategory} 
        onAddToCart={handleAddToCart}
      /> 
    </HomeLayout>
  );
}
