"use client";

import Link from "next/link";
import { useUserOrders } from "../../hooks/useUserOrders";
import UserOrdersList from "./UserOrdersList";

export default function EmptyOrders() {
  const { pedidos, loading, error } = useUserOrders();

  if (loading) {
    return (
      <div className="text-center py-16 bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="space-y-3">
          <div className="h-6 bg-gray-200 rounded animate-pulse w-32 mx-auto" />
          <div className="h-4 bg-gray-200 rounded animate-pulse w-48 mx-auto" />
        </div>
      </div>
    );
  }

  if (error && !error.toLowerCase().includes("no hay pedidos")) {
    return (
      <div className="text-center py-16 bg-white rounded-xl shadow-sm border border-gray-100">
        <h2 className="text-2xl font-semibold mb-2">Pedidos</h2>
        <p className="text-red-600 mb-6">{error}</p>
        <Link href="/" className="inline-block bg-[#57ad63] text-white px-6 py-3 rounded-full font-semibold hover:bg-[#459a52]">
          Volver al inicio
        </Link>
      </div>
    );
  }

  if (pedidos.length === 0) {
    return (
      <div className="text-center py-16 bg-white rounded-xl shadow-sm border border-gray-100">
        <h2 className="text-2xl font-semibold mb-2">Pedidos</h2>
        <p className="text-gray-600 mb-6">Todavía no has hecho ningún pedido.</p>
        <Link href="/" className="inline-block bg-[#57ad63] text-white px-6 py-3 rounded-full font-semibold hover:bg-[#459a52]">
          Empezar a comprar
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <h2 className="text-2xl font-semibold mb-6">Pedidos</h2>
      <UserOrdersList pedidos={pedidos} />
    </div>
  );
}


