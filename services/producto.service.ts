"use client";

import axios from "axios";
import { ENV } from "../config/env";
import { productoInterface } from "../interfaces/producto.interface";

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data?: T;
}

export const ProductoService = {
  // 🔹 Obtener todos los productos
  async getProductos(): Promise<ApiResponse<productoInterface[]>> {
    const response = await axios.get<any>(
      `${ENV.API_URL}/productos`,
      { withCredentials: true }
    );
    
    // Normalizar la respuesta: el backend puede devolver { data: [...] } directamente
    if (response.data?.data && Array.isArray(response.data.data)) {
      return {
        success: true,
        message: "Productos obtenidos correctamente",
        data: response.data.data as productoInterface[]
      };
    }
    
    // Si ya tiene la estructura ApiResponse, devolverla tal cual
    if (response.data?.success !== undefined) {
      return response.data as ApiResponse<productoInterface[]>;
    }
    
    // Si viene directamente como array, envolverlo
    if (Array.isArray(response.data)) {
      return {
        success: true,
        message: "Productos obtenidos correctamente",
        data: response.data as productoInterface[]
      };
    }
    
    return {
      success: false,
      message: "Formato de respuesta inesperado",
      data: undefined
    };
  },

  // 🔹 Obtener un producto por ID
  async getProductoById(id: number): Promise<ApiResponse<productoInterface>> {
    const response = await axios.get<any>(
      `${ENV.API_URL}/productos/${id}`,
      { withCredentials: true }
    );
    
    // Normalizar la respuesta: el backend puede devolver { data: {...} } directamente
    if (response.data?.data && !Array.isArray(response.data.data)) {
      return {
        success: true,
        message: "Producto obtenido correctamente",
        data: response.data.data as productoInterface
      };
    }
    
    // Si ya tiene la estructura ApiResponse, devolverla tal cual
    if (response.data?.success !== undefined) {
      return response.data as ApiResponse<productoInterface>;
    }
    
    // Si viene directamente como objeto producto, envolverlo
    if (response.data?.id_producto || response.data?.nombre) {
      return {
        success: true,
        message: "Producto obtenido correctamente",
        data: response.data as productoInterface
      };
    }
    
    return {
      success: false,
      message: "Producto no encontrado",
      data: undefined
    };
  },

  // 🔹 Crear un nuevo producto
  async createProducto(data: productoInterface): Promise<ApiResponse<productoInterface>> {
    const response = await axios.post<ApiResponse<productoInterface>>(
      `${ENV.API_URL}/productos`,
      data,
      { withCredentials: true }
    );
    return response.data;
  },

  // 🔹 Actualizar un producto existente
  async updateProducto(id: number, data: productoInterface): Promise<ApiResponse<productoInterface>> {
    const response = await axios.put<ApiResponse<productoInterface>>(
      `${ENV.API_URL}/productos/${id}`,
      data,
      { withCredentials: true }
    );
    return response.data;
  },

  // 🔹 Eliminar un producto
  async deleteProducto(id: number): Promise<ApiResponse<null>> {
    const response = await axios.delete<ApiResponse<null>>(
      `${ENV.API_URL}/productos/${id}`,
      { withCredentials: true }
    );
    return response.data;
  },
};
