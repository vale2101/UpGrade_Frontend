import ProductGrid from "./ProductGrid";
import { Product } from "../../contexts/DataContext";

interface ProductSectionProps {
  products: Product[];
  showAll?: boolean;
  onToggleShowAll?: () => void;
  onProductClick?: (productId: string) => void;
  onAddToCart?: (productId: string) => void;
}

export default function ProductSection({
  products,
  showAll = false,
  onToggleShowAll,
  onProductClick,
  onAddToCart,
}: ProductSectionProps) {
  return (
    <section className="max-w-7xl mx-auto px-6 py-12">
      <ProductGrid 
        products={products} 
        onProductClick={onProductClick} 
        onAddToCart={onAddToCart}
      />

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

