"use client";
import { useState } from "react";
import Logo from "../atoms/Logo"
import NavMenu from "../molecules/NavMenu"
import ActionIcons from "../molecules/ActionIcons"
import { Menu, X } from "lucide-react";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="bg-black text-white px-4 sm:px-6 py-3 flex items-center justify-between shadow-md">
      <div className="flex items-center gap-4 sm:gap-8">
        <Logo />
        {/* Desktop Navigation */}
        <div className="hidden lg:block">
          <NavMenu />
        </div>
      </div>
      
      {/* Desktop Action Icons */}
      <div className="hidden sm:block">
        <ActionIcons />
      </div>

      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="lg:hidden p-2 hover:bg-gray-800 rounded-md transition-colors"
      >
        {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="fixed inset-0 bg-black bg-opacity-50" onClick={() => setIsMobileMenuOpen(false)} />
          <div className="fixed top-0 right-0 h-full w-80 bg-white text-black shadow-xl">
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <Logo />
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 hover:bg-gray-100 rounded-md transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              {/* Mobile Navigation */}
              <div className="flex-1 p-6">
                <div className="space-y-4">
                  <NavMenu mobile />
                </div>
              </div>

              {/* Mobile Action Icons */}
              <div className="p-6 border-t border-gray-200">
                <ActionIcons mobile />
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
