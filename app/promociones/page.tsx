"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import HomeLayout from "../../components/layouts/HomeLayout";
import FilterSidebar from "../../components/organisms/FilterSidebar";
import ProductListing from "../../components/organisms/ProductListing";
import CategoryTabs from "../../components/molecules/CategoryTabs";
import SearchInput from "../../components/atoms/SearchInput";
import Button from "../../components/atoms/Button";
import { useCart } from "../../contexts/CartContext";
import { useProductFilter } from "../../hooks/useProductFilter";
import { getPromotionProductsByCategory } from "../../db/data";

export default function PromotionsPage() {
  const searchParams = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState("Todas");
  const [searchTerm, setSearchTerm] = useState("");
  
  // Efecto para leer parámetros de URL y establecer la categoría
  useEffect(() => {
    const categoria = searchParams.get('categoria');
    if (categoria) {
      setSelectedCategory(categoria);
    }
  }, [searchParams]);
  
  // Obtener productos desde la base de datos centralizada
  const allProducts = getPromotionProductsByCategory("Todas");

  // Filtrar productos por categoría seleccionada y término de búsqueda
  const categoryFilteredProducts = getPromotionProductsByCategory(selectedCategory).filter(product => {
    const matchesSearch = searchTerm === "" || 
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesSearch;
  });

  // Aplicar filtros avanzados usando el hook
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
        capacity: "128GB", // Valor por defecto
        color: "Gray", // Valor por defecto
        category: product.category
      });
    }
  };

  return (
    <HomeLayout>
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4">
          {/* Barra de navegación de categorías */}
          <div className="bg-white rounded-lg shadow-md p-4 mb-6">
            <CategoryTabs 
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
            />
          </div>

          {/* Barra de búsqueda */}
          <div className="bg-white rounded-lg shadow-md p-4 mb-6">
            <div className="flex items-center space-x-4">
              <div className="flex-1">
                <SearchInput
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onClear={() => setSearchTerm("")}
                  placeholder="Buscar productos..."
                />
              </div>
              <div className="text-sm text-gray-600">
                {filteredProducts.length} producto{filteredProducts.length !== 1 ? 's' : ''} encontrado{filteredProducts.length !== 1 ? 's' : ''}
              </div>
            </div>
          </div>

          {/* Contenido principal */}
          <div className="flex gap-6">
            <FilterSidebar />
            {filteredProducts.length > 0 ? (
              <ProductListing 
                products={filteredProducts as any} 
                onAddToCart={handleAddToCart}
              />
            ) : (
              <div className="flex-1 bg-white rounded-lg shadow-md p-8 text-center">
                <div className="max-w-md mx-auto">
                  <svg className="mx-auto h-12 w-12 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    No se encontraron productos
                  </h3>
                  <p className="text-gray-500 mb-4">
                    {searchTerm 
                      ? `No hay productos que coincidan con "${searchTerm}"`
                      : `No hay productos en la categoría "${selectedCategory}"`
                    }
                  </p>
                  <Button
                    onClick={() => {
                      setSearchTerm("");
                      setSelectedCategory("Todas");
                    }}
                    variant="primary"
                  >
                    Ver todos los productos
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </HomeLayout>
  );
}
