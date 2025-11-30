"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import SearchPanel from "./SearchPanel";
import { getSearchSections } from "../../contexts/DataContext";

interface SearchBarProps {
  mobile?: boolean;
}

export default function SearchBar({ mobile = false }: SearchBarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const searchBarRef = useRef<HTMLDivElement>(null);
  const searchSections = getSearchSections();
  const router = useRouter();

  const handleSearch = (query: string) => {
    if (query.trim()) {
      setSearchQuery(query);
      setIsOpen(false);
      
      if (query.startsWith("/")) {
        router.push(query);
      } else {
        router.push(`/promociones?q=${encodeURIComponent(query)}`);
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch(e.currentTarget.value);
    }
  };

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
    document.body.style.overflow = isOpen ? 'hidden' : 'unset';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (mobile) {
    return (
      <div className="w-full">
        <div className="relative">
          <input
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
      <button
        onClick={() => setIsOpen(true)}
        className="p-2 hover:bg-gray-100 rounded-full transition-colors"
        aria-label="Buscar"
      >
        <Search size={20} />
      </button>

      <SearchPanel
        isOpen={isOpen}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onClose={() => setIsOpen(false)}
        onSearch={handleSearch}
        sections={searchSections}
      />
    </div>
  );
}
