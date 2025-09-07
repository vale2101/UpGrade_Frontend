import Link from "next/link";
import IconButton from "../atoms/IconButton";
import { Mail, Search, User, ShoppingCart } from "lucide-react";

export default function ActionIcons() {
  return (
    <div className="flex items-center gap-4">
      {/* Mail */}
      <Link href="/contacto">
        <IconButton>
          <Mail size={20} />
        </IconButton>
      </Link>

      {/* Search */}
      <Link href="/buscar">
        <IconButton>
          <Search size={20} />
        </IconButton>
      </Link>

      {/* User */}
      <Link href="/login">
        <IconButton>
          <User size={20} />
        </IconButton>
      </Link>

      {/* Carrito */}
      <div className="relative">
        <Link href="/carrito">
          <IconButton>
            <ShoppingCart size={20} />
          </IconButton>
        </Link>
        <span className="absolute -top-2 -right-2 bg-white text-black text-xs rounded-full px-1">
          0
        </span>
      </div>
    </div>
  );
}
