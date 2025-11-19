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
  // 🔹 Obtener todas las direcciones
  async getDirecciones(): Promise<ApiResponse<direccionInterface[]>> {
    const response = await axios.get<ApiResponse<direccionInterface[]>>(
      `${ENV.API_URL}/direcciones`,
      { withCredentials: true }
    );
    return response.data;
  },

  // 🔹 Obtener una dirección por ID
  async getDireccionById(id: number): Promise<ApiResponse<direccionInterface>> {
    const response = await axios.get<ApiResponse<direccionInterface>>(
      `${ENV.API_URL}/direcciones/${id}`,
      { withCredentials: true }
    );
    return response.data;
  },

  // 🔹 Crear una nueva dirección
  async createDireccion(data: direccionInterface): Promise<ApiResponse<direccionInterface>> {
    const response = await axios.post<ApiResponse<direccionInterface>>(
      `${ENV.API_URL}/direcciones`,
      data,
      { withCredentials: true }
    );
    return response.data;
  },

  // 🔹 Actualizar una dirección existente
  async updateDireccion(id: number, data: direccionInterface): Promise<ApiResponse<direccionInterface>> {
    const response = await axios.put<ApiResponse<direccionInterface>>(
      `${ENV.API_URL}/direcciones/${id}`,
      data,
      { withCredentials: true }
    );
    return response.data;
  },

  // 🔹 Eliminar una dirección
  async deleteDireccion(id: number): Promise<ApiResponse<null>> {
    const response = await axios.delete<ApiResponse<null>>(
      `${ENV.API_URL}/direcciones/${id}`,
      { withCredentials: true }
    );
    return response.data;
  },
};
