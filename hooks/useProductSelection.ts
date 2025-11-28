import { useState } from "react";

interface Product {
  condition?: string;
  capacity?: string | string[];
  color?: string | string[];
}

export function useProductSelection(product: Product | null) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedCondition, setSelectedCondition] = useState(
    product?.condition || "Outlet"
  );
  const [selectedCapacity, setSelectedCapacity] = useState(
    Array.isArray(product?.capacity) 
      ? product.capacity[0] 
      : product?.capacity || "128GB"
  );
  const [selectedColor, setSelectedColor] = useState(
    Array.isArray(product?.color) 
      ? product.color[0] 
      : product?.color || "Gray"
  );
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);

  const showAddedToCart = () => {
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 3000);
  };

  return {
    selectedImage,
    setSelectedImage,
    selectedCondition,
    setSelectedCondition,
    selectedCapacity,
    setSelectedCapacity,
    selectedColor,
    setSelectedColor,
    quantity,
    setQuantity,
    addedToCart,
    showAddedToCart
  };
}

