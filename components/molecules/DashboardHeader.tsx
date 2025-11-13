import { LogOut } from "lucide-react";

interface DashboardHeaderProps {
  userName: string;
  onLogout: () => void;
}

export default function DashboardHeader({ userName, onLogout }: DashboardHeaderProps) {
  return (
    <div className="bg-white border-b">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard Vendedor</h1>
          <p className="text-sm text-gray-600">Bienvenido, {userName}</p>
        </div>
        <button 
          onClick={onLogout}
          className="inline-flex items-center gap-2 text-red-600 hover:bg-red-50 border border-red-200 px-4 py-2 rounded-md transition-colors"
        >
          <LogOut size={16} />
          Cerrar sesión
        </button>
      </div>
    </div>
  );
}


