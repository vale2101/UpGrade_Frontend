"use client";

import { useState, useEffect } from "react";
import { ProductoService } from "../services/producto.service";
import { productoInterface } from "../interfaces/producto.interface";

export function useProduct(productId: number | string | null) {
  const [product, setProduct] = useState<productoInterface | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!productId) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        
        const id = typeof productId === "string" ? parseInt(productId) : productId;
        
        if (isNaN(id)) {
          setError("ID de producto inválido");
          setLoading(false);
          return;
        }

        const response = await ProductoService.getProductoById(id);

        if (response.success && response.data) {
          setProduct(response.data);
        } else {
          setError(response.message || "Producto no encontrado");
          setProduct(null);
        }
      } catch (err: any) {
        console.error("Error fetching product:", err);
        setError(err.message || "Error al cargar el producto");
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  const refetch = async () => {
    if (!productId) return;

    try {
      setLoading(true);
      setError(null);
      
      const id = typeof productId === "string" ? parseInt(productId) : productId;
      
      if (isNaN(id)) {
        setError("ID de producto inválido");
        setLoading(false);
        return;
      }

      const response = await ProductoService.getProductoById(id);
      
      if (response.success && response.data) {
        setProduct(response.data);
      } else {
        setError(response.message || "Producto no encontrado");
        setProduct(null);
      }
    } catch (err: any) {
      console.error("Error fetching product:", err);
      setError(err.message || "Error al cargar el producto");
      setProduct(null);
    } finally {
      setLoading(false);
    }
  };

  return { product, loading, error, refetch };
}

