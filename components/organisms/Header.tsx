"use client";

import { useState } from "react";
import Logo from "../atoms/Logo";
import NavMenu from "../molecules/NavMenu";
import ActionIcons from "../molecules/ActionIcons";
import MobileMenuButton from "../atoms/MobileMenuButton";
import MobileMenuOverlay from "../molecules/MobileMenuOverlay";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="bg-black text-white px-4 sm:px-6 py-3 flex items-center justify-between shadow-md">
      <div className="flex items-center gap-4 sm:gap-8">
        <Logo />
        <div className="hidden lg:block">
          <NavMenu />
        </div>
      </div>
      
      <div className="hidden sm:block">
        <ActionIcons />
      </div>

      <MobileMenuButton 
        isOpen={isMobileMenuOpen} 
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
      />

      <MobileMenuOverlay 
        isOpen={isMobileMenuOpen} 
        onClose={() => setIsMobileMenuOpen(false)} 
      />
    </header>
  );
}
