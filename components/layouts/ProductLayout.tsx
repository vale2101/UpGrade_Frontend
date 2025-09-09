"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import ProductSection from "../organisms/ProductSection";
import { useCategory } from "../../contexts/CategoryContext";

const productosDemo = [
  // Samsung
  {
    id: "1",
    image: "/s24ultra.png",
    title: "Samsung Galaxy S24 Ultra 5G",
    price: "Desde $3.599.900",
    oldPrice: "Antes $4.099.900",
    cuotas: "6 cuotas 0% interés $599.983*",
    tags: ["Outlet", "Semi Nuevo"],
    discount: "-12%",
    category: "Samsung"
  },
  {
    id: "2",
    image: "/zfold5.png",
    title: "Samsung Galaxy Z Fold 5 (2024)",
    price: "Desde $3.599.900",
    oldPrice: "Antes $5.099.900",
    cuotas: "6 cuotas 0% interés $599.983*",
    tags: ["Outlet"],
    discount: "-29%",
    category: "Samsung"
  },
  {
    id: "3",
    image: "/s24plus.png",
    title: "Samsung Galaxy S24 Plus 5G",
    price: "Desde $2.899.900",
    oldPrice: "Antes $3.599.900",
    cuotas: "6 cuotas 0% interés $483.317*",
    tags: ["Outlet", "Semi Nuevo", "Como Nuevo"],
    discount: "-19%",
    category: "Samsung"
  },
  {
    id: "4",
    image: "/zfold4.png",
    title: "Samsung Galaxy Z Fold 4 (2023)",
    price: "Desde $2.799.900",
    oldPrice: "Antes $4.299.900",
    cuotas: "6 cuotas 0% interés $466.650*",
    tags: ["Outlet"],
    discount: "-35%",
    category: "Samsung"
  },
  {
    id: "6",
    image: "/api/placeholder/300/300",
    title: "Samsung Galaxy A54 5G",
    price: "Desde $1.899.900",
    oldPrice: "Antes $2.299.900",
    cuotas: "6 cuotas 0% interés $316.650*",
    tags: ["Outlet"],
    discount: "-17%",
    category: "Samsung"
  },
  // iPhone
  {
    id: "5",
    image: "/api/placeholder/300/300",
    title: "iPhone 15 Pro Max",
    price: "Desde $4.299.900",
    oldPrice: "Antes $4.999.900",
    cuotas: "12 cuotas 0% interés $358.325*",
    tags: ["Como Nuevo"],
    discount: "-14%",
    category: "iPhone"
  },
  {
    id: "9",
    image: "/api/placeholder/300/300",
    title: "iPhone 15 Pro",
    price: "Desde $3.799.900",
    oldPrice: "Antes $4.299.900",
    cuotas: "12 cuotas 0% interés $316.658*",
    tags: ["Como Nuevo"],
    discount: "-12%",
    category: "iPhone"
  },
  {
    id: "10",
    image: "/api/placeholder/300/300",
    title: "iPhone 14 Pro Max",
    price: "Desde $3.299.900",
    oldPrice: "Antes $3.999.900",
    cuotas: "12 cuotas 0% interés $274.992*",
    tags: ["Outlet"],
    discount: "-18%",
    category: "iPhone"
  },
  // Apple Watch
  {
    id: "11",
    image: "/api/placeholder/300/300",
    title: "Apple Watch Series 9",
    price: "Desde $1.999.900",
    oldPrice: "Antes $2.399.900",
    cuotas: "6 cuotas 0% interés $333.317*",
    tags: ["Como Nuevo"],
    discount: "-17%",
    category: "Apple Watch"
  },
  {
    id: "12",
    image: "/api/placeholder/300/300",
    title: "Apple Watch Series 8",
    price: "Desde $1.599.900",
    oldPrice: "Antes $1.999.900",
    cuotas: "6 cuotas 0% interés $266.650*",
    tags: ["Outlet"],
    discount: "-20%",
    category: "Apple Watch"
  },
  // iPad
  {
    id: "7",
    image: "/api/placeholder/300/300",
    title: "iPad Air 5ta Gen",
    price: "Desde $2.499.900",
    oldPrice: "Antes $2.999.900",
    cuotas: "6 cuotas 0% interés $416.650*",
    tags: ["Como Nuevo"],
    discount: "-17%",
    category: "iPad"
  },
  {
    id: "13",
    image: "/api/placeholder/300/300",
    title: "iPad Pro 12.9\"",
    price: "Desde $3.999.900",
    oldPrice: "Antes $4.499.900",
    cuotas: "12 cuotas 0% interés $333.325*",
    tags: ["Como Nuevo"],
    discount: "-11%",
    category: "iPad"
  },
  {
    id: "14",
    image: "/api/placeholder/300/300",
    title: "iPad Mini 6ta Gen",
    price: "Desde $1.899.900",
    oldPrice: "Antes $2.299.900",
    cuotas: "6 cuotas 0% interés $316.650*",
    tags: ["Outlet"],
    discount: "-17%",
    category: "iPad"
  },
  // Otras Marcas
  {
    id: "15",
    image: "/api/placeholder/300/300",
    title: "Huawei P60 Pro",
    price: "Desde $2.199.900",
    oldPrice: "Antes $2.699.900",
    cuotas: "6 cuotas 0% interés $366.650*",
    tags: ["Como Nuevo"],
    discount: "-19%",
    category: "Otras Marcas"
  },
  {
    id: "16",
    image: "/api/placeholder/300/300",
    title: "Xiaomi 13 Pro",
    price: "Desde $1.799.900",
    oldPrice: "Antes $2.199.900",
    cuotas: "6 cuotas 0% interés $299.983*",
    tags: ["Outlet"],
    discount: "-18%",
    category: "Otras Marcas"
  },
  {
    id: "17",
    image: "/api/placeholder/300/300",
    title: "OnePlus 11",
    price: "Desde $1.599.900",
    oldPrice: "Antes $1.999.900",
    cuotas: "6 cuotas 0% interés $266.650*",
    tags: ["Como Nuevo"],
    discount: "-20%",
    category: "Otras Marcas"
  },
  // MacBook (mantener como ejemplo)
  {
    id: "8",
    image: "/api/placeholder/300/300",
    title: "MacBook Air M2",
    price: "Desde $3.999.900",
    oldPrice: "Antes $4.499.900",
    cuotas: "12 cuotas 0% interés $333.325*",
    tags: ["Outlet"],
    discount: "-11%",
    category: "Otras Marcas"
  },
  // Sin IVA
  {
    id: "18",
    image: "/api/placeholder/300/300",
    title: "Samsung Galaxy S23 Sin IVA",
    price: "Desde $1.199.900",
    oldPrice: "Antes $1.399.900",
    cuotas: "12 cuotas 0% interés $99.992*",
    tags: ["Como Nuevo"],
    discount: "-14%",
    category: "Sin IVA"
  },
  {
    id: "19",
    image: "/api/placeholder/300/300",
    title: "iPhone 14 Sin IVA",
    price: "Desde $2.199.900",
    oldPrice: "Antes $2.599.900",
    cuotas: "12 cuotas 0% interés $183.325*",
    tags: ["Como Nuevo"],
    discount: "-15%",
    category: "Sin IVA"
  },
  {
    id: "20",
    image: "/api/placeholder/300/300",
    title: "iPad Air Sin IVA",
    price: "Desde $1.999.900",
    oldPrice: "Antes $2.399.900",
    cuotas: "12 cuotas 0% interés $166.658*",
    tags: ["Como Nuevo"],
    discount: "-17%",
    category: "Sin IVA"
  },
  {
    id: "21",
    image: "/api/placeholder/300/300",
    title: "Apple Watch Series 8 Sin IVA",
    price: "Desde $1.299.900",
    oldPrice: "Antes $1.599.900",
    cuotas: "6 cuotas 0% interés $216.650*",
    tags: ["Como Nuevo"],
    discount: "-19%",
    category: "Sin IVA"
  },
  // Saldos
  {
    id: "22",
    image: "/api/placeholder/300/300",
    title: "iPhone 13 Pro Max Saldos",
    price: "Desde $1.999.900",
    oldPrice: "Antes $2.999.900",
    cuotas: "12 cuotas 0% interés $166.658*",
    tags: ["Outlet"],
    discount: "-33%",
    category: "Saldos"
  },
  {
    id: "23",
    image: "/api/placeholder/300/300",
    title: "Samsung Galaxy A54 Saldos",
    price: "Desde $999.900",
    oldPrice: "Antes $1.599.900",
    cuotas: "6 cuotas 0% interés $166.650*",
    tags: ["Outlet"],
    discount: "-38%",
    category: "Saldos"
  },
  {
    id: "24",
    image: "/api/placeholder/300/300",
    title: "iPad 9na Gen Saldos",
    price: "Desde $1.299.900",
    oldPrice: "Antes $1.999.900",
    cuotas: "6 cuotas 0% interés $216.650*",
    tags: ["Outlet"],
    discount: "-35%",
    category: "Saldos"
  },
  {
    id: "25",
    image: "/api/placeholder/300/300",
    title: "Apple Watch SE Saldos",
    price: "Desde $799.900",
    oldPrice: "Antes $1.299.900",
    cuotas: "6 cuotas 0% interés $133.317*",
    tags: ["Outlet"],
    discount: "-38%",
    category: "Saldos"
  },
];

export default function ProductLayout() {
  const [showAll, setShowAll] = useState(false);
  const { selectedCategory } = useCategory();
  const router = useRouter();
  
  // Filtrar productos por categoría seleccionada
  const filteredProducts = productosDemo.filter(product => 
    product.category === selectedCategory
  );
  
  const displayedProducts = showAll ? filteredProducts : filteredProducts.slice(0, 4);

  // Convertir productos al formato esperado por ProductSection
  const formattedProducts = displayedProducts.map(product => ({
    id: product.id,
    image: product.image,
    title: product.title,
    price: product.price,
    oldPrice: product.oldPrice,
    cuotas: product.cuotas,
    tags: product.tags,
    discount: product.discount
  }));

  const handleProductClick = (productId: string) => {
    router.push(`/producto/${productId}`);
  };

  return (
    <main>
      {/* Aquí puedes meter más secciones si quieres */}
      <ProductSection 
        title="Productos Destacados" 
        products={formattedProducts}
        showAll={showAll}
        onToggleShowAll={() => setShowAll(!showAll)}
        onProductClick={handleProductClick}
      />
    </main>
  );
}
