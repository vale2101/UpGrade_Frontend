"use client";

import { useState, useEffect } from "react";
import { ProductoService } from "../services/producto.service";
import { productoInterface } from "../interfaces/producto.interface";

export function useProducts() {
  const [products, setProducts] = useState<productoInterface[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await ProductoService.getProductos();

        if (response.success && response.data) {
          setProducts(response.data as productoInterface[]);
        } else {
          setError(response.message || "Error al obtener productos");
          setProducts([]);
        }
      } catch (err: any) {
        console.error("Error fetching products:", err);
        setError(err.message || "Error al cargar los productos");
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const refetch = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await ProductoService.getProductos();
      if (response.success && response.data) {
        setProducts(response.data as productoInterface[]);
      } else {
        setError(response.message || "Error al obtener productos");
      }
    } catch (err: any) {
      setError(err.message || "Error al cargar los productos");
    } finally {
      setLoading(false);
    }
  };

  const createProduct = async (data: productoInterface) => {
    try {
      setLoading(true);
      setError(null);
      const response = await ProductoService.createProducto(data);
      if (response.success && response.data) {
        setProducts(prev => [...prev, response.data!]);
        return { success: true, data: response.data };
      } else {
        const errorMsg = response.message || "Error al crear el producto";
        setError(errorMsg);
        return { success: false, error: errorMsg };
      }
    } catch (err: any) {
      const errorMsg = err.message || "Error al crear el producto";
      setError(errorMsg);
      return { success: false, error: errorMsg };
    } finally {
      setLoading(false);
    }
  };

  const updateProduct = async (id: number, data: productoInterface) => {
    try {
      setLoading(true);
      setError(null);
      const response = await ProductoService.updateProducto(id, data);
      if (response.success && response.data) {
        setProducts(prev => 
          prev.map(p => p.id_producto === id ? response.data! : p)
        );
        return { success: true, data: response.data };
      } else {
        const errorMsg = response.message || "Error al actualizar el producto";
        setError(errorMsg);
        return { success: false, error: errorMsg };
      }
    } catch (err: any) {
      const errorMsg = err.message || "Error al actualizar el producto";
      setError(errorMsg);
      return { success: false, error: errorMsg };
    } finally {
      setLoading(false);
    }
  };

  const deleteProduct = async (id: number) => {
    try {
      setLoading(true);
      setError(null);
      const response = await ProductoService.deleteProducto(id);
      if (response.success) {
        setProducts(prev => prev.filter(p => p.id_producto !== id));
        return { success: true };
      } else {
        const errorMsg = response.message || "Error al eliminar el producto";
        setError(errorMsg);
        return { success: false, error: errorMsg };
      }
    } catch (err: any) {
      const errorMsg = err.message || "Error al eliminar el producto";
      setError(errorMsg);
      return { success: false, error: errorMsg };
    } finally {
      setLoading(false);
    }
  };

  return { 
    products, 
    loading, 
    error, 
    refetch,
    createProduct,
    updateProduct,
    deleteProduct
  };
}
