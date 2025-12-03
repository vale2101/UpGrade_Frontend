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

  async createFicha(data: fichaInterface): Promise<ApiResponse<fichaInterface>> {
    try {
      const response = await axios.post<any>(
        `${ENV.API_URL}/fichas`,
        data,
        { withCredentials: true }
      );
      
      if (response.data?.data) {
        if (Array.isArray(response.data.data)) {
          if (response.data.data.length > 0 && response.data.data[0]?.id_ficha) {
            return {
              success: true,
              message: response.data.message || "Ficha creada correctamente",
              data: response.data.data[0] as fichaInterface
            };
          }
        }
        else if (response.data.data && typeof response.data.data === 'object') {
          if ('id_ficha' in response.data.data && response.data.data.id_ficha) {
            return {
              success: true,
              message: response.data.message || "Ficha creada correctamente",
              data: response.data.data as fichaInterface
            };
          }
        }
      }
      
      if (response.data?.success !== undefined && response.data?.data) {
        return response.data as ApiResponse<fichaInterface>;
      }
      
      if (response.data?.id_ficha) {
        return {
          success: true,
          message: response.data.message || "Ficha creada correctamente",
          data: response.data as fichaInterface
        };
      }
      
      if (response.data?.message && (
        response.data.message.toLowerCase().includes('creado') ||
        response.data.message.toLowerCase().includes('correctamente')
      )) {
        const findFicha = (obj: any): fichaInterface | null => {
          if (!obj || typeof obj !== 'object') return null;
          
          if ('id_ficha' in obj && obj.id_ficha) {
            return obj as fichaInterface;
          }
          
          for (const key in obj) {
            if (key === 'data' && obj[key] && typeof obj[key] === 'object') {
              const found = findFicha(obj[key]);
              if (found) return found;
            }
          }
          
          return null;
        };
        
        const foundFicha = findFicha(response.data);
        if (foundFicha) {
          return {
            success: true,
            message: response.data.message,
            data: foundFicha
          };
        }
      }
      
      return {
        success: false,
        message: `Formato de respuesta inesperado. Respuesta recibida: ${JSON.stringify(response.data)}`,
        data: undefined
      };
    } catch (error: any) {
      if (error?.response?.data) {
        let fichaData: fichaInterface | undefined = undefined;
        
        if (error.response.data.data) {
          if (Array.isArray(error.response.data.data)) {
            fichaData = error.response.data.data[0] as fichaInterface;
          }
          else if (error.response.data.data.id_ficha) {
            fichaData = error.response.data.data as fichaInterface;
          }
        }
        else if (error.response.data.id_ficha) {
          fichaData = error.response.data as fichaInterface;
        }
        
        if (fichaData) {
          return {
            success: true,
            message: error.response.data.message || "Ficha creada correctamente",
            data: fichaData
          };
        }
      }
      throw error;
    }
  },

  async updateFicha(id: number, data: fichaInterface): Promise<ApiResponse<fichaInterface>> {
    const response = await axios.put<ApiResponse<fichaInterface>>(
      `${ENV.API_URL}/fichas/${id}`,
      data,
      { withCredentials: true }
    );
    return response.data;
  },

  async deleteFicha(id: number): Promise<ApiResponse<null>> {
    const response = await axios.delete<ApiResponse<null>>(
      `${ENV.API_URL}/fichas/${id}`,
      { withCredentials: true }
    );
    return response.data;
  },
};
