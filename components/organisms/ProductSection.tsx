import ProductGrid from "../molecules/ProductGrid";

interface Product {
  id: string;
  name: string;
  image: string;
  currentPrice: string;
  originalPrice?: string;
  discount?: string;
  installments: number;
  monthlyAmount: string;
  condition: "Nuevo" | "Como Nuevo" | "Outlet" | "Semi Nuevo";
}

interface ProductSectionProps {
  title: string;
  products: Product[];
  showFilter?: boolean;
  showAll?: boolean;
  onToggleShowAll?: () => void;
  onProductClick?: (productId: string) => void;
  onAddToCart?: (productId: string) => void;
}

export default function ProductSection({
  title,
  products,
  showFilter = true,
  showAll = false,
  onToggleShowAll,
  onProductClick,
  onAddToCart,
}: ProductSectionProps) {
  return (
    <section className="max-w-7xl mx-auto px-6 py-12">
      {/* Grid de productos */}
      <ProductGrid 
        products={products} 
        onProductClick={onProductClick} 
        onAddToCart={onAddToCart}
      />

      {/* Botón Ver todos */}
      <div className="flex justify-center mt-10">
        <button 
          onClick={onToggleShowAll}
          className="bg-black text-white px-8 py-3 rounded-full font-bold hover:bg-gray-800 transition"
        >
          {showAll ? "VER MENOS" : "VER MÁS"}
        </button>
      </div>
    </section>
  );
}
