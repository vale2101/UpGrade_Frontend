"use client";
import { useMemo } from "react";
import { useRouter } from "next/navigation";
import FilterSidebar from "./FilterSidebar";
import ProductListing from "../molecules/ProductListing";
import EmptyProductsState from "../molecules/EmptyProductsState";
import ProductSearchBar from "../molecules/ProductSearchBar";
import { useProductFilter } from "../../hooks/useProductFilter";
import { useProductSearch } from "../../hooks/useProductSearch";
import { useProductCategory } from "../../hooks/useProductCategory";
import { useAddToCart } from "../../hooks/useAddToCart";
import { useProducts } from "../../hooks/useProducts";
import {
  filterProductsByCategory,
  mapProductoToProduct,
  mapSlugToBackendCategory,
  Product,
} from "../../utils/productMapper";

export default function CategorySection({ slug }: { slug: string }) {
  const router = useRouter();
  const { selectedCategory: categoryName } = useProductCategory(slug);
  const { products: productos, loading, error } = useProducts();

  const backendCategory = useMemo(() => {
    return mapSlugToBackendCategory(slug);
  }, [slug]);

  const mappedProducts: Product[] = useMemo(() => {
    return productos.map(mapProductoToProduct);
  }, [productos]);

  const allProducts: Product[] = useMemo(() => {
    return filterProductsByCategory(mappedProducts, backendCategory);
  }, [mappedProducts, backendCategory]);

  const {
    searchQuery,
    setSearchQuery,
    filteredProducts: searchResults,
  } = useProductSearch(allProducts);

  const filteredProducts = useProductFilter(searchResults);
  const { handleAddToCart } = useAddToCart();

  const onAddToCart = (productId: string) => {
    const product = allProducts.find((p) => p.id === productId);
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
        <h1 className="text-2xl sm:text-3xl font-bold mb-6">{categoryName}</h1>

        <ProductSearchBar
          searchTerm={searchQuery}
          onSearchChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setSearchQuery(e.target.value)
          }
          onClear={() => setSearchQuery("")}
          resultsCount={filteredProducts.filteredProducts.length}
        />

        <div className="flex flex-col lg:flex-row gap-4 sm:gap-6">
          <div className="w-full lg:w-64">
            <FilterSidebar />
          </div>
          <div className="flex-1">
            {filteredProducts.filteredProducts.length > 0 ? (
              <ProductListing
                products={filteredProducts.filteredProducts}
                onAddToCart={onAddToCart}
                onProductClick={handleProductClick}
              />
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
