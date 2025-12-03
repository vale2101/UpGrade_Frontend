"use client";

import { useState, useRef, useEffect } from "react";
import { User } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../hooks/useAuthContext";
import { useIsStaff } from "../../hooks/useIsStaff";
import { useAdministradorAuth } from "../../hooks/useAdministradorAuth";
import { useVendedorAuth } from "../../hooks/useVendedorAuth";
import LoggedInUserMenu from "./LoggedInUserMenu";
import GuestUserMenu from "./GuestUserMenu";
import StaffUserMenu from "./StaffUserMenu";

export default function UserDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const { user, logout: userLogout, isLoading: authLoading } = useAuth();
  const { isStaff, isAdministrador, isTrabajador, isLoading: staffLoading } = useIsStaff();
  const { logout: administradorLogout } = useAdministradorAuth();
  const { logout: vendedorLogout } = useVendedorAuth();
  
  const isAuthenticatedUser = !authLoading && !staffLoading && user && user.id && !isStaff;

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

  const handleLogout = async () => {
    if (isAdministrador) {
      await administradorLogout();
    } else if (isTrabajador) {
      await vendedorLogout();
    } else {
      userLogout();
    }
    setIsOpen(false);
    router.push("/");
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="text-white hover:text-gray-300 p-1.5 sm:p-2 rounded-md hover:bg-gray-800 transition-colors"
        aria-label="Menú de usuario"
      >
        <User size={20} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
          {!staffLoading && !authLoading && (
            <>
              {isAuthenticatedUser && user ? (
                <LoggedInUserMenu 
                  userName={user.name} 
                  userEmail={user.email} 
                  onClose={handleClose}
                />
              ) : isStaff ? (
                <StaffUserMenu 
                  isAdministrador={isAdministrador}
                  isTrabajador={isTrabajador}
                  onLogout={handleLogout}
                  onClose={handleClose}
                />
              ) : (
                <GuestUserMenu onClose={handleClose} />
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
}
