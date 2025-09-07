import ProductCard from "../atoms/ProductCard";

interface ProductGridProps {
  products: {
    image: string;
    title: string;
    price: string;
    oldPrice?: string;
    cuotas?: string;
    tags?: string[];
    discount?: string;
  }[];
}

export default function ProductGrid({ products }: ProductGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products.map((product, idx) => (
        <ProductCard key={idx} {...product} />
      ))}
    </div>
  );
}
