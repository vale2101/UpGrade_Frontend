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
import { useProductSearch } from "../../hooks/useProductSearch";
import { getPromotionProductsByCategory } from "../../contexts/DataContext";

export default function PromotionsPageSection() {
  const searchParams = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState("Todas");
  
  useEffect(() => {
    const categoria = searchParams.get('categoria');
    if (categoria) setSelectedCategory(categoria);
  }, [searchParams]);
  
  const allProducts = getPromotionProductsByCategory("Todas");
  const categoryProducts = getPromotionProductsByCategory(selectedCategory);
  const { searchQuery, setSearchQuery, filteredProducts: searchResults } = useProductSearch(categoryProducts);
  const { filteredProducts } = useProductFilter(searchResults);
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
          searchTerm={searchQuery}
          onSearchChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
          onClear={() => setSearchQuery("")}
          resultsCount={filteredProducts.length}
        />

        <div className="flex flex-col lg:flex-row gap-4 sm:gap-6">
          <div className="lg:w-64">
            <FilterSidebar />
          </div>
          <div className="flex-1">
            {filteredProducts.length > 0 ? (
              <ProductListing products={filteredProducts} onAddToCart={handleAddToCart} />
            ) : (
              <EmptyProductsState
                searchTerm={searchQuery}
                categoryName={selectedCategory}
                onReset={() => {
                  setSearchQuery("");
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