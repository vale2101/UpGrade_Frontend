"use client";
import { createContext, useContext, useState, ReactNode } from 'react';

export interface FilterState {
  disponibilidad: string[];
  tipo: string[];
  marca: string[];
  precio: string[];
  categoria: string[];
  capacidad: string[];
  color: string[];
}

interface FilterContextType {
  filters: FilterState;
  setFilter: (filterType: keyof FilterState, values: string[]) => void;
  clearFilters: () => void;
  isFilterActive: (filterType: keyof FilterState, value: string) => boolean;
  toggleFilter: (filterType: keyof FilterState, value: string) => void;
}

const FilterContext = createContext<FilterContextType | undefined>(undefined);

const initialFilters: FilterState = {
  disponibilidad: [],
  tipo: [],
  marca: [],
  precio: [],
  categoria: [],
  capacidad: [],
  color: [],
};

export function FilterProvider({ children }: { children: ReactNode }) {
  const [filters, setFilters] = useState<FilterState>(initialFilters);

  const setFilter = (filterType: keyof FilterState, values: string[]) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: values
    }));
  };

  const clearFilters = () => {
    setFilters(initialFilters);
  };

  const isFilterActive = (filterType: keyof FilterState, value: string) => {
    return filters[filterType].includes(value);
  };

  const toggleFilter = (filterType: keyof FilterState, value: string) => {
    setFilters(prev => {
      const currentValues = prev[filterType];
      const isActive = currentValues.includes(value);
      
      if (isActive) {
        return {
          ...prev,
          [filterType]: currentValues.filter(v => v !== value)
        };
      } else {
        return {
          ...prev,
          [filterType]: [...currentValues, value]
        };
      }
    });
  };

  return (
    <FilterContext.Provider
      value={{
        filters,
        setFilter,
        clearFilters,
        isFilterActive,
        toggleFilter,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
}

export function useFilter() {
  const context = useContext(FilterContext);
  if (context === undefined) {
    throw new Error('useFilter must be used within a FilterProvider');
  }
  return context;
}



