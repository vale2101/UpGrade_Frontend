import ProductGrid from "./ProductGrid";

interface Product {
  id: string;
  name: string;
  image: string;
  currentPrice: string;
  originalPrice?: string;
  discount?: string;
  installments?: number;
  monthlyAmount?: string;
  condition: string;
}

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
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8 md:py-12">
      <ProductGrid 
        products={products} 
        onProductClick={onProductClick} 
        onAddToCart={onAddToCart}
      />

      {onToggleShowAll && (
        <div className="flex justify-center mt-6 sm:mt-8 md:mt-10">
          <button 
            onClick={onToggleShowAll}
            className="bg-black text-white px-6 sm:px-8 py-2 sm:py-3 rounded-full font-bold hover:bg-gray-800 transition text-sm sm:text-base"
          >
            {showAll ? "VER MENOS" : "VER MÁS"}
          </button>
        </div>
      )}
    </section>
  );
}

