"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import HomeLayout from "../../components/layouts/HomeLayout";
import FilterSidebar from "../../components/organisms/FilterSidebar";
import ProductListing from "../../components/organisms/ProductListing";
import { useCart } from "../../contexts/CartContext";
import { useProductFilter } from "../../hooks/useProductFilter";

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
  
  const [allProducts] = useState([
    {
      id: "1",
      name: "Samsung Galaxy A05S",
      image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      currentPrice: "$299.900",
      installments: 6,
      monthlyAmount: "$49.983",
      condition: "Como Nuevo" as const,
      category: "Samsung"
    },
    {
      id: "2", 
      name: "Samsung Galaxy A13 (2022)",
      image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      currentPrice: "$299.900",
      originalPrice: "$349.900",
      discount: "14%",
      installments: 6,
      monthlyAmount: "$49.983",
      condition: "Outlet" as const,
      category: "Samsung"
    },
    {
      id: "3",
      name: "iPad Mini 4 4ta Gen",
      image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80", 
      currentPrice: "$424.900",
      originalPrice: "$539.900",
      discount: "21%",
      installments: 6,
      monthlyAmount: "$70.817",
      condition: "Outlet" as const,
      category: "iPad"
    },
    {
      id: "4",
      name: "Vivo Y22s",
      image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      currentPrice: "$429.900", 
      originalPrice: "$479.900",
      discount: "10%",
      installments: 6,
      monthlyAmount: "$71.650",
      condition: "Outlet" as const,
      category: "Otras Marcas"
    },
    {
      id: "5",
      name: "iPhone 13 Pro",
      image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      currentPrice: "$1.299.900",
      originalPrice: "$1.499.900", 
      discount: "13%",
      installments: 12,
      monthlyAmount: "$108.325",
      condition: "Como Nuevo" as const,
      category: "iPhone"
    },
    {
      id: "6",
      name: "Samsung Galaxy S22",
      image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      currentPrice: "$899.900",
      originalPrice: "$1.099.900",
      discount: "18%", 
      installments: 12,
      monthlyAmount: "$74.992",
      condition: "Outlet" as const,
      category: "Samsung"
    },
    {
      id: "7",
      name: "Apple Watch Series 8",
      image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      currentPrice: "$799.900",
      originalPrice: "$999.900",
      discount: "20%",
      installments: 6,
      monthlyAmount: "$133.317",
      condition: "Como Nuevo" as const,
      category: "Apple Watch"
    },
    {
      id: "8",
      name: "iPhone 15 Pro Max",
      image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      currentPrice: "$1.599.900",
      originalPrice: "$1.899.900",
      discount: "16%",
      installments: 12,
      monthlyAmount: "$133.325",
      condition: "Nuevo" as const,
      category: "iPhone"
    },
    {
      id: "9",
      name: "Samsung Galaxy S23 Sin IVA",
      image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      currentPrice: "$1.199.900",
      originalPrice: "$1.399.900",
      discount: "14%",
      installments: 12,
      monthlyAmount: "$99.992",
      condition: "Como Nuevo" as const,
      category: "Sin IVA"
    },
    {
      id: "10",
      name: "iPhone 14 Saldos",
      image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      currentPrice: "$899.900",
      originalPrice: "$1.199.900",
      discount: "25%",
      installments: 12,
      monthlyAmount: "$74.992",
      condition: "Outlet" as const,
      category: "Saldos"
    },
    {
      id: "11",
      name: "iPad Air Sin IVA",
      image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      currentPrice: "$1.099.900",
      originalPrice: "$1.299.900",
      discount: "15%",
      installments: 12,
      monthlyAmount: "$91.658",
      condition: "Como Nuevo" as const,
      category: "Sin IVA"
    },
    {
      id: "12",
      name: "Samsung Galaxy A54 Saldos",
      image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      currentPrice: "$399.900",
      originalPrice: "$599.900",
      discount: "33%",
      installments: 6,
      monthlyAmount: "$66.650",
      condition: "Outlet" as const,
      category: "Saldos"
    }
  ]);

  // Filtrar productos por categoría seleccionada y término de búsqueda
  const categoryFilteredProducts = allProducts.filter(product => {
    const matchesCategory = selectedCategory === "Todas" || product.category === selectedCategory;
    const matchesSearch = searchTerm === "" || 
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesCategory && matchesSearch;
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
            <div className="flex flex-wrap gap-4 justify-center">
              <button 
                onClick={() => setSelectedCategory("Todas")}
                className={`px-4 py-2 rounded-full transition-colors ${
                  selectedCategory === "Todas" 
                    ? "bg-black text-white" 
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                Todas
              </button>
              <button 
                onClick={() => setSelectedCategory("Samsung")}
                className={`px-4 py-2 rounded-full transition-colors ${
                  selectedCategory === "Samsung" 
                    ? "bg-black text-white" 
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                Samsung
              </button>
              <button 
                onClick={() => setSelectedCategory("iPhone")}
                className={`px-4 py-2 rounded-full transition-colors ${
                  selectedCategory === "iPhone" 
                    ? "bg-black text-white" 
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                iPhone
              </button>
              <button 
                onClick={() => setSelectedCategory("Apple Watch")}
                className={`px-4 py-2 rounded-full transition-colors ${
                  selectedCategory === "Apple Watch" 
                    ? "bg-black text-white" 
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                Apple Watch
              </button>
              <button 
                onClick={() => setSelectedCategory("iPad")}
                className={`px-4 py-2 rounded-full transition-colors ${
                  selectedCategory === "iPad" 
                    ? "bg-black text-white" 
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                iPad
              </button>
              <button 
                onClick={() => setSelectedCategory("Otras Marcas")}
                className={`px-4 py-2 rounded-full transition-colors ${
                  selectedCategory === "Otras Marcas" 
                    ? "bg-black text-white" 
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                Otras Marcas
              </button>
              <button 
                onClick={() => setSelectedCategory("Sin IVA")}
                className={`px-4 py-2 rounded-full transition-colors ${
                  selectedCategory === "Sin IVA" 
                    ? "bg-black text-white" 
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                Sin IVA
              </button>
              <button 
                onClick={() => setSelectedCategory("Saldos")}
                className={`px-4 py-2 rounded-full transition-colors ${
                  selectedCategory === "Saldos" 
                    ? "bg-black text-white" 
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                Saldos
              </button>
            </div>
          </div>

          {/* Barra de búsqueda */}
          <div className="bg-white rounded-lg shadow-md p-4 mb-6">
            <div className="flex items-center space-x-4">
              <div className="flex-1">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Buscar productos..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full px-4 py-3 pl-10 pr-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none"
                  />
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                  {searchTerm && (
                    <button
                      onClick={() => setSearchTerm("")}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                    >
                      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  )}
                </div>
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
                  <button
                    onClick={() => {
                      setSearchTerm("");
                      setSelectedCategory("Todas");
                    }}
                    className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors"
                  >
                    Ver todos los productos
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </HomeLayout>
  );
}
