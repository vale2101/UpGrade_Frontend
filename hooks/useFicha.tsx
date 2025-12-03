"use client";

import { useState, useEffect } from "react";
import { FichaService } from "../services/fichaService";
import { fichaInterface } from "../interfaces/ficha.interface";

export function useFicha(idProducto: number | string | null) {
  const [ficha, setFicha] = useState<fichaInterface | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFicha = async () => {
      if (!idProducto) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        
        const id = typeof idProducto === "string" ? parseInt(idProducto) : idProducto;
        
        if (isNaN(id)) {
          setError("ID de producto inválido");
          setLoading(false);
          return;
        }
        
        if (!FichaService.getFichaByProductoId || typeof FichaService.getFichaByProductoId !== 'function') {
          throw new Error('El método getFichaByProductoId no está disponible en FichaService');
        }
        
        const response = await FichaService.getFichaByProductoId(id);

        if (response.success && response.data) {
          setFicha(response.data);
        } else {
          setError(response.message || "Ficha no encontrada");
          setFicha(null);
        }
      } catch (err: any) {
        console.error("Error fetching ficha:", err);
        setError(err.message || "Error al cargar la ficha");
        setFicha(null);
      } finally {
        setLoading(false);
      }
    };

    fetchFicha();
  }, [idProducto]);

  const refetch = async () => {
    if (!idProducto) return;

    try {
      setLoading(true);
      setError(null);
      
      const id = typeof idProducto === "string" ? parseInt(idProducto) : idProducto;
      
      if (isNaN(id)) {
        setError("ID de producto inválido");
        setLoading(false);
        return;
      }

      const response = await FichaService.getFichaByProductoId(id);
      
      if (response.success && response.data) {
        setFicha(response.data);
      } else {
        setError(response.message || "Ficha no encontrada");
        setFicha(null);
      }
    } catch (err: any) {
      console.error("Error fetching ficha:", err);
      setError(err.message || "Error al cargar la ficha");
      setFicha(null);
    } finally {
      setLoading(false);
    }
  };

  return { ficha, loading, error, refetch };
}

