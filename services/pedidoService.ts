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
    const response = await axios.put<ApiResponse<PedidoInterface>>(
      `${ENV.API_URL}/pedidos/${id}`,
      data,
      { withCredentials: true }
    );
    return response.data;
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
      console.error("Error en getProductosByPedidoId:", error);
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
      console.error("Error en getPedidosByUserId:", error);
      return {
        success: false,
        message: error.response?.data?.message || "Error al obtener los pedidos",
        data: undefined
      };
    }
  }
};
