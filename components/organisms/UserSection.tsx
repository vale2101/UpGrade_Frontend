"use client";

import { useRouter } from "next/navigation";
import { LogOut, MapPin, Package, ClipboardList } from "lucide-react";
import { useAuth } from "../../hooks/useAuthContext";
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-6 md:py-8">
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-4 sm:p-5 md:p-6 mb-4 sm:mb-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
          <div className="flex items-center gap-3 sm:gap-4 w-full sm:w-auto">
            <div className="h-10 w-10 sm:h-12 sm:w-12 md:h-14 md:w-14 rounded-full bg-black text-white flex items-center justify-center font-semibold text-sm sm:text-base flex-shrink-0">
              {initials}
            </div>
            <div className="min-w-0 flex-1">
              <h1 className="text-lg sm:text-xl md:text-2xl font-bold truncate">Hola, {user?.name}</h1>
              <p className="text-gray-600 text-xs sm:text-sm">Gestiona tus pedidos y tu información personal</p>
            </div>
          </div>
          <button onClick={handleLogout} className="w-full sm:w-auto inline-flex items-center justify-center gap-2 text-red-600 hover:bg-red-50 border border-red-200 px-3 py-2 rounded-md text-xs sm:text-sm md:text-base transition-colors whitespace-nowrap">
            <LogOut size={16} className="flex-shrink-0" /> 
            <span className="sm:hidden">Cerrar sesión</span>
            <span className="hidden sm:inline">Cerrar sesión</span>
          </button>
        </div>
      </div>

      <Tabs
        items={[
          { key: "orders", label: "Pedidos", icon: <Package size={16} />, content: <EmptyOrders /> },
          { key: "address", label: "Dirección", icon: <MapPin size={16} />, content: <AddressForm /> },
          { key: "status", label: "Estado de reparación", icon: <ClipboardList size={16} />, content: <RepairStatus /> },
          { key: "history", label: "Historial de servicios", icon: <ClipboardList size={16} />, content: <ServiceHistory /> }
        ]}
      />
    </div>
  );
}

