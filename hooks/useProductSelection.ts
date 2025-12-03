"use client";
import { useState, useEffect, useMemo } from "react";
import { useProduct } from "./useProduct";

interface Product {
  condition?: string;
  capacity?: string | string[];
  color?: string | string[];
}

interface UseProductSelectionProps {
  product?: Product | null;
  productId?: number | string | null;
}

export function useProductSelection({ product, productId }: UseProductSelectionProps = {}) {
  const { product: productoBackend } = useProduct(productId || null);
  
  const initialValues = useMemo(() => {
    if (productoBackend) {
      return {
        condition: productoBackend.tipo || product?.condition || "Reacondicionado",
        capacity: productoBackend.capacidad || 
          (Array.isArray(product?.capacity) ? product.capacity[0] : product?.capacity) || 
          "128GB",
        color: productoBackend.color || 
          (Array.isArray(product?.color) ? product.color[0] : product?.color) || 
          "Negro",
      };
    }
    if (product) {
      return {
        condition: product.condition || "Reacondicionado",
        capacity: Array.isArray(product.capacity) 
          ? product.capacity[0] 
          : product.capacity || "128GB",
        color: Array.isArray(product.color) 
          ? product.color[0] 
          : product.color || "Negro",
      };
    }
    return {
      condition: "Reacondicionado",
      capacity: "128GB",
      color: "Negro",
    };
  }, [productoBackend, product]);

  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedCondition, setSelectedCondition] = useState(initialValues.condition);
  const [selectedCapacity, setSelectedCapacity] = useState(initialValues.capacity);
  const [selectedColor, setSelectedColor] = useState(initialValues.color);
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);

  useEffect(() => {
    if (productoBackend) {
      if (productoBackend.tipo) {
        setSelectedCondition(productoBackend.tipo);
      }
      if (productoBackend.capacidad) {
        setSelectedCapacity(productoBackend.capacidad);
      }
      if (productoBackend.color) {
        setSelectedColor(productoBackend.color);
      }
    } else if (product) {
      if (product.condition) {
        setSelectedCondition(product.condition);
      }
      const cap = Array.isArray(product.capacity) ? product.capacity[0] : product.capacity;
      if (cap) {
        setSelectedCapacity(cap);
      }
      const col = Array.isArray(product.color) ? product.color[0] : product.color;
      if (col) {
        setSelectedColor(col);
      }
    }
  }, [productoBackend?.tipo, productoBackend?.capacidad, productoBackend?.color, product?.condition, product?.capacity, product?.color]);

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

