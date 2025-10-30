"use client";

import Link from "next/link";

export default function EmptyOrders() {
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


