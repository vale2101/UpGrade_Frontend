"use client";

import { useState, useEffect, useMemo } from "react";
import { ReparacionService } from "../services/reparacionService";
import { UserService } from "../services/userService";
import { TrabajadorService } from "../services/TrabajadorService";
import { reparacionInterface } from "../interfaces/reparacion.interface";
import { User } from "../interfaces/user.interface";
import { Trabajador } from "../interfaces/trabajador.interface";

export interface ReparacionWithDetails extends reparacionInterface {
  cliente?: {
    nombre: string;
    apellido: string;
    correo: string;
  };
  trabajador?: {
    nombre: string;
    apellido: string;
    correo: string;
  };
}

export function useAllRepairsWithDetails() {
  const [reparaciones, setReparaciones] = useState<reparacionInterface[]>([]);
  const [usuarios, setUsuarios] = useState<User[]>([]);
  const [trabajadores, setTrabajadores] = useState<Trabajador[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Cargar todas las reparaciones, usuarios y trabajadores en paralelo
      const [reparacionesResponse, usuariosData, trabajadoresData] = await Promise.all([
        ReparacionService.getReparaciones(),
        UserService.getUsers(),
        TrabajadorService.getTrabajadores(),
      ]);

      if (reparacionesResponse.success && reparacionesResponse.data) {
        setReparaciones(reparacionesResponse.data);
      } else {
        setError(reparacionesResponse.message || "Error al cargar las reparaciones");
        setReparaciones([]);
      }

      setUsuarios(usuariosData || []);
      setTrabajadores(trabajadoresData || []);
    } catch (err: any) {
      setError(err.message || "Error inesperado al cargar los datos");
      setReparaciones([]);
      setUsuarios([]);
      setTrabajadores([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // Combinar reparaciones con información de clientes y trabajadores
  const reparacionesWithDetails = useMemo<ReparacionWithDetails[]>(() => {
    return reparaciones.map((reparacion) => {
      const cliente = usuarios.find((u) => u.id_user === reparacion.id_user);
      const trabajador = trabajadores.find((t) => t.id_trabajador === reparacion.id_trabajador);

      return {
        ...reparacion,
        cliente: cliente
          ? {
              nombre: cliente.nombre,
              apellido: cliente.apellido,
              correo: cliente.correo,
            }
          : undefined,
        trabajador: trabajador
          ? {
              nombre: trabajador.nombre,
              apellido: trabajador.apellido,
              correo: trabajador.correo,
            }
          : undefined,
      };
    });
  }, [reparaciones, usuarios, trabajadores]);

  return {
    reparaciones: reparacionesWithDetails,
    loading,
    error,
    refetch: loadData,
  };
}

