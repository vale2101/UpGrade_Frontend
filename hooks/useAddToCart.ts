import { useCart } from "../contexts/CartContext";

interface Product {
  id: string;
  name: string;
  image: string;
  currentPrice: string;
  originalPrice?: string;
  discount?: string;
  condition: string;
  capacity?: string | string[];
  color?: string | string[];
  category: string;
}

export function useAddToCart() {
  const { addToCart } = useCart();

  const handleAddToCart = (product: Product, options?: {
    capacity?: string;
    color?: string;
    condition?: string;
  }) => {
    addToCart({
      id: product.id,
      name: product.name,
      image: product.image,
      price: product.currentPrice,
      originalPrice: product.originalPrice,
      discount: product.discount,
      condition: options?.condition || product.condition,
      capacity: options?.capacity || (Array.isArray(product.capacity) ? product.capacity[0] : product.capacity) || "128GB",
      color: options?.color || (Array.isArray(product.color) ? product.color[0] : product.color) || "Gray",
      category: product.category
    });
  };

  return { handleAddToCart };
}

