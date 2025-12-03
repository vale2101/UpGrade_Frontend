"use client";

import { useState, useEffect, useCallback } from "react";
import { Trabajador } from "../interfaces/trabajador.interface";
import { TrabajadorService } from "../services/TrabajadorService";

const loadVendedorFromStorage = (): Trabajador | null => {
  if (typeof window === 'undefined') return null;
  
  const savedVendedor = localStorage.getItem("vendedor");
  if (savedVendedor) {
    try {
      const vendedor = JSON.parse(savedVendedor);
      return vendedor;
    } catch (error) {
      localStorage.removeItem("vendedor");
      return null;
    }
  }
  return null;
};

export function useVendedorAuth() {
  const [vendedor, setVendedor] = useState<Trabajador | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const refreshVendedor = useCallback(() => {
    const vend = loadVendedorFromStorage();
    setVendedor(vend);
    return vend;
  }, []);

  useEffect(() => {
    const vend = loadVendedorFromStorage();
    setVendedor(vend);
    setIsLoading(false);

    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "vendedor") {
        if (e.newValue) {
          try {
            setVendedor(JSON.parse(e.newValue));
          } catch (error) {
          }
        } else {
          setVendedor(null);
        }
      }
    };

    window.addEventListener("storage", handleStorageChange);

    const handleCustomStorageChange = () => {
      refreshVendedor();
    };

    window.addEventListener("vendedorStorageChange", handleCustomStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("vendedorStorageChange", handleCustomStorageChange);
    };
  }, [refreshVendedor]);

  const logout = async () => {
    try {
      await TrabajadorService.logout();
    } catch (error) {
    } finally {
      setVendedor(null);
      localStorage.removeItem("vendedor");
      window.dispatchEvent(new Event("vendedorStorageChange"));
    }
  };

  return {
    vendedor,
    isAuthenticated: !!vendedor,
    isLoading,
    logout,
    refreshVendedor,
  };
}

