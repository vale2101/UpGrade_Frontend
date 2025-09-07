import ProductGrid from "../molecules/ProductGrid";

interface ProductSectionProps {
  title: string;
  products: any[];
  showFilter?: boolean;
}

export default function ProductSection({
  title,
  products,
  showFilter = true,
}: ProductSectionProps) {
  return (
    <section className="max-w-7xl mx-auto px-6 py-12">
      {/* Grid de productos */}
      <ProductGrid products={products} />

      {/* Botón Ver todos */}
      <div className="flex justify-center mt-10">
        <button className="bg-black text-white px-8 py-3 rounded-full font-bold hover:bg-gray-800 transition">
          VER TODOS
        </button>
      </div>
    </section>
  );
}
