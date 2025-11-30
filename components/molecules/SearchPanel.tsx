"use client";

import { useRef, useEffect } from "react";
import { Search, X } from "lucide-react";
import SearchSection from "./SearchSection";
import { SearchSection as SearchSectionType } from "../../contexts/DataContext";

interface SearchPanelProps {
  isOpen: boolean;
  searchQuery: string;
  onSearchChange: (value: string) => void;
  onClose: () => void;
  onSearch: (query: string) => void;
  sections: SearchSectionType[];
}

export default function SearchPanel({ 
  isOpen, 
  searchQuery, 
  onSearchChange, 
  onClose, 
  onSearch,
  sections 
}: SearchPanelProps) {
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isOpen]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onSearch(e.currentTarget.value);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed top-0 right-0 h-full w-80 sm:w-96 bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out">
      <div className="h-full flex flex-col">
        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-200">
          <div className="flex items-center gap-3 flex-1">
            <Search size={24} className="text-gray-600" />
            <input
              ref={searchInputRef}
              type="text"
              placeholder="¿Qué busca?"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="flex-1 text-lg border-none outline-none placeholder-gray-500 text-black"
              onKeyDown={handleKeyDown}
            />
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            aria-label="Cerrar búsqueda"
          >
            <X size={24} className="text-gray-600" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 sm:p-6">
          {sections.map((section, index) => (
            <SearchSection
              key={index}
              title={section.title}
              items={section.items}
              onSearch={onSearch}
            />
          ))}
        </div>
      </div>
    </div>
  );
}


