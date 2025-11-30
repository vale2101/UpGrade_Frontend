"use client";

import { useMemo } from "react";
import ProductSection from "../molecules/ProductSection";
import { useProductsShowcase } from "../../hooks/useProductsShowcase";
import { useProducts } from "../../hooks/useProducts";
import { filterProductsByCategory, mapProductoToProduct } from "../../utils/productMapper";

interface ProductsShowcaseProps {
  selectedCategory: string;
  onAddToCart?: (productId: string) => void;
}

export default function ProductsShowcase({ selectedCategory, onAddToCart }: ProductsShowcaseProps) {
  const { products: productos, loading, error } = useProducts();
  
  // Mapear productos del backend al formato del frontend
  const mappedProducts = useMemo(() => {
    return productos.map(mapProductoToProduct);
  }, [productos]);

  // Filtrar productos por categoría seleccionada
  const filteredProducts = useMemo(() => {
    // Si selectedCategory es "Todas" o no existe, mostrar todos los productos
    if (selectedCategory === "Todas" || !selectedCategory) {
      return mappedProducts;
    }
    
    // Filtrar por la categoría seleccionada
    const filtered = filterProductsByCategory(mappedProducts, selectedCategory);
    
    // Si no hay productos filtrados, mostrar todos los productos (fallback)
    // Esto puede pasar si la categoría seleccionada no tiene productos o no existe
    return filtered.length > 0 ? filtered : mappedProducts;
  }, [mappedProducts, selectedCategory]);

  const { showAll, setShowAll, formattedProducts, handleProductClick, handleAddToCart } = useProductsShowcase({
    products: filteredProducts,
    onAddToCart
  });

  if (loading) {
    return (
      <main>
        <div className="flex justify-center items-center py-12">
          <p className="text-gray-600">Cargando productos...</p>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main>
        <div className="flex justify-center items-center py-12">
          <p className="text-red-600">Error: {error}</p>
        </div>
      </main>
    );
  }

  return (
    <main>
      <ProductSection 
        products={formattedProducts}
        showAll={showAll}
        onToggleShowAll={() => setShowAll(!showAll)}
        onProductClick={handleProductClick}
        onAddToCart={handleAddToCart}
      />
    </main>
  );
}