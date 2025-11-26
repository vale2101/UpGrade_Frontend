"use client";
import CategoryIcon from "../atoms/CategoryIcon";
import { useCategory } from "../../contexts/CategoryContext";

const categories = [
  { src: "https://media.falabella.com/falabellaCO/73421300_1/w=1500,h=1500,fit=pad", label: "Samsung" },
  { src: "https://media.falabella.com/falabellaCO/73417536_1/w=1500,h=1500,fit=pad", label: "iPhone" },
  { src: "https://media.falabella.com/falabellaCO/73060557_1/w=1500,h=1500,fit=pad", label: "Apple Watch" },
  { src: "https://media.falabella.com/falabellaCO/73354833_1/w=1500,h=1500,fit=pad", label: "iPad" },
  { src: "https://media.falabella.com/falabellaCO/73329917_1/w=1500,h=1500,fit=pad", label: "Otras Marcas" },
  { src: "https://media.falabella.com/falabellaCO/73434923_1/w=1500,h=1500,fit=pad", label: "Sin IVA" },
  { src: "https://media.falabella.com/falabellaCO/73477905_1/w=1500,h=1500,fit=pad", label: "Saldos" },
];

export default function CategoryMenu() {
  const { setSelectedCategory } = useCategory();

  const handleCategoryClick = (category: string) => {
    
    setSelectedCategory(category);
  };

  return (
    <div className="bg-white shadow-sm w-full">
      <div className="flex items-center justify-start sm:justify-center gap-4 sm:gap-6 lg:gap-8 py-3 sm:py-4 overflow-x-auto scrollbar-hide px-4 sm:px-0">
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

