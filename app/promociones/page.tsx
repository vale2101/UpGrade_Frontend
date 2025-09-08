"use client";

import { useState } from "react";
import HomeLayout from "../../components/layouts/HomeLayout";
import FilterSidebar from "../../components/organisms/FilterSidebar";
import ProductListing from "../../components/organisms/ProductListing";

export default function PromotionsPage() {
  const [selectedCategory, setSelectedCategory] = useState("Samsung");
  
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
    }
  ]);

  // Filtrar productos por categoría seleccionada
  const filteredProducts = allProducts.filter(product => 
    selectedCategory === "Todas" || product.category === selectedCategory
  );

  const handleAddToCart = (productId: string) => {
    console.log(`Agregando producto ${productId} al carrito`);
    // Aquí puedes agregar la lógica para agregar al carrito
  };

  return (
    <HomeLayout>
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4">
          {/* Barra de navegación de categorías */}
          <div className="bg-white rounded-lg shadow-md p-4 mb-6">
            <div className="flex flex-wrap gap-4 justify-center">
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
                onClick={() => setSelectedCategory("Todas")}
                className={`px-4 py-2 rounded-full transition-colors ${
                  selectedCategory === "Todas" 
                    ? "bg-black text-white" 
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                Todas
              </button>
            </div>
          </div>

          {/* Contenido principal */}
          <div className="flex gap-6">
            <FilterSidebar />
            <ProductListing 
              products={filteredProducts} 
              onAddToCart={handleAddToCart}
            />
          </div>
        </div>
      </div>
    </HomeLayout>
  );
}
