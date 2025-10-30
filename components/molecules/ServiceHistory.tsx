"use client";

import { useServiceHistory } from "../../hooks/useServiceHistory";

export default function ServiceHistory() {
  const { items } = useServiceHistory();

  if (items.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 text-center text-gray-600">
        No tienes historial de servicios todavía.
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100">
      <div className="px-6 py-4 border-b text-sm text-gray-600">Historial de servicios</div>
      <ul className="divide-y">
        {items.map(item => (
          <li key={item.id} className="px-6 py-4 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6">
            <div className="text-sm text-gray-500 w-40">{new Date(item.date).toLocaleDateString()}</div>
            <div className="flex-1">
              <div className="font-medium">{item.device}</div>
              <div className="text-sm text-gray-600">{item.service}</div>
            </div>
            <div className="text-sm">
              <span className={`px-2 py-1 rounded-full ${
                /reparado|entregado/i.test(item.status) ? "bg-[#57ad63] text-white" : "bg-[#fb64b61a] text-[#fb64b6]"
              }`}>{item.status}</span>
            </div>
            {item.amount && <div className="text-sm font-semibold">{item.amount}</div>}
          </li>
        ))}
      </ul>
    </div>
  );
}
