import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "../contexts/CartContext";

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
  category: string;
  capacity?: string | string[];
  color?: string | string[];
}

interface UseProductsShowcaseProps {
  products: Product[];
  onAddToCart?: (productId: string) => void;
}

export function useProductsShowcase({ products, onAddToCart }: UseProductsShowcaseProps) {
  const [showAll, setShowAll] = useState(false);
  const router = useRouter();
  const { addToCart } = useCart();
  
  const displayedProducts = showAll ? products : products.slice(0, 4);

  const formattedProducts = displayedProducts.map(product => ({
    id: product.id,
    name: product.name,
    image: product.image,
    currentPrice: product.currentPrice,
    originalPrice: product.originalPrice,
    discount: product.discount,
    installments: product.installments || 6,
    monthlyAmount: product.monthlyAmount || "$0",
    condition: product.condition,
    category: product.category
  }));

  const handleProductClick = (productId: string) => {
    router.push(`/producto/${productId}`);
  };

  const handleAddToCart = (productId: string) => {
    const product = products.find(p => p.id === productId);
    if (product) {
      addToCart({
        id: product.id,
        name: product.name,
        image: product.image,
        price: product.currentPrice,
        originalPrice: product.originalPrice,
        discount: product.discount,
        condition: product.condition,
        capacity: Array.isArray(product.capacity) ? product.capacity[0] : product.capacity || "",
        color: Array.isArray(product.color) ? product.color[0] : product.color || "",
        category: product.category
      });
    }
    onAddToCart?.(productId);
  };

  return {
    showAll,
    setShowAll,
    formattedProducts,
    handleProductClick,
    handleAddToCart
  };
}

