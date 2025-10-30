import { User, ShoppingBag, Wrench, History, LogOut, Store } from "lucide-react";
import DropdownMenuItem from "../atoms/DropdownMenuItem";
import UserInfo from "../atoms/UserInfo";

interface LoggedInUserMenuProps {
  userName: string;
  userEmail: string;
  onLogout: () => void;
  onClose: () => void;
}

export default function LoggedInUserMenu({ 
  userName, 
  userEmail, 
  onLogout, 
  onClose 
}: LoggedInUserMenuProps) {
  return (
    <>
      <UserInfo name={userName} email={userEmail} />

      <div className="py-1">
        <DropdownMenuItem 
          href="/user?tab=orders" 
          icon={<User size={16} />} 
          label="Mi Perfil" 
          onClick={onClose}
        />
        <DropdownMenuItem 
          href="/user?tab=orders" 
          icon={<ShoppingBag size={16} />} 
          label="Mis Compras" 
          onClick={onClose}
        />
        <DropdownMenuItem 
          href="/user?tab=status" 
          icon={<Wrench size={16} />} 
          label="Mis Reparaciones" 
          onClick={onClose}
        />
        <DropdownMenuItem 
          href="/user?tab=history" 
          icon={<History size={16} />} 
          label="Historial de Servicio" 
          onClick={onClose}
        />
      </div>

      <div className="border-t border-gray-100 my-1"></div>

      <DropdownMenuItem 
        href="/vendedor/login" 
        icon={<Store size={16} />} 
        label="Iniciar sesión como vendedor" 
        onClick={onClose}
      />

      <div className="border-t border-gray-100 my-1"></div>

      <DropdownMenuItem 
        icon={<LogOut size={16} />} 
        label="Cerrar Sesión" 
        onClick={onLogout}
        variant="danger"
      />
    </>
  );
}

