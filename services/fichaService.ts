"use client";

import axios from "axios";
import { ENV } from "../config/env";
import { fichaInterface } from "../interfaces/ficha.interface";

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data?: T;
}

export const FichaService = {
  // 🔹 Obtener todas las fichas
  async getFichas(): Promise<ApiResponse<fichaInterface[]>> {
    const response = await axios.get<{ data: fichaInterface[] }>(
      `${ENV.API_URL}/fichas`,
      { withCredentials: true }
    );

    return {
      success: true,
      message: "Fichas obtenidas correctamente",
      data: response.data.data
    };
  },

  // 🔹 Obtener una ficha por ID
  async getFichaById(id: number): Promise<ApiResponse<fichaInterface>> {
    const response = await axios.get<{ data: fichaInterface }>(
      `${ENV.API_URL}/fichas/${id}`,
      { withCredentials: true }
    );

    return {
      success: true,
      message: "Ficha obtenida correctamente",
      data: response.data.data
    };
  },

  // 🔹 Obtener ficha por ID de producto
  async getFichaByProductoId(id_producto: number): Promise<ApiResponse<fichaInterface>> {
    try {
      const response = await axios.get<{ data: fichaInterface }>(
        `${ENV.API_URL}/productos/${id_producto}/ficha`,
        { withCredentials: true }
      );

      return {
        success: true,
        message: "Ficha obtenida correctamente desde producto",
        data: response.data.data
      };
    } catch (error: any) {
      console.error("Error en getFichaByProductoId:", error);
      return {
        success: false,
        message: error.response?.data?.message || "Error al obtener la ficha",
        data: undefined
      };
    }
  },

  // 🔹 Crear una nueva ficha
  async createFicha(data: fichaInterface): Promise<ApiResponse<fichaInterface>> {
    const response = await axios.post<ApiResponse<fichaInterface>>(
      `${ENV.API_URL}/fichas`,
      data,
      { withCredentials: true }
    );
    return response.data;
  },

  // 🔹 Actualizar una ficha existente
  async updateFicha(id: number, data: fichaInterface): Promise<ApiResponse<fichaInterface>> {
    const response = await axios.put<ApiResponse<fichaInterface>>(
      `${ENV.API_URL}/fichas/${id}`,
      data,
      { withCredentials: true }
    );
    return response.data;
  },

  // 🔹 Eliminar una ficha
  async deleteFicha(id: number): Promise<ApiResponse<null>> {
    const response = await axios.delete<ApiResponse<null>>(
      `${ENV.API_URL}/fichas/${id}`,
      { withCredentials: true }
    );
    return response.data;
  },
};
