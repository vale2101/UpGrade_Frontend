"use client";

import { useState, useEffect } from "react";
import { ReparacionService } from "../services/reparacionService";
import { reparacionInterface } from "../interfaces/reparacion.interface";
import { useVendedorAuth } from "./useVendedorAuth";

export function useVendedorRepairs() {
  const [reparaciones, setReparaciones] = useState<reparacionInterface[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { vendedor, isLoading: isLoadingVendedor } = useVendedorAuth();

  const loadReparaciones = async () => {
    if (!vendedor?.id_trabajador) {
      setReparaciones([]);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const response = await ReparacionService.getReparacionesByTrabajador(vendedor.id_trabajador);
      
      if (response.success) {
        if (response.data) {
          setReparaciones(response.data);
        } else {
          setReparaciones([]);
        }
      } else {
        setError(response.message || "Error al cargar las reparaciones");
        setReparaciones([]);
      }
    } catch (err: any) {
      setError(err.message || "Error inesperado al cargar las reparaciones");
      setReparaciones([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!isLoadingVendedor) {
      if (vendedor?.id_trabajador) {
        loadReparaciones();
      } else {
        setLoading(false);
        setReparaciones([]);
      }
    }
  }, [vendedor?.id_trabajador, isLoadingVendedor]);

  return {
    reparaciones,
    loading: loading || isLoadingVendedor,
    error,
    refetch: loadReparaciones,
  };
}

