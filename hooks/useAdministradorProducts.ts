"use client";

import { useState, useEffect } from "react";
import { ProductoService } from "../services/producto.service";
import { productoInterface } from "../interfaces/producto.interface";
import Swal from "sweetalert2";

export function useAdministradorProducts() {
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

  const createProduct = async (data: productoInterface) => {
    try {
      setError(null);
      const response = await ProductoService.createProducto(data);
      
      const isSuccess = response.success || 
                       response.message?.toLowerCase().includes('creado') ||
                       response.message?.toLowerCase().includes('correctamente');
      
      if (isSuccess) {
        await Swal.fire({
          icon: 'success',
          title: 'Éxito',
          text: response.message || 'Producto creado correctamente',
          timer: 2000,
          showConfirmButton: false
        });
        await loadProducts(false); 
        return { success: true, data: response.data };
      } else {
        throw new Error(response.message || "Error al crear el producto");
      }
    } catch (err: any) {
      const errorMessage = err?.response?.data?.message || err.message || 'Error al crear el producto';
      const isSuccessMessage = errorMessage.toLowerCase().includes('creado') || 
                               errorMessage.toLowerCase().includes('correctamente');

      if (isSuccessMessage) {
        await Swal.fire({
          icon: 'success',
          title: 'Éxito',
          text: errorMessage,
          timer: 2000,
          showConfirmButton: false
        });
        await loadProducts(false); 
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

  const updateProduct = async (id: number, data: productoInterface) => {
    try {
      setError(null);
      const response = await ProductoService.updateProducto(id, data);
      
      const isSuccess = response.success || 
                       response.message?.toLowerCase().includes('actualizado') ||
                       response.message?.toLowerCase().includes('correctamente');
      
      if (isSuccess) {
        await Swal.fire({
          icon: 'success',
          title: 'Éxito',
          text: response.message || 'Producto actualizado correctamente',
          timer: 2000,
          showConfirmButton: false
        });
        await loadProducts(false); 
        return { success: true, data: response.data };
      } else {
        throw new Error(response.message || "Error al actualizar el producto");
      }
    } catch (err: any) {
      const errorMessage = err?.response?.data?.message || err.message || 'Error al actualizar el producto';
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
        await loadProducts(false); 
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

  const deleteProduct = async (id: number) => {
    const result = await Swal.fire({
      title: '¿Estás seguro?',
      text: "No podrás revertir esta acción",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    });

    if (!result.isConfirmed) {
      return { success: false, cancelled: true };
    }

    try {
      setError(null);
      const response = await ProductoService.deleteProducto(id);
      
      const isSuccess = response.success || 
                       response.message?.toLowerCase().includes('eliminado') ||
                       response.message?.toLowerCase().includes('correctamente');
      
      if (isSuccess) {
        await Swal.fire({
          icon: 'success',
          title: 'Éxito',
          text: response.message || 'Producto eliminado correctamente',
          timer: 2000,
          showConfirmButton: false
        });
        await loadProducts(false); 
        return { success: true };
      } else {
        throw new Error(response.message || "Error al eliminar el producto");
      }
    } catch (err: any) {
      const errorMessage = err?.response?.data?.message || err.message || 'Error al eliminar el producto';
      const isSuccessMessage = errorMessage.toLowerCase().includes('eliminado') || 
                               errorMessage.toLowerCase().includes('correctamente');

      if (isSuccessMessage) {
        await Swal.fire({
          icon: 'success',
          title: 'Éxito',
          text: errorMessage,
          timer: 2000,
          showConfirmButton: false
        });
        await loadProducts(false); 
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
    createProduct,
    updateProduct,
    deleteProduct
  };
}

