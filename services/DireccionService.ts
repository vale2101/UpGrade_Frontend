"use client";

import axios from "axios";
import { ENV } from "../config/env";
import { direccionInterface } from "../interfaces/direccion.interface";

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data?: T;
}

export const DireccionService = {
  async getDirecciones(): Promise<ApiResponse<direccionInterface[]>> {
    const response = await axios.get<ApiResponse<direccionInterface[]>>(
      `${ENV.API_URL}/direcciones`,
      { withCredentials: true }
    );
    return response.data;
  },

  async getDireccionById(id: number): Promise<ApiResponse<direccionInterface>> {
    try {
      const response = await axios.get<any>(
        `${ENV.API_URL}/direcciones/${id}`,
        { withCredentials: true }
      );

      if (response.data?.data) {
        if (response.data.data.data && (response.data.data.data.pais || response.data.data.data.id_direccion)) {
          return {
            success: true,
            message: "Dirección obtenida correctamente",
            data: response.data.data.data as direccionInterface
          };
        }
        if (response.data.data.pais || response.data.data.id_direccion) {
          return {
            success: true,
            message: "Dirección obtenida correctamente",
            data: response.data.data as direccionInterface
          };
        }
      }
      
      if (response.data?.success !== undefined) {
        return response.data as ApiResponse<direccionInterface>;
      }

      if (response.data && (response.data.pais || response.data.id_direccion)) {
        return {
          success: true,
          message: "Dirección obtenida correctamente",
          data: response.data as direccionInterface
        };
      }

      console.warn("Formato de respuesta inesperado en getDireccionById:", response.data);
      return {
        success: false,
        message: "Formato de respuesta inesperado",
        data: undefined
      };
    } catch (error: any) {
      console.error("Error en getDireccionById:", error);
      return {
        success: false,
        message: error.response?.data?.message || error.message || "Error al obtener la dirección",
        data: undefined
      };
    }
  },

  async createDireccion(data: direccionInterface): Promise<ApiResponse<direccionInterface>> {
    const response = await axios.post<ApiResponse<direccionInterface>>(
      `${ENV.API_URL}/direcciones`,
      data,
      { withCredentials: true }
    );
    return response.data;
  },

  async updateDireccion(id: number, data: direccionInterface): Promise<ApiResponse<direccionInterface>> {
    const response = await axios.put<ApiResponse<direccionInterface>>(
      `${ENV.API_URL}/direcciones/${id}`,
      data,
      { withCredentials: true }
    );
    return response.data;
  },

  async deleteDireccion(id: number): Promise<ApiResponse<null>> {
    const response = await axios.delete<ApiResponse<null>>(
      `${ENV.API_URL}/direcciones/${id}`,
      { withCredentials: true }
    );
    return response.data;
  },
};
