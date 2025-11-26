"use client";

import { useState, useRef, useEffect } from "react";
import { User } from "lucide-react";
import { useAuth } from "../../hooks/AuthContext";
import LoggedInUserMenu from "./LoggedInUserMenu";
import GuestUserMenu from "./GuestUserMenu";

export default function UserDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { user, logout } = useAuth();

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
          {user ? (
            <LoggedInUserMenu 
              userName={user.name} 
              userEmail={user.email} 
              onLogout={handleLogout}
              onClose={handleClose}
            />
          ) : (
            <GuestUserMenu onClose={handleClose} />
          )}
        </div>
      )}
    </div>
  );
}
