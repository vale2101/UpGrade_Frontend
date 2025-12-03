"use client";

import { useState, useEffect } from "react";

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
        const userStr = localStorage.getItem("upgrade-user");
        let hasUserId = false;
        if (userStr) {
          try {
            const user = JSON.parse(userStr);
            hasUserId = !!user?.id;
          } catch (error) {
          }
        }

        if (hasUserId) {
          setIsAdministrador(false);
          setIsTrabajador(false);
          setIsStaff(false);
          return;
        }

        const administradorStr = localStorage.getItem("administrador");
        let isAdmin = false;
        if (administradorStr) {
          try {
            const admin = JSON.parse(administradorStr);
            isAdmin = !!(admin?.id_administrador || admin?.administrador?.id_administrador);
          } catch (error) {
          }
        }

        const vendedorStr = localStorage.getItem("vendedor");
        let isTrab = false;
        if (vendedorStr) {
          try {
            const vendedor = JSON.parse(vendedorStr);
            isTrab = !!(vendedor?.id_trabajador || vendedor?.trabajador?.id_trabajador);
          } catch (error) {
          }
        }

        setIsAdministrador(isAdmin);
        setIsTrabajador(isTrab);
        setIsStaff(isAdmin || isTrab);
      } catch (error) {
        setIsAdministrador(false);
        setIsTrabajador(false);
        setIsStaff(false);
      }
    };

    checkStaff();
    setIsLoading(false);

    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "administrador" || e.key === "vendedor" || e.key === "upgrade-user") {
        checkStaff();
      }
    };

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

