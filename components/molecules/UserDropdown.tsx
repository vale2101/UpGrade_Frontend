"use client";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { User, LogIn, UserPlus, ShoppingBag, Wrench, History, LogOut, Store } from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";

export default function UserDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { user, logout } = useAuth();

  // Cerrar dropdown al hacer click fuera
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    logout();
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Botón del usuario */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="text-white hover:text-gray-300 p-1.5 sm:p-2 rounded-md hover:bg-gray-800 transition-colors"
      >
        <User size={20} />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
          {user ? (
            // Usuario logueado
            <>
              {/* Información del usuario */}
              <div className="px-4 py-3 border-b border-gray-100">
                <p className="text-sm font-medium text-gray-900">{user.name}</p>
                <p className="text-xs text-gray-500">{user.email}</p>
              </div>

              {/* Opciones del menú */}
              <div className="py-1">
                <Link
                  href="/user"
                  className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  <User size={16} className="mr-3" />
                  Mi Perfil
                </Link>
                
                <Link
                  href="/carrito"
                  className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  <ShoppingBag size={16} className="mr-3" />
                  Mis Compras
                </Link>
                
                <Link
                  href="/reparaciones"
                  className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  <Wrench size={16} className="mr-3" />
                  Mis Reparaciones
                </Link>
                
                <Link
                  href="/user/historial"
                  className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  <History size={16} className="mr-3" />
                  Historial de Servicio
                </Link>
              </div>

              {/* Separador */}
              <div className="border-t border-gray-100 my-1"></div>

              {/* Iniciar sesión como vendedor */}
              <Link
                href="/vendedor/login"
                className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                <Store size={16} className="mr-3" />
                Iniciar sesión como vendedor
              </Link>

              {/* Separador */}
              <div className="border-t border-gray-100 my-1"></div>

              {/* Cerrar sesión */}
              <button
                onClick={handleLogout}
                className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
              >
                <LogOut size={16} className="mr-3" />
                Cerrar Sesión
              </button>
            </>
          ) : (
            // Usuario no logueado
            <div className="py-1">
              <Link
                href="/login"
                className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                <LogIn size={16} className="mr-3" />
                Iniciar Sesión
              </Link>
              
              <div className="border-t border-gray-100 my-1"></div>
              
              <Link
                href="/register"
                className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                <UserPlus size={16} className="mr-3" />
                Registrarse
              </Link>
              
              <Link
                href="/vendedor/login"
                className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                <Store size={16} className="mr-3" />
                Iniciar sesión como vendedor
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

