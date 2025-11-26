"use client";

import { X } from "lucide-react";
import Logo from "../atoms/Logo";
import NavMenu from "./NavMenu";
import ActionIcons from "./ActionIcons";

interface MobileMenuOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileMenuOverlay({ isOpen, onClose }: MobileMenuOverlayProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      <div 
        className="fixed inset-0 bg-black bg-opacity-50" 
        onClick={onClose}
        aria-hidden="true"
      />
      
      <div className="fixed top-0 right-0 h-full w-80 bg-white text-black shadow-xl">
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <Logo />
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-md transition-colors"
              aria-label="Cerrar menú"
            >
              <X size={24} />
            </button>
          </div>

          <div className="flex-1 p-6 overflow-y-auto">
            <div className="space-y-4">
              <NavMenu mobile />
            </div>
          </div>

          <div className="p-6 border-t border-gray-200">
            <ActionIcons mobile />
          </div>
        </div>
      </div>
    </div>
  );
}


