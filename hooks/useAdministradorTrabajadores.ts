"use client";

import { useState, useEffect } from "react";
import { TrabajadorService } from "../services/TrabajadorService";
import { Trabajador, CreateTrabajadorRequest, UpdateTrabajadorRequest } from "../interfaces/trabajador.interface";
import Swal from "sweetalert2";

export function useAdministradorTrabajadores() {
  const [trabajadores, setTrabajadores] = useState<Trabajador[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadTrabajadores = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await TrabajadorService.getTrabajadores();
      setTrabajadores(data);
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || "Error al cargar trabajadores";
      setError(errorMessage);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: errorMessage,
        confirmButtonText: "Aceptar",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTrabajadores();
  }, []);

  const createTrabajador = async (data: CreateTrabajadorRequest) => {
    try {
      const response = await TrabajadorService.createTrabajador(data);
      if (response.success) {
        await Swal.fire({
          icon: "success",
          title: "Éxito",
          text: "Trabajador creado correctamente",
          timer: 2000,
          showConfirmButton: false,
        });
        await loadTrabajadores();
        return response.data;
      } else {
        throw new Error(response.message || "Error al crear trabajador");
      }
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || err.message || "Error al crear trabajador";
      await Swal.fire({
        icon: "error",
        title: "Error",
        text: errorMessage,
        confirmButtonText: "Aceptar",
      });
      throw err;
    }
  };

  const updateTrabajador = async (id: number, data: UpdateTrabajadorRequest) => {
    try {
      const response = await TrabajadorService.updateTrabajador(id.toString(), data);
      if (response.success) {
        await Swal.fire({
          icon: "success",
          title: "Éxito",
          text: "Trabajador actualizado correctamente",
          timer: 2000,
          showConfirmButton: false,
        });
        await loadTrabajadores();
        return response.data;
      } else {
        throw new Error(response.message || "Error al actualizar trabajador");
      }
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || err.message || "Error al actualizar trabajador";
      await Swal.fire({
        icon: "error",
        title: "Error",
        text: errorMessage,
        confirmButtonText: "Aceptar",
      });
      throw err;
    }
  };

  const deleteTrabajador = async (id: number) => {
    try {
      const result = await Swal.fire({
        title: "¿Estás seguro?",
        text: "Esta acción no se puede deshacer",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#dc2626",
        cancelButtonColor: "#6b7280",
        confirmButtonText: "Sí, eliminar",
        cancelButtonText: "Cancelar",
      });

      if (result.isConfirmed) {
        const response = await TrabajadorService.deleteTrabajador(id.toString());
        if (response.success) {
          await Swal.fire({
            icon: "success",
            title: "Éxito",
            text: "Trabajador eliminado correctamente",
            timer: 2000,
            showConfirmButton: false,
          });
          await loadTrabajadores();
        } else {
          throw new Error(response.message || "Error al eliminar trabajador");
        }
      }
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || err.message || "Error al eliminar trabajador";
      await Swal.fire({
        icon: "error",
        title: "Error",
        text: errorMessage,
        confirmButtonText: "Aceptar",
      });
    }
  };

  return {
    trabajadores,
    loading,
    error,
    createTrabajador,
    updateTrabajador,
    deleteTrabajador,
    refreshTrabajadores: loadTrabajadores,
  };
}

