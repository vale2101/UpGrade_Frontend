"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Search, X } from "lucide-react";
import SearchSection from "./SearchSection";
import { getSearchSections } from "../../contexts/DataContext";

interface SearchBarProps {
  mobile?: boolean;
}

export default function SearchBar({ mobile = false }: SearchBarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const searchInputRef = useRef<HTMLInputElement>(null);
  const searchBarRef = useRef<HTMLDivElement>(null);
  const searchSections = getSearchSections();
  const router = useRouter();

  const toggleSearchBar = () => {
    setIsOpen(!isOpen);
  };

  const handleSearch = (query: string) => {
    if (query.trim()) {
      setSearchQuery(query);
      setIsOpen(false);
      router.push(`/buscar?q=${encodeURIComponent(query)}`);
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

  if (mobile) {
    return (
      <div className="w-full">
        <div className="relative">
          <input
            ref={searchInputRef}
            type="text"
            placeholder="¿Qué busca?"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            className="w-full px-4 py-3 pl-12 pr-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none text-lg"
          />
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search size={20} className="text-gray-400" />
          </div>
        </div>
      </div>
    );
  }

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
          <div className="fixed top-0 right-0 h-full w-80 sm:w-96 bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out">
            <div className="h-full flex flex-col">
              {/* Header */}
              <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-200">
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
              <div className="flex-1 overflow-y-auto p-4 sm:p-6">
                {searchSections.map((section, index) => (
                  <SearchSection
                    key={index}
                    title={section.title}
                    items={section.items}
                    onSearch={handleSearch}
                  />
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}