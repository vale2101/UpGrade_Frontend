"use client";

import { useState } from "react";
import FilterGroup from "../molecules/FilterGroup";
import { useFilter, FilterState } from "../../contexts/FilterContext";

// Configuración de filtros
interface FilterConfig {
  key: keyof FilterState;
  label: string;
  options: Array<{ value: string; label: string }>;
}

const filterConfig: FilterConfig[] = [
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
    label: 'Tipo de Producto',
    options: [
      { value: 'Smartphone', label: 'Smartphone' },
      { value: 'Tablet', label: 'Tablet' },
      { value: 'Laptop', label: 'Laptop' },
      { value: 'Accesorio', label: 'Accesorio' }
    ]
  },
  {
    key: 'marca',
    label: 'Marca',
    options: [
      { value: 'Apple', label: 'Apple' },
      { value: 'Samsung', label: 'Samsung' },
      { value: 'Xiaomi', label: 'Xiaomi' },
      { value: 'Huawei', label: 'Huawei' },
      { value: 'Oppo', label: 'Oppo' },
      { value: 'Vivo', label: 'Vivo' },
      { value: 'Realme', label: 'Realme' },
      { value: 'OnePlus', label: 'OnePlus' },
      { value: 'Motorola', label: 'Motorola' },
      { value: 'Nokia', label: 'Nokia' },
      { value: 'Sony', label: 'Sony' },
      { value: 'LG', label: 'LG' },
      { value: 'Google', label: 'Google' },
      { value: 'Asus', label: 'Asus' },
      { value: 'Lenovo', label: 'Lenovo' },
      { value: 'Otras marcas', label: 'Otras marcas' }
    ]
  },
  {
    key: 'precio',
    label: 'Rango de Precio',
    options: [
      { value: '0-500', label: 'Menos de S/500' },
      { value: '500-1000', label: 'S/500 - S/1000' },
      { value: '1000-2000', label: 'S/1000 - S/2000' },
      { value: '2000-3000', label: 'S/2000 - S/3000' },
      { value: '3000-5000', label: 'S/3000 - S/5000' },
      { value: '5000+', label: 'Más de S/5000' }
    ]
  },
  {
    key: 'categoria',
    label: 'Categoría',
    options: [
      { value: 'smartphones', label: 'Smartphones' },
      { value: 'tablets', label: 'Tablets' },
      { value: 'laptops', label: 'Laptops' },
      { value: 'accesorios', label: 'Accesorios' }
    ]
  },
  {
    key: 'capacidad',
    label: 'Capacidad',
    options: [
      { value: '64GB', label: '64GB' },
      { value: '128GB', label: '128GB' },
      { value: '256GB', label: '256GB' },
      { value: '512GB', label: '512GB' },
      { value: '1TB', label: '1TB' }
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
  const [expandedFilters, setExpandedFilters] = useState<Array<keyof FilterState>>([]);
  const { isFilterActive, toggleFilter, clearFilters } = useFilter();

  const handleToggleExpand = (filterKey: keyof FilterState) => {
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
            isFilterActive={isFilterActive}
            onFilterChange={toggleFilter}
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
