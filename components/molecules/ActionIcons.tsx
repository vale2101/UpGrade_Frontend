"use client";
import Link from "next/link";
import IconButton from "../atoms/IconButton";
import SearchBar from "./SearchBar";
import { Mail, User, ShoppingCart } from "lucide-react";
import { useCart } from "../../contexts/CartContext";

export default function ActionIcons() {
  const { getTotalItems } = useCart();
  const totalItems = getTotalItems();

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
        {totalItems > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
            {totalItems > 99 ? '99+' : totalItems}
          </span>
        )}
      </div>
    </div>
  );
}
