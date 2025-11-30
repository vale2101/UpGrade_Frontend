"use client";

import { useEffect, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import ProductListing from "../molecules/ProductListing";
import ProductSearchBar from "../molecules/ProductSearchBar";
import EmptyProductsState from "../molecules/EmptyProductsState";
import { useProductSearch } from "../../hooks/useProductSearch";
import { useProductFilter } from "../../hooks/useProductFilter";
import { useProducts } from "../../hooks/useProducts";
import { mapProductoToProduct } from "../../utils/productMapper";

export default function SearchResultsSection() {
  const searchParams = useSearchParams();
  const { products: productos, loading, error } = useProducts();
  
  // Mapear productos del backend al formato del frontend
  const allProducts = useMemo(() => {
    return productos.map(mapProductoToProduct);
  }, [productos]);

  const { searchQuery, setSearchQuery, filteredProducts: searchResults } = useProductSearch(allProducts);
  const { filteredProducts } = useProductFilter(searchResults);

  useEffect(() => {
    const q = searchParams.get("q") || "";
    setSearchQuery(q);
  }, [searchParams, setSearchQuery]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-4 sm:py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex justify-center items-center py-12">
            <p className="text-red-600">Error: {error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-4 sm:py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 sm:mb-6">Resultados de búsqueda</h1>

        <ProductSearchBar
          searchTerm={searchQuery}
          onSearchChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
          onClear={() => setSearchQuery("")}
          resultsCount={filteredProducts.length}
        />

        <div className="mt-4 sm:mt-6">
          {filteredProducts.length > 0 ? (
            <ProductListing products={filteredProducts} />
          ) : (
            <EmptyProductsState
              searchTerm={searchQuery}
              categoryName="Todas"
              onReset={() => setSearchQuery("")}
              showResetButton={!!searchQuery}
            />
          )}
        </div>
      </div>
    </div>
  );
}


