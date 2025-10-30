"use client";

import { useEffect, useState } from "react";

export interface ServiceHistoryItem {
  id: string;
  date: string;
  device: string;
  service: string;
  status: string;
  amount?: string;
}

const STORAGE_KEY = "upgrade-service-history";

// TODO: Los servicios deben ser obtenidos desde la base de datos
const seed: ServiceHistoryItem[] = [];

export function useServiceHistory() {
  const [items, setItems] = useState<ServiceHistoryItem[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try { setItems(JSON.parse(saved)); return; } catch {}
    }
    setItems(seed);
  }, []);

  useEffect(() => {
    if (items.length) localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  return { items, setItems };
}


