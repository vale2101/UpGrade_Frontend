"use client";

import { User, LogOut } from "lucide-react";
import DropdownMenuItem from "../atoms/DropdownMenuItem";

interface StaffUserMenuProps {
  isAdministrador?: boolean;
  isTrabajador?: boolean;
  onLogout: () => void;
  onClose: () => void;
}

export default function StaffUserMenu({ 
  isAdministrador = false,
  isTrabajador = false,
  onLogout, 
  onClose 
}: StaffUserMenuProps) {
  // Determinar la ruta del dashboard según el tipo de usuario
  const dashboardUrl = isAdministrador 
    ? "/administrador/dashboard" 
    : isTrabajador 
    ? "/vendedor/dashboard" 
    : "/";

  return (
    <>
      <div className="py-1">
        <DropdownMenuItem 
          href={dashboardUrl}
          icon={<User size={16} />} 
          label="Mi Perfil" 
          onClick={onClose}
        />
      </div>

      <div className="border-t border-gray-100 my-1"></div>

      <div className="py-1">
        <DropdownMenuItem 
          icon={<LogOut size={16} />} 
          label="Cerrar Sesión" 
          onClick={() => {
            onLogout();
            onClose();
          }}
          variant="danger"
        />
      </div>
    </>
  );
}

