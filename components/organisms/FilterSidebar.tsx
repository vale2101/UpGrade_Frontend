"use client";

import { useState } from "react";
import FilterGroup from "../molecules/FilterGroup";
import { useFilter } from "../../contexts/FilterContext";

// Configuración de filtros
const filterConfig = [
  {
    key: 'disponibilidad',
    label: 'Disponibilidad',
    options: [
      { value: 'En stock', label: 'En stock' },
      { value: 'Agotado', label: 'Agotado' }
    ]
  },
  {
    key: 'tipo',
    label: 'Tipo de producto',
    options: [
      { value: 'Smartphones', label: 'Smartphones' },
      { value: 'Tablets', label: 'Tablets' },
      { value: 'Accesorios', label: 'Accesorios' }
    ]
  },
  {
    key: 'marca',
    label: 'Marca',
    options: [
      { value: 'Samsung', label: 'Samsung' },
      { value: 'iPhone', label: 'iPhone' },
      { value: 'iPad', label: 'iPad' },
      { value: 'Vivo', label: 'Vivo' }
    ]
  },
  {
    key: 'precio',
    label: 'Precio',
    options: [
      { value: '0-300000', label: '$0 - $300.000' },
      { value: '300000-500000', label: '$300.000 - $500.000' },
      { value: '500000+', label: '$500.000+' }
    ]
  },
  {
    key: 'categoria',
    label: 'Categoría',
    options: [
      { value: 'Nuevos', label: 'Nuevos' },
      { value: 'Como Nuevo', label: 'Como Nuevo' },
      { value: 'Outlet', label: 'Outlet' }
    ]
  },
  {
    key: 'capacidad',
    label: 'Capacidad',
    options: [
      { value: '32GB', label: '32GB' },
      { value: '64GB', label: '64GB' },
      { value: '128GB', label: '128GB' },
      { value: '256GB+', label: '256GB+' }
    ]
  },
  {
    key: 'color',
    label: 'Color',
    options: [
      { value: 'Negro', label: 'Negro' },
      { value: 'Blanco', label: 'Blanco' },
      { value: 'Azul', label: 'Azul' },
      { value: 'Dorado', label: 'Dorado' }
    ]
  }
];

export default function FilterSidebar() {
  const [expandedFilters, setExpandedFilters] = useState<string[]>([]);
  const { isFilterActive, toggleFilter, clearFilters } = useFilter();

  const handleToggleExpand = (filterKey: string) => {
    setExpandedFilters(prev => 
      prev.includes(filterKey) 
        ? prev.filter(f => f !== filterKey)
        : [...prev, filterKey]
    );
  };

  return (
    <div className="w-64 bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-lg font-bold text-gray-800 mb-6">Filtros</h3>
      
      <div className="space-y-1">
        {filterConfig.map((filter) => (
          <FilterGroup
            key={filter.key}
            label={filter.label}
            filterKey={filter.key}
            options={filter.options}
            isExpanded={expandedFilters.includes(filter.key)}
            onToggle={() => handleToggleExpand(filter.key)}
            isFilterActive={(key, value) => isFilterActive(key as any, value)}
            onFilterChange={(key, value) => toggleFilter(key as any, value)}
          />
        ))}
      </div>
      
      <div className="mt-6 pt-4 border-t border-gray-200">
        <button
          onClick={clearFilters}
          className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 px-4 rounded-lg transition-colors text-sm font-medium"
        >
          Limpiar Filtros
        </button>
      </div>
    </div>
  );
}
