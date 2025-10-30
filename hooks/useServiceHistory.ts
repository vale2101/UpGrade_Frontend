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

const seed: ServiceHistoryItem[] = [
  { id: "1", date: new Date().toISOString(), device: "iPhone 13", service: "Cambio de pantalla", status: "Reparado", amount: "$320.000" },
  { id: "2", date: new Date(Date.now() - 86400000 * 15).toISOString(), device: "Samsung S22", service: "Cambio de batería", status: "Entregado", amount: "$180.000" }
];

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


