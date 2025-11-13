"use client";

import { useState, useEffect } from "react";

export interface VendedorOrder {
  id: string;
  orderNumber: string;
  customer: string;
  customerEmail: string;
  items: number;
  total: string;
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
  date: string;
  paymentMethod?: string;
}

const STORAGE_KEY = "vendedor-orders";

// TODO: Los pedidos del vendedor deben ser obtenidos desde la base de datos
const seedOrders: VendedorOrder[] = [];

const STATUS_LABELS: Record<VendedorOrder["status"], string> = {
  pending: "Pendiente",
  processing: "En proceso",
  shipped: "Enviado",
  delivered: "Entregado",
  cancelled: "Cancelado"
};

export function useVendedorOrders() {
  const [orders, setOrders] = useState<VendedorOrder[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try { setOrders(JSON.parse(saved)); return; } catch {}
    }
    setOrders(seedOrders);
  }, []);

  useEffect(() => {
    if (orders.length) localStorage.setItem(STORAGE_KEY, JSON.stringify(orders));
  }, [orders]);

  const updateOrderStatus = (id: string, status: VendedorOrder["status"]) => {
    setOrders(prev => prev.map(order => 
      order.id === id ? { ...order, status } : order
    ));
  };

  const getStatusLabel = (status: VendedorOrder["status"]) => {
    return STATUS_LABELS[status];
  };

  return { orders, updateOrderStatus, getStatusLabel };
}


