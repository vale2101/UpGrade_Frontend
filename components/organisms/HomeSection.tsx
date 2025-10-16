"use client";
import CategoryMenu from "../molecules/CategoryMenu";
import HeroBanner from "./HeroBanner";
import ProductsShowcase from "./ProductsShowcase";
import { useCategory } from "../../contexts/CategoryContext";

export default function HomeSection() {
  const { selectedCategory } = useCategory();

  const handleAddToCart = (productId: string) => {
  };

  return (
    <>
      <CategoryMenu />
      <HeroBanner />
      <ProductsShowcase 
        selectedCategory={selectedCategory} 
        onAddToCart={handleAddToCart}
      /> 
    </>
  );
}

