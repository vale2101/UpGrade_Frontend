"use client";
import { useState } from "react";
import FilterSidebar from "./FilterSidebar";
import ProductListing from "./ProductListing";
import EmptyProductsState from "../molecules/EmptyProductsState";
import ProductSearchBar from "../molecules/ProductSearchBar";
import { useCart } from "../../contexts/CartContext";
import { useProductFilter } from "../../hooks/useProductFilter";
import { getProductsByCategory, getAllCategories } from "../../contexts/DataContext";

export default function CategorySection({ slug }: { slug: string }) {
  const [searchTerm, setSearchTerm] = useState("");
  
  const categories = getAllCategories();
  const currentCategory = categories.find(cat => cat.slug === slug);
  const categoryName = currentCategory?.name || "Todas";
  
  const allProducts = getProductsByCategory(categoryName);
  const categoryFilteredProducts = allProducts.filter(product =>
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
        <h1 className="text-2xl sm:text-3xl font-bold mb-6">{categoryName}</h1>

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
                categoryName={categoryName}
                onReset={() => setSearchTerm("")}
                showResetButton={!!searchTerm}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

