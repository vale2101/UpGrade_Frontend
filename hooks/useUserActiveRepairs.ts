"use client";

import { useState, useEffect } from "react";
import { ReparacionService } from "../services/reparacionService";
import { reparacionInterface } from "../interfaces/reparacion.interface";
import { useAuth } from "./useAuthContext";

export function useUserActiveRepairs() {
  const [reparaciones, setReparaciones] = useState<reparacionInterface[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user, isLoading: isLoadingUser } = useAuth();

  const loadReparaciones = async () => {
    if (!user?.id) {
      setReparaciones([]);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      
      const userId = parseInt(user.id, 10);
      if (isNaN(userId)) {
        setError("ID de usuario inválido");
        setReparaciones([]);
        setLoading(false);
        return;
      }

      const response = await ReparacionService.getReparacionesByUser(userId);
      
      if (response.success) {
        // Filtrar solo las reparaciones con estados activos (no "Reparado" ni "Cancelado")
        const reparacionesActivas = (response.data || []).filter(
          (reparacion) => 
            reparacion.estado === "Recibido" || 
            reparacion.estado === "Revisión" || 
            reparacion.estado === "Reparación"
        );
        setReparaciones(reparacionesActivas);
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
    if (!isLoadingUser) {
      if (user?.id) {
        loadReparaciones();
      } else {
        setLoading(false);
        setReparaciones([]);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.id, isLoadingUser]);

  return {
    reparaciones,
    loading: loading || isLoadingUser,
    error,
    refetch: loadReparaciones,
  };
}

