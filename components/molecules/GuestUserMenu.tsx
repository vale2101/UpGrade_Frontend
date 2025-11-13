import { LogIn, UserPlus, Store } from "lucide-react";
import DropdownMenuItem from "../atoms/DropdownMenuItem";

interface GuestUserMenuProps {
  onClose: () => void;
}

export default function GuestUserMenu({ onClose }: GuestUserMenuProps) {
  return (
    <div className="py-1">
      <DropdownMenuItem 
        href="/login" 
        icon={<LogIn size={16} />} 
        label="Iniciar Sesión" 
        onClick={onClose}
      />
      
      <div className="border-t border-gray-100 my-1"></div>
      
      <DropdownMenuItem 
        href="/register" 
        icon={<UserPlus size={16} />} 
        label="Registrarse" 
        onClick={onClose}
      />
      
      <DropdownMenuItem 
        href="/vendedor/login" 
        icon={<Store size={16} />} 
        label="Iniciar sesión como vendedor" 
        onClick={onClose}
      />
    </div>
  );
}


