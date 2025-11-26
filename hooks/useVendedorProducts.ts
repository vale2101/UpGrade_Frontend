"use client";

import { useState, useEffect } from "react";

export interface VendedorProduct {
  id: string;
  name: string;
  price: string;
  stock: number;
  category: string;
  condition: string;
  image?: string;
}

const STORAGE_KEY = "vendedor-products";

// TODO: Los productos del vendedor deben ser obtenidos desde la base de datos
const seedProducts: VendedorProduct[] = [];

export function useVendedorProducts() {
  const [products, setProducts] = useState<VendedorProduct[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try { setProducts(JSON.parse(saved)); return; } catch {}
    }
    setProducts(seedProducts);
  }, []);

  useEffect(() => {
    if (products.length) localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
  }, [products]);

  const addProduct = (product: Omit<VendedorProduct, "id">) => {
    const newProduct = { ...product, id: Date.now().toString() };
    setProducts(prev => [...prev, newProduct]);
  };

  const updateProduct = (id: string, updates: Partial<VendedorProduct>) => {
    setProducts(prev => prev.map(p => p.id === id ? { ...p, ...updates } : p));
  };

  const deleteProduct = (id: string) => {
    setProducts(prev => prev.filter(p => p.id !== id));
  };

  return { products, addProduct, updateProduct, deleteProduct };
}