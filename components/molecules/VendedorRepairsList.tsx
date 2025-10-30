"use client";

import { useServiceHistory } from "../../hooks/useServiceHistory";

export default function VendedorRepairsList() {
  const { items } = useServiceHistory();

  return (
    <div className="space-y-4">
      {items.length === 0 ? (
        <p className="text-center py-8 text-gray-500">No hay reparaciones registradas</p>
      ) : (
        items.map(item => (
          <div key={item.id} className="bg-white border rounded-lg p-4 flex items-center justify-between">
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900">{item.device}</h3>
              <p className="text-sm text-gray-600">{item.service}</p>
              <p className="text-xs text-gray-500 mt-1">{new Date(item.date).toLocaleDateString()}</p>
            </div>
            <div className="flex items-center gap-4">
              <select 
                defaultValue={item.status}
                className="px-3 py-1 border rounded-md text-sm focus:ring-2 focus:ring-[#57ad63] outline-none"
              >
                <option value="Recibido">Recibido</option>
                <option value="En revisión">En revisión</option>
                <option value="En reparación">En reparación</option>
                <option value="Reparado">Reparado</option>
                <option value="Entregado">Entregado</option>
              </select>
              {item.amount && <span className="font-semibold text-gray-900">{item.amount}</span>}
            </div>
          </div>
        ))
      )}
    </div>
  );
}


