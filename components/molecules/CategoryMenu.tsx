"use client";
import CategoryIcon from "../atoms/CategoryIcon";
import { useCategory } from "../../contexts/CategoryContext";

const categories = [
  { src: "https://clevercel.co/cdn/shop/files/menu-samsung.png", label: "Samsung" },
  { src: "https://clevercel.co/cdn/shop/files/menu-iphone.png", label: "iPhone" },
  { src: "https://clevercel.co/cdn/shop/files/menu-watch.png", label: "Apple Watch" },
  { src: "https://clevercel.co/cdn/shop/files/menu-ipad.png", label: "iPad" },
  { src: "https://clevercel.co/cdn/shop/files/menu-huawei.png", label: "Otras Marcas" },
  { src: "https://clevercel.co/cdn/shop/files/menu-promociones.png", label: "Sin IVA" },
  { src: "https://clevercel.co/cdn/shop/files/Icono_menu_full_saldos.png", label: "Saldos" },
];

export default function CategoryMenu() {
  const { setSelectedCategory } = useCategory();

  const handleCategoryClick = (category: string) => {
    
    setSelectedCategory(category);
  };

  return (
    <div className="bg-white shadow-sm w-full">
      <div className="flex items-center justify-center gap-8 py-4">
        {categories.map((c) => (
          <CategoryIcon 
            key={c.label} 
            src={c.src} 
            label={c.label}
            onClick={() => handleCategoryClick(c.label)}
          />
        ))}
      </div>
    </div>
  );
}

