import ProductGrid from "../molecules/ProductGrid";

interface Product {
  id: string;
  image: string;
  title: string;
  price: string;
  oldPrice?: string;
  cuotas: string;
  tags: string[];
  discount?: string;
}

interface ProductSectionProps {
  title: string;
  products: Product[];
  showFilter?: boolean;
  showAll?: boolean;
  onToggleShowAll?: () => void;
}

export default function ProductSection({
  title,
  products,
  showFilter = true,
  showAll = false,
  onToggleShowAll,
}: ProductSectionProps) {
  return (
    <section className="max-w-7xl mx-auto px-6 py-12">
      {/* Grid de productos */}
      <ProductGrid products={products} />

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
