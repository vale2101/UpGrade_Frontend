"use client";

import { useRouter } from "next/navigation";
import { LogOut, MapPin, Package, ClipboardList } from "lucide-react";
import { useAuth } from "../../hooks/AuthContext";
import Tabs from "../molecules/UserTabs";
import EmptyOrders from "../molecules/EmptyOrders";
import AddressForm from "./AddressForm";
import RepairStatus from "../molecules/RepairStatus";
import ServiceHistory from "../molecules/ServiceHistory";

export default function UserSection() {
  const { user, logout } = useAuth();
  const router = useRouter();
  
  const handleLogout = () => {
    logout();
    router.push("/");
  };
  
  const initials = (user?.name || "U").split(" ").map(s => s[0]).slice(0,2).join("").toUpperCase();

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5 sm:p-6 mb-6">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 sm:h-14 sm:w-14 rounded-full bg-black text-white flex items-center justify-center font-semibold">
              {initials}
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold">Hola, {user?.name}</h1>
              <p className="text-gray-600 text-sm">Gestiona tus pedidos y tu información personal</p>
            </div>
          </div>
          <button onClick={handleLogout} className="inline-flex items-center gap-2 text-red-600 hover:bg-red-50 border border-red-200 px-3 py-2 rounded-md">
            <LogOut size={16} /> Cerrar sesión
          </button>
        </div>
      </div>

      <Tabs
        items={[
          { key: "orders", label: "Pedidos", icon: <Package size={16} />, content: <EmptyOrders /> },
          { key: "address", label: "Dirección", icon: <MapPin size={16} />, content: <AddressForm /> },
          { key: "status", label: "Estado de reparación", icon: <ClipboardList size={16} />, content: <RepairStatus /> },
          { key: "history", label: "Historial de servicios", icon: <ClipboardList size={16} />, content: <ServiceHistory /> },
          { key: "logout", label: "Cierre de sesión", icon: <LogOut size={16} />, content: (
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <p className="mb-4 text-gray-700">¿Deseas cerrar tu sesión en este dispositivo?</p>
              <button onClick={handleLogout} className="bg-red-600 text-white px-6 py-2 rounded-full font-semibold hover:bg-red-700">Cerrar sesión</button>
            </div>
          ) }
        ]}
      />
    </div>
  );
}

