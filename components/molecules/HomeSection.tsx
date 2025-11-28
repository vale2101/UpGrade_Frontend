"use client";
import CategoryMenu from "./CategoryMenu";
import HeroBanner from "./HeroBanner";
import ProductsShowcase from "../organisms/ProductsShowcase";
import { useCategory } from "../../contexts/CategoryContext";

export default function HomeSection() {
  const { selectedCategory } = useCategory();

  const handleAddToCart = (productId: string) => {
    console.log('Adding product to cart:', productId);
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

