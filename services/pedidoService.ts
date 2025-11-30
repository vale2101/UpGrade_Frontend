"use client";

import axios from "axios";
import { ENV } from "../config/env";
import { PedidoInterface, PedidoProducto } from "../interfaces/pedido.interface";

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data?: T;
}

export const PedidoService = {
  // 🔹 Obtener todos los pedidos
  async getPedidos(): Promise<ApiResponse<PedidoInterface[]>> {
    const response = await axios.get<{ data: PedidoInterface[] }>(
      `${ENV.API_URL}/pedidos`,
      { withCredentials: true }
    );

    return {
      success: true,
      message: "Pedidos obtenidos correctamente",
      data: response.data.data
    };
  },

  // 🔹 Obtener un pedido por ID
  async getPedidoById(id: number): Promise<ApiResponse<PedidoInterface>> {
    const response = await axios.get<{ data: PedidoInterface }>(
      `${ENV.API_URL}/pedidos/${id}`,
      { withCredentials: true }
    );

    return {
      success: true,
      message: "Pedido obtenido correctamente",
      data: response.data.data
    };
  },

  // 🔹 Crear un nuevo pedido
  async createPedido(data: PedidoInterface): Promise<ApiResponse<PedidoInterface>> {
    const response = await axios.post<ApiResponse<PedidoInterface>>(
      `${ENV.API_URL}/pedidos`,
      data,
      { withCredentials: true }
    );
    return response.data;
  },

  // 🔹 Actualizar un pedido (ej. estado)
  async updatePedido(id: number, data: Partial<PedidoInterface>): Promise<ApiResponse<PedidoInterface>> {
    try {
      const response = await axios.put<ApiResponse<PedidoInterface>>(
        `${ENV.API_URL}/pedidos/${id}`,
        data,
        { withCredentials: true }
      );
      
      // Si la respuesta tiene éxito, retornarla directamente
      if (response.data && (response.data.success || response.status === 200)) {
        return {
          success: true,
          message: response.data.message || 'Pedido actualizado correctamente',
          data: response.data.data
        };
      }
      
      return response.data;
    } catch (error: any) {
      // Si hay un error pero el backend indica éxito en el mensaje
      if (error?.response?.data?.message?.toLowerCase().includes('actualizado') ||
          error?.response?.data?.message?.toLowerCase().includes('correctamente')) {
        return {
          success: true,
          message: error.response.data.message,
          data: error.response.data.data
        };
      }
      
      // Si es un error HTTP pero tiene datos, puede ser un 200 con estructura diferente
      if (error?.response?.status === 200 && error?.response?.data) {
        return {
          success: true,
          message: error.response.data.message || 'Pedido actualizado correctamente',
          data: error.response.data.data || error.response.data
        };
      }
      
      throw error;
    }
  },

  // 🔹 Eliminar un pedido
  async deletePedido(id: number): Promise<ApiResponse<null>> {
    const response = await axios.delete<ApiResponse<null>>(
      `${ENV.API_URL}/pedidos/${id}`,
      { withCredentials: true }
    );
    return response.data;
  },

  // 🔹 Obtener productos de un pedido (descomponiendo JSON)
  async getProductosByPedidoId(id_pedido: number): Promise<ApiResponse<PedidoProducto[]>> {
    try {
      const response = await axios.get<{ data: PedidoProducto[] }>(
        `${ENV.API_URL}/pedidos/${id_pedido}/productos`,
        { withCredentials: true }
      );

      return {
        success: true,
        message: "Productos obtenidos correctamente",
        data: response.data.data
      };
    } catch (error: any) {
      return {
        success: false,
        message: error.response?.data?.message || "Error al obtener los productos",
        data: undefined
      };
    }
  },

  // 🔹 Obtener pedidos por usuario
  async getPedidosByUserId(id_user: number): Promise<ApiResponse<PedidoInterface[]>> {
    try {
      const response = await axios.get<{ data: PedidoInterface[] }>(
        `${ENV.API_URL}/usuarios/${id_user}/pedidos`,
        { withCredentials: true }
      );

      return {
        success: true,
        message: "Pedidos obtenidos correctamente por usuario",
        data: response.data.data
      };
    } catch (error: any) {
      // Si es un 404, significa que el usuario no tiene pedidos (es normal para usuarios nuevos)
      if (error.response?.status === 404) {
        return {
          success: true,
          message: "No hay pedidos registrados",
          data: []
        };
      }
      return {
        success: false,
        message: error.response?.data?.message || "Error al obtener los pedidos",
        data: undefined
      };
    }
  }
};
