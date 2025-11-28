"use client";
import FilterSidebar from "./FilterSidebar";
import ProductListing from "../molecules/ProductListing";
import EmptyProductsState from "../molecules/EmptyProductsState";
import ProductSearchBar from "../molecules/ProductSearchBar";
import { useProductFilter } from "../../hooks/useProductFilter";
import { useProductSearch } from "../../hooks/useProductSearch";
import { useProductCategory } from "../../hooks/useProductCategory";
import { useAddToCart } from "../../hooks/useAddToCart";

export default function CategorySection({ slug }: { slug: string }) {
  const { categoryName } = useProductCategory(slug);
  const allProducts: any[] = [];
  const { searchQuery, setSearchQuery, filteredProducts: searchResults } = useProductSearch(allProducts);
  const filteredProducts = useProductFilter(searchResults);
  const { handleAddToCart } = useAddToCart();

  const onAddToCart = (productId: string) => {
    const product = allProducts.find(p => p.id === productId);
    if (product) {
      handleAddToCart(product);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-4 sm:py-8">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-2xl sm:text-3xl font-bold mb-6">{categoryName}</h1>

        <ProductSearchBar 
          searchTerm={searchQuery}
          onSearchChange={(e: any) => setSearchQuery(e.target.value)}
          onClear={() => setSearchQuery("")}
          resultsCount={filteredProducts.filteredProducts.length}
        />

        <div className="flex flex-col lg:flex-row gap-4 sm:gap-6">
          <div className="w-full lg:w-64">
            <FilterSidebar />
          </div>
          <div className="flex-1">
            {filteredProducts.filteredProducts.length > 0 ? (
              <ProductListing products={filteredProducts.filteredProducts as any} onAddToCart={onAddToCart} />
            ) : (
              <EmptyProductsState
                searchTerm={searchQuery}
                categoryName={categoryName}
                onReset={() => setSearchQuery("")}
                showResetButton={!!searchQuery}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}