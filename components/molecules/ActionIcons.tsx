import IconButton from "../atoms/IconButton";
import { Mail, Search, User, ShoppingCart } from "lucide-react";

export default function ActionIcons() {
  return (
    <div className="flex items-center gap-4">
      <IconButton><Mail size={20} /></IconButton>
      <IconButton><Search size={20} /></IconButton>
      <IconButton><User size={20} /></IconButton>
      <div className="relative">
        <IconButton><ShoppingCart size={20} /></IconButton>
        <span className="absolute -top-2 -right-2 bg-white text-black text-xs rounded-full px-1">
          0
        </span>
      </div>
    </div>
  );
}
