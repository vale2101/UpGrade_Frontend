"use client";

import axios from "axios";
import { ENV } from "../config/env";
import { reparacionInterface } from "../interfaces/reparacion.interface";

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data?: T;
}

function handleResponse<T>(response: any, successMsg: string, notFoundMsg: string): ApiResponse<T> {
  if (response.data?.data) {
    return { success: true, message: successMsg, data: response.data.data as T };
  }
  if (response.data?.success !== undefined) {
    return response.data as ApiResponse<T>;
  }
  return { success: false, message: notFoundMsg };
}

export const ReparacionService = {
  async getReparaciones(): Promise<ApiResponse<reparacionInterface[]>> {
    try {
      const response = await axios.get<any>(`${ENV.API_URL}/reparaciones`, { withCredentials: true });
      return handleResponse<reparacionInterface[]>(response, "Reparaciones obtenidas correctamente", "No se encontraron reparaciones");
    } catch (error: any) {
      return { 
        success: false, 
        message: error.response?.data?.message || "Error al obtener reparaciones" 
      };
    }
  },

  async getReparacionById(id: number): Promise<ApiResponse<reparacionInterface>> {
    try {
      const response = await axios.get<any>(`${ENV.API_URL}/reparaciones/${id}`, { withCredentials: true });
      return handleResponse<reparacionInterface>(response, "Reparación obtenida correctamente", "Reparación no encontrada");
    } catch (error: any) {
      return { 
        success: false, 
        message: error.response?.data?.message || "Error al obtener la reparación" 
      };
    }
  },

  async createReparacion(data: { nombre: string; dispositivo: string; observaciones?: string | null; costo: number; id_trabajador: number }): Promise<ApiResponse<reparacionInterface>> {
    try {
      const response = await axios.post<ApiResponse<reparacionInterface>>(`${ENV.API_URL}/reparaciones`, data, { withCredentials: true });
      return response.data;
    } catch (error: any) {
      return { 
        success: false, 
        message: error.response?.data?.message || "Error al crear la reparación" 
      };
    }
  },

  async updateReparacion(id: number, data: reparacionInterface): Promise<ApiResponse<reparacionInterface>> {
    try {
      const response = await axios.put<ApiResponse<reparacionInterface>>(`${ENV.API_URL}/reparaciones/${id}`, data, { withCredentials: true });
      return response.data;
    } catch (error: any) {
      return { 
        success: false, 
        message: error.response?.data?.message || "Error al actualizar la reparación" 
      };
    }
  },

  async deleteReparacion(id: number): Promise<ApiResponse<null>> {
    try {
      const response = await axios.delete<ApiResponse<null>>(`${ENV.API_URL}/reparaciones/${id}`, { withCredentials: true });
      return response.data;
    } catch (error: any) {
      return { 
        success: false, 
        message: error.response?.data?.message || "Error al eliminar la reparación" 
      };
    }
  },

  async getReparacionesByUser(id_user: number): Promise<ApiResponse<reparacionInterface[]>> {
    try {
      const response = await axios.get<any>(`${ENV.API_URL}/usuarios/${id_user}/reparaciones`, { withCredentials: true });
      return handleResponse<reparacionInterface[]>(response, "Reparaciones obtenidas correctamente", "No se encontraron reparaciones para este usuario");
    } catch (error: any) {
      if (error.response?.status === 404) {
        return {
          success: true,
          message: "No hay reparaciones registradas",
          data: []
        };
      }
      return { 
        success: false, 
        message: error.response?.data?.message || "Error al obtener reparaciones por usuario" 
      };
    }
  },

  async getReparacionesByTrabajador(id_trabajador: number): Promise<ApiResponse<reparacionInterface[]>> {
    try {
      const response = await axios.get<any>(`${ENV.API_URL}/trabajadores/${id_trabajador}/reparaciones`, { withCredentials: true });
      return handleResponse<reparacionInterface[]>(response, "Reparaciones obtenidas correctamente", "No se encontraron reparaciones para este trabajador");
    } catch (error: any) {
      if (error.response?.status === 404) {
        return {
          success: true,
          message: "No hay reparaciones registradas",
          data: []
        };
      }
      return { 
        success: false, 
        message: error.response?.data?.message || "Error al obtener reparaciones por trabajador" 
      };
    }
  },

  async updateEstadoReparacion(id: number, estado: string): Promise<ApiResponse<reparacionInterface>> {
    try {
      const response = await axios.put<ApiResponse<reparacionInterface>>(
        `${ENV.API_URL}/reparaciones/${id}/estado`,
        { estado },
        { withCredentials: true }
      );
      return response.data;
    } catch (error: any) {
      return { 
        success: false, 
        message: error.response?.data?.message || "Error al actualizar el estado de la reparación" 
      };
    }
  },
};
