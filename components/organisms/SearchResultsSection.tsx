"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import ProductListing from "./ProductListing";
import ProductSearchBar from "../molecules/ProductSearchBar";
import EmptyProductsState from "../molecules/EmptyProductsState";
import { useProductSearch } from "../../hooks/useProductSearch";
import { useProductFilter } from "../../hooks/useProductFilter";
import { getProductsByCategory } from "../../contexts/DataContext";

export default function SearchResultsSection() {
  const searchParams = useSearchParams();
  const allProducts = getProductsByCategory("Todas");

  const { searchQuery, setSearchQuery, filteredProducts: searchResults } = useProductSearch(allProducts);
  const { filteredProducts } = useProductFilter(searchResults);

  useEffect(() => {
    const q = searchParams.get("q") || "";
    setSearchQuery(q);
  }, [searchParams, setSearchQuery]);

  return (
    <div className="max-w-7xl mx-auto px-4">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6">Resultados de búsqueda</h1>

      <ProductSearchBar
        searchTerm={searchQuery}
        onSearchChange={(e: any) => setSearchQuery(e.target.value)}
        onClear={() => setSearchQuery("")}
        resultsCount={filteredProducts.length}
      />

      <div className="mt-4">
        {filteredProducts.length > 0 ? (
          <ProductListing products={filteredProducts as any} />
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
  );
}


