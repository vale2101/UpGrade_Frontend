"use client";

import { useState } from "react";
import ProductSection from "../organisms/ProductSection";

const productosDemo = [
  {
    id: "1",
    image: "/s24ultra.png",
    title: "Samsung Galaxy S24 Ultra 5G",
    price: "Desde $3.599.900",
    oldPrice: "Antes $4.099.900",
    cuotas: "6 cuotas 0% interés $599.983*",
    tags: ["Outlet", "Semi Nuevo"],
    discount: "-12%",
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
  },
  {
    id: "5",
    image: "/api/placeholder/300/300",
    title: "iPhone 15 Pro Max",
    price: "Desde $4.299.900",
    oldPrice: "Antes $4.999.900",
    cuotas: "12 cuotas 0% interés $358.325*",
    tags: ["Como Nuevo"],
    discount: "-14%",
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
  },
  {
    id: "7",
    image: "/api/placeholder/300/300",
    title: "iPad Air 5ta Gen",
    price: "Desde $2.499.900",
    oldPrice: "Antes $2.999.900",
    cuotas: "6 cuotas 0% interés $416.650*",
    tags: ["Como Nuevo"],
    discount: "-17%",
  },
  {
    id: "8",
    image: "/api/placeholder/300/300",
    title: "MacBook Air M2",
    price: "Desde $3.999.900",
    oldPrice: "Antes $4.499.900",
    cuotas: "12 cuotas 0% interés $333.325*",
    tags: ["Outlet"],
    discount: "-11%",
  },
];

export default function ProductLayout() {
  const [showAll, setShowAll] = useState(false);
  
  const displayedProducts = showAll ? productosDemo : productosDemo.slice(0, 4);

  return (
    <main>
      {/* Aquí puedes meter más secciones si quieres */}
      <ProductSection 
        title="Productos Destacados" 
        products={displayedProducts}
        showAll={showAll}
        onToggleShowAll={() => setShowAll(!showAll)}
      />
    </main>
  );
}
