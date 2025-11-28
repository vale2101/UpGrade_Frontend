"use client";
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import FilterSidebar from "./FilterSidebar";
import ProductListing from "../molecules/ProductListing";
import CategoryTabs from "../molecules/CategoryTabs";
import EmptyProductsState from "../molecules/EmptyProductsState";
import ProductSearchBar from "../molecules/ProductSearchBar";
import { useProductFilter } from "../../hooks/useProductFilter";
import { useProductSearch } from "../../hooks/useProductSearch";
import { useProductCategory } from "../../hooks/useProductCategory";
import { useAddToCart } from "../../hooks/useAddToCart";

export default function PromotionsPageSection() {
  const searchParams = useSearchParams();
  const { selectedCategory, setSelectedCategory } = useProductCategory();
  const allProducts: any[] = [];
  const categoryProducts: any[] = [];
  const { searchQuery, setSearchQuery, filteredProducts: searchResults } = useProductSearch(categoryProducts);
  const { filteredProducts } = useProductFilter(searchResults);
  const { handleAddToCart } = useAddToCart();

  // Leer el query parameter de la URL y aplicarlo a la búsqueda
  useEffect(() => {
    const q = searchParams.get("q");
    if (q) {
      setSearchQuery(q);
      // También actualizar la categoría si el query coincide con alguna
      const queryLower = q.toLowerCase();
      const categoryMap: Record<string, string> = {
        "samsung": "Samsung",
        "iphone": "iPhone",
        "apple watch": "Apple Watch",
        "ipad": "iPad",
        "otras marcas": "Otras Marcas",
        "sin iva": "Sin IVA",
        "saldos": "Saldos"
      };
      
      for (const [key, category] of Object.entries(categoryMap)) {
        if (queryLower.includes(key)) {
          setSelectedCategory(category);
          break;
        }
      }
    }
  }, [searchParams, setSearchQuery, setSelectedCategory]);

  const onAddToCart = (productId: string) => {
    const product = allProducts.find(p => p.id === productId);
    if (product) {
      handleAddToCart(product);
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
          <div className="w-full lg:w-64">
            <FilterSidebar />
          </div>
          <div className="flex-1">
            {filteredProducts.length > 0 ? (
              <ProductListing products={filteredProducts} onAddToCart={onAddToCart} />
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