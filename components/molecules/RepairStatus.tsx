"use client";

import { useRepairStatus } from "../../hooks/useRepairStatus";

export default function RepairStatus() {
  const { status, setStatus, statuses, currentIndex } = useRepairStatus();

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold">Estado de tu reparación</h2>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value as any)}
          className="border rounded-md px-3 py-2 text-sm"
        >
          {statuses.map(s => (
            <option key={s.key} value={s.key}>{s.label}</option>
          ))}
        </select>
      </div>

      <ol className="flex items-center justify-between gap-2">
        {statuses.map((s, idx) => {
          const isCurrent = idx === currentIndex;
          const reached = idx <= currentIndex;
          return (
            <li key={s.key} className="flex-1 flex items-center">
              <div className={`flex items-center gap-3 w-full`}>
                <div className={`h-8 w-8 rounded-full flex items-center justify-center text-xs font-semibold ${
                  isCurrent ? "bg-[#fb64b6] text-white" : reached ? "bg-[#57ad63] text-white" : "bg-gray-200 text-gray-600"
                }`}>
                  {idx + 1}
                </div>
                <span className={`text-sm ${reached ? "text-black" : "text-gray-500"}`}>{s.label}</span>
              </div>
              {idx < statuses.length - 1 && (
                <div className={`h-[2px] flex-1 mx-2 ${idx < currentIndex ? "bg-[#57ad63]" : "bg-gray-200"}`}></div>
              )}
            </li>
          );
        })}
      </ol>

      <p className="mt-6 text-sm text-gray-600">Última actualización: {new Date().toLocaleString()}</p>
    </div>
  );
}


