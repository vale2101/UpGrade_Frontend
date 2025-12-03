"use client";

import { useState, useEffect, useCallback } from "react";
import { Administrador } from "../interfaces/administrador.interface";
import { AdministradorService } from "../services/administradorService";

const loadAdministradorFromStorage = (): Administrador | null => {
  if (typeof window === 'undefined') return null;
  
  const savedAdmin = localStorage.getItem("administrador");
  if (savedAdmin) {
    try {
      const admin = JSON.parse(savedAdmin);
      return admin;
    } catch (error) {
      localStorage.removeItem("administrador");
      return null;
    }
  }
  return null;
};

export function useAdministradorAuth() {
  const [administrador, setAdministrador] = useState<Administrador | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const refreshAdministrador = useCallback(() => {
    const admin = loadAdministradorFromStorage();
    setAdministrador(admin);
    return admin;
  }, []);

  useEffect(() => {
    const admin = loadAdministradorFromStorage();
    setAdministrador(admin);
    setIsLoading(false);

    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "administrador") {
        if (e.newValue) {
          try {
            setAdministrador(JSON.parse(e.newValue));
          } catch (error) {
          }
        } else {
          setAdministrador(null);
        }
      }
    };

    window.addEventListener("storage", handleStorageChange);

    const handleCustomStorageChange = () => {
      refreshAdministrador();
    };

    window.addEventListener("administradorStorageChange", handleCustomStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("administradorStorageChange", handleCustomStorageChange);
    };
  }, [refreshAdministrador]);

  const logout = async () => {
    try {
      await AdministradorService.logout();
    } catch (error) {
    } finally {
      setAdministrador(null);
      localStorage.removeItem("administrador");
      window.dispatchEvent(new Event("administradorStorageChange"));
    }
  };

  return {
    administrador,
    isAuthenticated: !!administrador,
    isLoading,
    logout,
    refreshAdministrador,
  };
}

