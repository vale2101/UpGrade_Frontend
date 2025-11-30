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
    try {
      const response = await axios.post<any>(
        `${ENV.API_URL}/fichas`,
        data,
        { withCredentials: true }
      );
      
      // El backend devuelve: { "message": "Ficha creada correctamente", "data": { "id_ficha": 19, ... } }
      // Caso 1: response.data.data existe y tiene id_ficha (objeto individual) - FORMATO PRINCIPAL
      if (response.data?.data) {
        // Si data es un array, tomar el primer elemento (no debería pasar en creación, pero por si acaso)
        if (Array.isArray(response.data.data)) {
          if (response.data.data.length > 0 && response.data.data[0]?.id_ficha) {
            return {
              success: true,
              message: response.data.message || "Ficha creada correctamente",
              data: response.data.data[0] as fichaInterface
            };
          }
        }
        // Si data es un objeto individual con id_ficha - ESTE ES EL CASO PRINCIPAL DEL BACKEND
        else if (response.data.data && typeof response.data.data === 'object') {
          // Verificar que tenga id_ficha
          if ('id_ficha' in response.data.data && response.data.data.id_ficha) {
            return {
              success: true,
              message: response.data.message || "Ficha creada correctamente",
              data: response.data.data as fichaInterface
            };
          }
        }
      }
      
      // Caso 2: Si ya tiene la estructura ApiResponse con success
      if (response.data?.success !== undefined && response.data?.data) {
        return response.data as ApiResponse<fichaInterface>;
      }
      
      // Caso 3: Si viene directamente como objeto ficha en response.data
      if (response.data?.id_ficha) {
        return {
          success: true,
          message: response.data.message || "Ficha creada correctamente",
          data: response.data as fichaInterface
        };
      }
      
      // Si el mensaje indica éxito, tratar de extraer la ficha de todas formas
      if (response.data?.message && (
        response.data.message.toLowerCase().includes('creado') ||
        response.data.message.toLowerCase().includes('correctamente')
      )) {
        // Intentar buscar id_ficha en cualquier parte de la respuesta
        const findFicha = (obj: any): fichaInterface | null => {
          if (!obj || typeof obj !== 'object') return null;
          
          // Si el objeto tiene id_ficha, es una ficha
          if ('id_ficha' in obj && obj.id_ficha) {
            return obj as fichaInterface;
          }
          
          // Buscar recursivamente
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
      
      // Si no se puede parsear, devolver error pero mostrar la respuesta para debugging
      return {
        success: false,
        message: `Formato de respuesta inesperado. Respuesta recibida: ${JSON.stringify(response.data)}`,
        data: undefined
      };
    } catch (error: any) {
      // Si hay un error pero la respuesta tiene datos, puede ser que la ficha se haya creado
      if (error?.response?.data) {
        // Intentar extraer la ficha de diferentes formas
        let fichaData: fichaInterface | undefined = undefined;
        
        if (error.response.data.data) {
          // Si data es un array, tomar el primer elemento
          if (Array.isArray(error.response.data.data)) {
            fichaData = error.response.data.data[0] as fichaInterface;
          }
          // Si data es un objeto
          else if (error.response.data.data.id_ficha) {
            fichaData = error.response.data.data as fichaInterface;
          }
        }
        // Si viene directamente con id_ficha
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
