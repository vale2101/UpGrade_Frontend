"use client";

import { useState, useRef, useEffect } from "react";
import { Search, X } from "lucide-react";

export default function SearchBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const searchInputRef = useRef<HTMLInputElement>(null);
  const searchBarRef = useRef<HTMLDivElement>(null);

  const toggleSearchBar = () => {
    setIsOpen(!isOpen);
  };

  const handleSearch = (query: string) => {
    if (query.trim()) {
      console.log("Buscando:", query);
      setSearchQuery(query);
      // Implement actual search logic here
      setIsOpen(false); // Close after search
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch(e.currentTarget.value);
    }
  };

  useEffect(() => {
    if (isOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isOpen]);

  // Close search bar when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchBarRef.current && !searchBarRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Prevent body scroll when overlay is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <div className="relative" ref={searchBarRef}>
      {/* Botón de búsqueda */}
      <button
        onClick={toggleSearchBar}
        className="p-2 hover:bg-gray-100 rounded-full transition-colors"
      >
        <Search size={20} />
      </button>

      {isOpen && (
        <>
          {/* Search Overlay */}
          <div className="fixed top-0 right-0 h-full w-96 bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out">
            <div className="h-full flex flex-col">
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <div className="flex items-center gap-3">
                  <Search size={24} className="text-gray-600" />
                  <input
                    ref={searchInputRef}
                    type="text"
                    placeholder="¿Qué busca?"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="flex-1 text-lg border-none outline-none placeholder-gray-500 text-black"
                    onKeyDown={handleKeyDown}
                  />
                </div>
                <button
                  onClick={toggleSearchBar}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X size={24} className="text-gray-600" />
                </button>
              </div>

              {/* Content */}
              <div className="flex-1 overflow-y-auto p-6">
                {/* INICIO */}
                <div className="mb-8">
                  <h3 className="text-sm font-bold text-gray-800 uppercase tracking-wide mb-4">INICIO</h3>
                  <div className="space-y-2">
                    <button className="block w-full text-left py-2 px-3 hover:bg-gray-100 rounded-md transition-colors text-gray-900">
                      Inicio
                    </button>
                  </div>
                </div>

                {/* PRODUCTOS */}
                <div className="mb-8">
                  <h3 className="text-sm font-bold text-gray-800 uppercase tracking-wide mb-4">PRODUCTOS</h3>
                  <div className="space-y-2">
                    <button onClick={() => handleSearch("Samsung Galaxy S24")} className="block w-full text-left py-2 px-3 hover:bg-gray-100 rounded-md transition-colors text-gray-900">
                      Samsung Gama S24
                    </button>
                    <button onClick={() => handleSearch("Samsung Galaxy S23")} className="block w-full text-left py-2 px-3 hover:bg-gray-100 rounded-md transition-colors text-gray-900">
                      Samsung Gama S23
                    </button>
                    <button onClick={() => handleSearch("Samsung Galaxy S22")} className="block w-full text-left py-2 px-3 hover:bg-gray-100 rounded-md transition-colors text-gray-900">
                      Samsung Gama S22
                    </button>
                    <button onClick={() => handleSearch("Samsung Galaxy Z")} className="block w-full text-left py-2 px-3 hover:bg-gray-100 rounded-md transition-colors text-gray-900">
                      Samsung Galaxy Z
                    </button>
                    <button onClick={() => handleSearch("Samsung Galaxy A")} className="block w-full text-left py-2 px-3 hover:bg-gray-100 rounded-md transition-colors text-gray-900">
                      Samsung Galaxy A y M
                    </button>
                    <button onClick={() => handleSearch("Apple Watch")} className="block w-full text-left py-2 px-3 hover:bg-gray-100 rounded-md transition-colors text-gray-900">
                      Apple Watch
                    </button>
                    <button onClick={() => handleSearch("iPhone 15")} className="block w-full text-left py-2 px-3 hover:bg-gray-100 rounded-md transition-colors text-gray-900">
                      iPhone Familia 15
                    </button>
                    <button onClick={() => handleSearch("iPhone 14")} className="block w-full text-left py-2 px-3 hover:bg-gray-100 rounded-md transition-colors text-gray-900">
                      iPhone Familia 14
                    </button>
                    <button onClick={() => handleSearch("iPhone 13")} className="block w-full text-left py-2 px-3 hover:bg-gray-100 rounded-md transition-colors text-gray-900">
                      iPhone Familia 13
                    </button>
                    <button onClick={() => handleSearch("iPhone 12")} className="block w-full text-left py-2 px-3 hover:bg-gray-100 rounded-md transition-colors text-gray-900">
                      iPhone Familia 12
                    </button>
                    <button onClick={() => handleSearch("iPhone 11")} className="block w-full text-left py-2 px-3 hover:bg-gray-100 rounded-md transition-colors text-gray-900">
                      iPhone Familia 11
                    </button>
                    <button onClick={() => handleSearch("Tablets Samsung")} className="block w-full text-left py-2 px-3 hover:bg-gray-100 rounded-md transition-colors text-gray-900">
                      Tablets Samsung
                    </button>
                    <button onClick={() => handleSearch("Otras marcas")} className="block w-full text-left py-2 px-3 hover:bg-gray-100 rounded-md transition-colors text-gray-900">
                      Otras marcas
                    </button>
                    <button onClick={() => handleSearch("Promociones")} className="block w-full text-left py-2 px-3 hover:bg-gray-100 rounded-md transition-colors text-gray-900">
                      Promociones
                    </button>
                    <button onClick={() => handleSearch("Sin IVA")} className="block w-full text-left py-2 px-3 hover:bg-gray-100 rounded-md transition-colors text-gray-900">
                      Sin IVA
                    </button>
                    <button onClick={() => handleSearch("iPad")} className="block w-full text-left py-2 px-3 hover:bg-gray-100 rounded-md transition-colors text-gray-900">
                      iPad
                    </button>
                  </div>
                </div>

                {/* BENEFICIO DE 30 DÍAS */}
                <div className="mb-8">
                  <h3 className="text-sm font-bold text-gray-800 uppercase tracking-wide mb-4">BENEFICIO DE 30 DÍAS</h3>
                  <div className="space-y-2">
                    <button className="block w-full text-left py-2 px-3 hover:bg-gray-100 rounded-md transition-colors text-gray-900">
                      Garantía de 30 días
                    </button>
                  </div>
                </div>

                {/* QUIÉNES SOMOS */}
                <div className="mb-8">
                  <h3 className="text-sm font-bold text-gray-800 uppercase tracking-wide mb-4">QUIÉNES SOMOS</h3>
                  <div className="space-y-2">
                    <button className="block w-full text-left py-2 px-3 hover:bg-gray-100 rounded-md transition-colors text-gray-900">
                      Categorías
                    </button>
                    <button className="block w-full text-left py-2 px-3 hover:bg-gray-100 rounded-md transition-colors text-gray-900">
                      Calidad
                    </button>
                    <button className="block w-full text-left py-2 px-3 hover:bg-gray-100 rounded-md transition-colors text-gray-900">
                      Garantía
                    </button>
                    <button className="block w-full text-left py-2 px-3 hover:bg-gray-100 rounded-md transition-colors text-gray-900">
                      Métodos de pago
                    </button>
                    <button className="block w-full text-left py-2 px-3 hover:bg-gray-100 rounded-md transition-colors text-gray-900">
                      Medio ambiente
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}