"use client";

import { useState } from "react";
import HomeLayout from "../../components/layouts/HomeLayout";
import FilterSidebar from "../../components/organisms/FilterSidebar";
import ProductListing from "../../components/organisms/ProductListing";

export default function PromotionsPage() {
  const [products] = useState([
    {
      id: "1",
      name: "Samsung Galaxy A05S",
      image: "/api/placeholder/300/300",
      currentPrice: "$299.900",
      installments: 6,
      monthlyAmount: "$49.983",
      condition: "Como Nuevo" as const
    },
    {
      id: "2", 
      name: "Samsung Galaxy A13 (2022)",
      image: "/api/placeholder/300/300",
      currentPrice: "$299.900",
      originalPrice: "$349.900",
      discount: "14%",
      installments: 6,
      monthlyAmount: "$49.983",
      condition: "Outlet" as const
    },
    {
      id: "3",
      name: "iPad Mini 4 4ta Gen",
      image: "/api/placeholder/300/300", 
      currentPrice: "$424.900",
      originalPrice: "$539.900",
      discount: "21%",
      installments: 6,
      monthlyAmount: "$70.817",
      condition: "Outlet" as const
    },
    {
      id: "4",
      name: "Vivo Y22s",
      image: "/api/placeholder/300/300",
      currentPrice: "$429.900", 
      originalPrice: "$479.900",
      discount: "10%",
      installments: 6,
      monthlyAmount: "$71.650",
      condition: "Outlet" as const
    },
    {
      id: "5",
      name: "iPhone 13 Pro",
      image: "/api/placeholder/300/300",
      currentPrice: "$1.299.900",
      originalPrice: "$1.499.900", 
      discount: "13%",
      installments: 12,
      monthlyAmount: "$108.325",
      condition: "Como Nuevo" as const
    },
    {
      id: "6",
      name: "Samsung Galaxy S22",
      image: "/api/placeholder/300/300",
      currentPrice: "$899.900",
      originalPrice: "$1.099.900",
      discount: "18%", 
      installments: 12,
      monthlyAmount: "$74.992",
      condition: "Outlet" as const
    }
  ]);

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
              <button className="px-4 py-2 bg-blue-100 text-blue-700 rounded-full hover:bg-blue-200 transition-colors">
                Samsung
              </button>
              <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition-colors">
                iPhone
              </button>
              <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition-colors">
                Apple Watch
              </button>
              <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition-colors">
                iPad
              </button>
              <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition-colors">
                Otras Marcas
              </button>
              <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition-colors">
                Sin IVA
              </button>
              <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition-colors">
                Saldos
              </button>
            </div>
          </div>

          {/* Contenido principal */}
          <div className="flex gap-6">
            <FilterSidebar />
            <ProductListing 
              products={products} 
              onAddToCart={handleAddToCart}
            />
          </div>
        </div>
      </div>
    </HomeLayout>
  );
}
