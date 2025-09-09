"use client";
import { useRouter } from "next/navigation";
import CategoryIcon from "../atoms/CategoryIcon";
import { useCategory } from "../../contexts/CategoryContext";

const categories = [
  { src: "https://clevercel.co/cdn/shop/files/menu-samsung.png", label: "Samsung", slug: "samsung" },
  { src: "https://clevercel.co/cdn/shop/files/menu-iphone.png", label: "iPhone", slug: "iphone" },
  { src: "https://clevercel.co/cdn/shop/files/menu-watch.png", label: "Apple Watch", slug: "apple-watch" },
  { src: "https://clevercel.co/cdn/shop/files/menu-ipad.png", label: "iPad", slug: "ipad" },
  { src: "https://clevercel.co/cdn/shop/files/menu-huawei.png", label: "Otras Marcas", slug: "otras-marcas" },
  { src: "https://clevercel.co/cdn/shop/files/menu-promociones.png", label: "Sin IVA", slug: "sin-iva" },
  { src: "https://clevercel.co/cdn/shop/files/Icono_menu_full_saldos.png", label: "Saldos", slug: "saldos" },
];

export default function CategoryMenu() {
  const router = useRouter();
  const { setSelectedCategory } = useCategory();

  const handleCategoryClick = (category: string, slug: string) => {
    // Actualizar la categoría seleccionada en el contexto
    setSelectedCategory(category);
    // Navegar a la página de la categoría
    router.push(`/categoria/${slug}`);
  };

  return (
    <div className="bg-white shadow-sm w-full">
      <div className="flex items-center justify-center gap-8 py-4">
        {categories.map((c) => (
          <CategoryIcon 
            key={c.label} 
            src={c.src} 
            label={c.label}
            onClick={() => handleCategoryClick(c.label, c.slug)}
          />
        ))}
      </div>
    </div>
  );
}

