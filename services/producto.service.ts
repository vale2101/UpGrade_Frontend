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
    const response = await axios.get<ApiResponse<productoInterface[]>>(
      `${ENV.API_URL}/productos`,
      { withCredentials: true }
    );
    return response.data;
  },

  // 🔹 Obtener un producto por ID
  async getProductoById(id: number): Promise<ApiResponse<productoInterface>> {
    const response = await axios.get<ApiResponse<productoInterface>>(
      `${ENV.API_URL}/productos/${id}`,
      { withCredentials: true }
    );
    return response.data;
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
