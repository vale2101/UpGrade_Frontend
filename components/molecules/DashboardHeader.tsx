import { LogOut } from "lucide-react";

interface DashboardHeaderProps {
  userName: string;
  onLogout: () => void;
}

export default function DashboardHeader({ userName, onLogout }: DashboardHeaderProps) {
  return (
    <div className="bg-white border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Dashboard Vendedor</h1>
          <p className="text-xs sm:text-sm text-gray-600">Bienvenido, {userName}</p>
        </div>
        <button 
          onClick={onLogout}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 text-red-600 hover:bg-red-50 border border-red-200 px-3 sm:px-4 py-2 rounded-md transition-colors text-sm sm:text-base"
        >
          <LogOut size={16} />
          <span className="sm:hidden md:inline">Cerrar sesión</span><span className="hidden sm:inline md:hidden">Cerrar</span>
        </button>
      </div>
    </div>
  );
}


