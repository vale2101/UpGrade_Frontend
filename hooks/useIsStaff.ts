"use client";

import { useState, useEffect } from "react";

/**
 * Hook para detectar si el usuario actual es un trabajador (vendedor) o administrador
 * Verifica si existe id_trabajador o id_administrador en los datos almacenados
 * @returns { isStaff, isAdministrador, isTrabajador, isLoading }
 */
export function useIsStaff() {
  const [isStaff, setIsStaff] = useState(false);
  const [isAdministrador, setIsAdministrador] = useState(false);
  const [isTrabajador, setIsTrabajador] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (typeof window === 'undefined') {
      setIsLoading(false);
      return;
    }

    const checkStaff = () => {
      try {
        // Primero verificar si es usuario normal (con id_user)
        const userStr = localStorage.getItem("upgrade-user");
        let hasUserId = false;
        if (userStr) {
          try {
            const user = JSON.parse(userStr);
            // Verificar si tiene id (que viene de id_user)
            hasUserId = !!user?.id;
          } catch (error) {
            // Error parsing, ignorar
          }
        }

        // Si tiene id_user, NO es staff
        if (hasUserId) {
          setIsAdministrador(false);
          setIsTrabajador(false);
          setIsStaff(false);
          return;
        }

        // Verificar administrador
        const administradorStr = localStorage.getItem("administrador");
        let isAdmin = false;
        if (administradorStr) {
          try {
            const admin = JSON.parse(administradorStr);
            // Verificar si tiene id_administrador en el token/datos
            isAdmin = !!(admin?.id_administrador || admin?.administrador?.id_administrador);
          } catch (error) {
            // Error parsing, ignorar
          }
        }

        // Verificar trabajador/vendedor
        const vendedorStr = localStorage.getItem("vendedor");
        let isTrab = false;
        if (vendedorStr) {
          try {
            const vendedor = JSON.parse(vendedorStr);
            // Verificar si tiene id_trabajador en el token/datos
            isTrab = !!(vendedor?.id_trabajador || vendedor?.trabajador?.id_trabajador);
          } catch (error) {
            // Error parsing, ignorar
          }
        }

        setIsAdministrador(isAdmin);
        setIsTrabajador(isTrab);
        setIsStaff(isAdmin || isTrab);
      } catch (error) {
        // Error general, no es staff
        setIsAdministrador(false);
        setIsTrabajador(false);
        setIsStaff(false);
      }
    };

    // Verificar inmediatamente
    checkStaff();
    setIsLoading(false);

    // Listener para cambios en localStorage
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "administrador" || e.key === "vendedor" || e.key === "upgrade-user") {
        checkStaff();
      }
    };

    // Listener para eventos personalizados (mismo tab)
    const handleCustomChange = () => {
      checkStaff();
    };

    window.addEventListener("storage", handleStorageChange);
    window.addEventListener("administradorStorageChange", handleCustomChange);
    window.addEventListener("vendedorStorageChange", handleCustomChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("administradorStorageChange", handleCustomChange);
      window.removeEventListener("vendedorStorageChange", handleCustomChange);
    };
  }, []);

  return {
    isStaff,
    isAdministrador,
    isTrabajador,
    isLoading,
  };
}

