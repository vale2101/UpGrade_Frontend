"use client";
import { useState, useEffect } from "react";
import { DireccionService } from "../services/DireccionService";
import { direccionInterface } from "../interfaces/direccion.interface";

export function useAddress(addressId: number | null) {
  const [direccion, setDireccion] = useState<direccionInterface | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadDireccion = async () => {
      if (!addressId) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);

        console.log("Cargando dirección con ID:", addressId);
        const response = await DireccionService.getDireccionById(addressId);
        console.log("Respuesta del servicio de dirección:", response);

        if (response.success && response.data) {
          setDireccion(response.data);
        } else {
          const errorMsg = response.message || "Dirección no encontrada";
          console.warn("Error al cargar dirección:", errorMsg);
          setError(errorMsg);
          setDireccion(null);
        }
      } catch (err: any) {
        console.error("Error al cargar dirección:", err);
        setError(err.response?.data?.message || err.message || "Error inesperado al cargar la dirección");
        setDireccion(null);
      } finally {
        setLoading(false);
      }
    };

    loadDireccion();
  }, [addressId]);

  return {
    direccion,
    loading,
    error
  };
}

