"use client";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import FilterSidebar from "./FilterSidebar";
import ProductListing from "./ProductListing";
import CategoryTabs from "../molecules/CategoryTabs";
import EmptyProductsState from "../molecules/EmptyProductsState";
import ProductSearchBar from "../molecules/ProductSearchBar";
import { useCart } from "../../contexts/CartContext";
import { useProductFilter } from "../../hooks/useProductFilter";
import { getPromotionProductsByCategory } from "../../contexts/DataContext";

export default function PromotionsPageSection() {
  const searchParams = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState("Todas");
  const [searchTerm, setSearchTerm] = useState("");
  
  useEffect(() => {
    const categoria = searchParams.get('categoria');
    if (categoria) setSelectedCategory(categoria);
  }, [searchParams]);
  
  const allProducts = getPromotionProductsByCategory("Todas");
  const categoryFilteredProducts = getPromotionProductsByCategory(selectedCategory).filter(product =>
    searchTerm === "" || 
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const filteredProducts = useProductFilter(categoryFilteredProducts);
  const { addToCart } = useCart();

  const handleAddToCart = (productId: string) => {
    const product = allProducts.find(p => p.id === productId);
    if (product) {
      addToCart({
        id: product.id,
        name: product.name,
        image: product.image,
        price: product.currentPrice,
        originalPrice: product.originalPrice,
        discount: product.discount,
        condition: product.condition,
        capacity: "128GB",
        color: "Gray",
        category: product.category
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-4 sm:py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-md p-3 sm:p-4 mb-4 sm:mb-6">
          <CategoryTabs selectedCategory={selectedCategory} onCategoryChange={setSelectedCategory} />
        </div>

        <ProductSearchBar 
          searchTerm={searchTerm}
          onSearchChange={(e: any) => setSearchTerm(e.target.value)}
          onClear={() => setSearchTerm("")}
          resultsCount={filteredProducts.length}
        />

        <div className="flex flex-col lg:flex-row gap-4 sm:gap-6">
          <div className="lg:w-64">
            <FilterSidebar />
          </div>
          <div className="flex-1">
            {filteredProducts.length > 0 ? (
              <ProductListing products={filteredProducts as any} onAddToCart={handleAddToCart} />
            ) : (
              <EmptyProductsState
                searchTerm={searchTerm}
                categoryName={selectedCategory}
                onReset={() => {
                  setSearchTerm("");
                  setSelectedCategory("Todas");
                }}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

