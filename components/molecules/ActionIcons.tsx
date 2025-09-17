"use client";
import Link from "next/link";
import IconButton from "../atoms/IconButton";
import SearchBar from "./SearchBar";
import UserDropdown from "./UserDropdown";
import { Mail, ShoppingCart } from "lucide-react";
import { useCart } from "../../contexts/CartContext";

interface ActionIconsProps {
  mobile?: boolean;
}

export default function ActionIcons({ mobile = false }: ActionIconsProps) {
  const { getTotalItems } = useCart();
  const totalItems = getTotalItems();

  if (mobile) {
    return (
      <div className="flex flex-col space-y-4">
        {/* Search */}
        <div className="w-full">
          <SearchBar mobile />
        </div>

        <div className="flex items-center justify-center space-x-6">
          {/* Mail */}
          <Link href="/ayuda" className="flex items-center space-x-2 text-gray-700 hover:text-black transition-colors">
            <Mail size={24} />
            <span className="text-lg font-medium">Ayuda</span>
          </Link>

          {/* User */}
          <div className="flex items-center space-x-2 text-gray-700 hover:text-black transition-colors">
            <UserDropdown />
            <span className="text-lg font-medium">Mi Cuenta</span>
          </div>

          {/* Carrito */}
          <div className="relative">
            <Link href="/carrito" className="flex items-center space-x-2 text-gray-700 hover:text-black transition-colors">
              <ShoppingCart size={24} />
              <span className="text-lg font-medium">Carrito</span>
            </Link>
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                {totalItems > 99 ? '99+' : totalItems}
              </span>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-4">
      {/* Mail */}
      <Link href="/ayuda">
        <IconButton>
          <Mail size={20} />
        </IconButton>
      </Link>

      {/* Search */}
      <SearchBar />

      {/* User */}
      <UserDropdown />

      {/* Carrito */}
      <div className="relative">
        <Link href="/carrito">
          <IconButton>
            <ShoppingCart size={20} />
          </IconButton>
        </Link>
        {totalItems > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
            {totalItems > 99 ? '99+' : totalItems}
          </span>
        )}
      </div>
    </div>
  );
}
