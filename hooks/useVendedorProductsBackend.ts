"use client";

import { useState, useEffect } from "react";
import { ProductoService } from "../services/producto.service";
import { productoInterface } from "../interfaces/producto.interface";
import Swal from "sweetalert2";

export function useVendedorProductsBackend() {
  const [products, setProducts] = useState<productoInterface[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadProducts = async (showLoading = false) => {
    try {
      if (showLoading) {
        setLoading(true);
      }
      setError(null);
      const response = await ProductoService.getProductos();
      if (response.success && response.data) {
        setProducts(response.data);
      } else {
        setError(response.message || "Error al cargar los productos");
        setProducts([]);
      }
    } catch (err: any) {
      setError(err.message || "Error inesperado al cargar los productos");
      setProducts([]);
    } finally {
      if (showLoading) {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    loadProducts(true);
  }, []);

  const updateStock = async (id: number, stock: number) => {
    try {
      setError(null);
      const response = await ProductoService.updateProductoStock(id, stock);
      
      // Verificar si la respuesta indica éxito
      const isSuccess = response.success || 
                       response.message?.toLowerCase().includes('actualizado') ||
                       response.message?.toLowerCase().includes('correctamente');
      
      if (isSuccess) {
        await Swal.fire({
          icon: 'success',
          title: 'Éxito',
          text: response.message || 'Stock actualizado correctamente',
          timer: 2000,
          showConfirmButton: false
        });
        await loadProducts(false); // Recargar sin mostrar loading
        return { success: true, data: response.data };
      } else {
        throw new Error(response.message || "Error al actualizar el stock");
      }
    } catch (err: any) {
      const errorMessage = err?.response?.data?.message || err.message || 'Error al actualizar el stock';
      const isSuccessMessage = errorMessage.toLowerCase().includes('actualizado') || 
                               errorMessage.toLowerCase().includes('correctamente');

      if (isSuccessMessage) {
        await Swal.fire({
          icon: 'success',
          title: 'Éxito',
          text: errorMessage,
          timer: 2000,
          showConfirmButton: false
        });
        await loadProducts(false); // Recargar sin mostrar loading
        return { success: true };
      } else {
        await Swal.fire({
          icon: 'error',
          title: 'Error',
          text: errorMessage
        });
        return { success: false, error: errorMessage };
      }
    }
  };

  return {
    products,
    loading,
    error,
    refetch: () => loadProducts(false),
    updateStock
  };
}

