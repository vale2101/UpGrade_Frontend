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
  async getProductos(): Promise<ApiResponse<productoInterface[]>> {
    const response = await axios.get<any>(
      `${ENV.API_URL}/productos`,
      { withCredentials: true }
    );
    
    if (response.data?.data && Array.isArray(response.data.data)) {
      return {
        success: true,
        message: "Productos obtenidos correctamente",
        data: response.data.data as productoInterface[]
      };
    }
    
    if (response.data?.success !== undefined) {
      return response.data as ApiResponse<productoInterface[]>;
    }
    
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

  async getProductoById(id: number): Promise<ApiResponse<productoInterface>> {
    const response = await axios.get<any>(
      `${ENV.API_URL}/productos/${id}`,
      { withCredentials: true }
    );
    
    if (response.data?.data && !Array.isArray(response.data.data)) {
      return {
        success: true,
        message: "Producto obtenido correctamente",
        data: response.data.data as productoInterface
      };
    }
    
    if (response.data?.success !== undefined) {
      return response.data as ApiResponse<productoInterface>;
    }
    
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

  async createProducto(data: productoInterface): Promise<ApiResponse<productoInterface>> {
    const response = await axios.post<ApiResponse<productoInterface>>(
      `${ENV.API_URL}/productos`,
      data,
      { withCredentials: true }
    );
    return response.data;
  },

  async updateProducto(id: number, data: productoInterface): Promise<ApiResponse<productoInterface>> {
    const response = await axios.put<ApiResponse<productoInterface>>(
      `${ENV.API_URL}/productos/${id}`,
      data,
      { withCredentials: true }
    );
    return response.data;
  },

  async updateProductoStock(id: number, stock: number): Promise<ApiResponse<productoInterface>> {
    const response = await axios.put<ApiResponse<productoInterface>>(
      `${ENV.API_URL}/productos/${id}/stock`,
      { stock },
      { withCredentials: true }
    );
    return response.data;
  },

  async deleteProducto(id: number): Promise<ApiResponse<null>> {
    const response = await axios.delete<ApiResponse<null>>(
      `${ENV.API_URL}/productos/${id}`,
      { withCredentials: true }
    );
    return response.data;
  },
};
