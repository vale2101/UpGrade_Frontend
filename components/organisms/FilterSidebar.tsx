"use client";

import { useState } from "react";
import FilterItem from "../molecules/FilterItem";

export default function FilterSidebar() {
  const [expandedFilters, setExpandedFilters] = useState<string[]>([]);

  const toggleFilter = (filterName: string) => {
    setExpandedFilters(prev => 
      prev.includes(filterName) 
        ? prev.filter(f => f !== filterName)
        : [...prev, filterName]
    );
  };

  return (
    <div className="w-64 bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-lg font-bold text-gray-800 mb-6">Filtros</h3>
      
      <div className="space-y-1">
        <FilterItem
          label="Disponibilidad"
          isExpanded={expandedFilters.includes('disponibilidad')}
          onToggle={() => toggleFilter('disponibilidad')}
        >
          <div className="space-y-2">
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" />
              <span className="text-sm">En stock</span>
            </label>
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" />
              <span className="text-sm">Agotado</span>
            </label>
          </div>
        </FilterItem>

        <FilterItem
          label="Tipo de producto"
          isExpanded={expandedFilters.includes('tipo')}
          onToggle={() => toggleFilter('tipo')}
        >
          <div className="space-y-2">
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" />
              <span className="text-sm">Smartphones</span>
            </label>
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" />
              <span className="text-sm">Tablets</span>
            </label>
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" />
              <span className="text-sm">Accesorios</span>
            </label>
          </div>
        </FilterItem>

        <FilterItem
          label="Marca"
          isExpanded={expandedFilters.includes('marca')}
          onToggle={() => toggleFilter('marca')}
        >
          <div className="space-y-2">
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" />
              <span className="text-sm">Samsung</span>
            </label>
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" />
              <span className="text-sm">iPhone</span>
            </label>
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" />
              <span className="text-sm">iPad</span>
            </label>
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" />
              <span className="text-sm">Vivo</span>
            </label>
          </div>
        </FilterItem>

        <FilterItem
          label="Precio"
          isExpanded={expandedFilters.includes('precio')}
          onToggle={() => toggleFilter('precio')}
        >
          <div className="space-y-2">
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" />
              <span className="text-sm">$0 - $300.000</span>
            </label>
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" />
              <span className="text-sm">$300.000 - $500.000</span>
            </label>
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" />
              <span className="text-sm">$500.000+</span>
            </label>
          </div>
        </FilterItem>

        <FilterItem
          label="Categoría"
          isExpanded={expandedFilters.includes('categoria')}
          onToggle={() => toggleFilter('categoria')}
        >
          <div className="space-y-2">
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" />
              <span className="text-sm">Nuevos</span>
            </label>
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" />
              <span className="text-sm">Como Nuevo</span>
            </label>
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" />
              <span className="text-sm">Outlet</span>
            </label>
          </div>
        </FilterItem>

        <FilterItem
          label="Capacidad"
          isExpanded={expandedFilters.includes('capacidad')}
          onToggle={() => toggleFilter('capacidad')}
        >
          <div className="space-y-2">
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" />
              <span className="text-sm">32GB</span>
            </label>
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" />
              <span className="text-sm">64GB</span>
            </label>
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" />
              <span className="text-sm">128GB</span>
            </label>
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" />
              <span className="text-sm">256GB+</span>
            </label>
          </div>
        </FilterItem>

        <FilterItem
          label="Color"
          isExpanded={expandedFilters.includes('color')}
          onToggle={() => toggleFilter('color')}
        >
          <div className="space-y-2">
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" />
              <span className="text-sm">Negro</span>
            </label>
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" />
              <span className="text-sm">Blanco</span>
            </label>
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" />
              <span className="text-sm">Azul</span>
            </label>
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" />
              <span className="text-sm">Dorado</span>
            </label>
          </div>
        </FilterItem>
      </div>
    </div>
  );
}
