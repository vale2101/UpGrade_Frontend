"use client";
import { useEffect, useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import FilterSidebar from "./FilterSidebar";
import ProductListing from "../molecules/ProductListing";
import CategoryTabs from "../molecules/CategoryTabs";
import EmptyProductsState from "../molecules/EmptyProductsState";
import ProductSearchBar from "../molecules/ProductSearchBar";
import { useProductFilter } from "../../hooks/useProductFilter";
import { useProductSearch } from "../../hooks/useProductSearch";
import { useProductCategory } from "../../hooks/useProductCategory";
import { useAddToCart } from "../../hooks/useAddToCart";
import { useProducts } from "../../hooks/useProducts";
import { filterProductsByCategory, mapProductoToProduct } from "../../utils/productMapper";

export default function PromotionsPageSection() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { selectedCategory, setSelectedCategory } = useProductCategory();
  const { products: productos, loading, error } = useProducts();
  
  const allProducts = useMemo(() => {
    return productos.map(mapProductoToProduct);
  }, [productos]);

  const categoryProducts = useMemo(() => {
    return filterProductsByCategory(allProducts, selectedCategory);
  }, [allProducts, selectedCategory]);

  const { searchQuery, setSearchQuery, filteredProducts: searchResults } = useProductSearch(categoryProducts);
  const { filteredProducts } = useProductFilter(searchResults);
  const { handleAddToCart } = useAddToCart();

  useEffect(() => {
    const q = searchParams.get("q");
    if (q) {
      setSearchQuery(q);
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

  const handleProductClick = (productId: string) => {
    router.push(`/producto/${productId}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-4 sm:py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-center items-center py-12">
            <p className="text-gray-600">Cargando productos...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 py-4 sm:py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-center items-center py-12">
            <p className="text-red-600">Error: {error}</p>
          </div>
        </div>
      </div>
    );
  }

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
              <ProductListing 
                products={filteredProducts} 
                onAddToCart={onAddToCart}
                onProductClick={handleProductClick}
              />
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