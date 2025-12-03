"use client";

import { useState, useMemo } from "react";
import FilterGroup from "../molecules/FilterGroup";
import { useFilter, FilterState } from "../../contexts/FilterContext";
import { useProducts } from "../../hooks/useProducts";
import { extractBrand } from "../../utils/productMapper";

interface FilterConfig {
  key: keyof FilterState;
  label: string;
  options: Array<{ value: string; label: string }>;
}

export default function FilterSidebar() {
  const [expandedFilters, setExpandedFilters] = useState<Array<keyof FilterState>>([]);
  const { isFilterActive, toggleFilter, clearFilters } = useFilter();
  const { products } = useProducts();

  const filterConfig: FilterConfig[] = useMemo(() => {
    const tipos = Array.from(new Set(products.map(p => p.tipo).filter(Boolean))) as string[];
    const marcas = Array.from(new Set(products.map(p => extractBrand(p.nombre)).filter(Boolean))).sort();
    const capacidades = Array.from(new Set(products.map(p => p.capacidad).filter(Boolean))).sort();
    const colores = Array.from(new Set(products.map(p => p.color).filter(Boolean))).sort();

    const config: FilterConfig[] = [
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
        label: 'Tipo',
        options: tipos.map(tipo => ({
          value: tipo,
          label: tipo
        }))
      },
      {
        key: 'marca',
        label: 'Marca',
        options: marcas.map(marca => ({
          value: marca,
          label: marca
        }))
      },
      {
        key: 'precio',
        label: 'Rango de Precio',
        options: [
          { value: '0-500', label: 'Menos de $500.000' },
          { value: '500-1000', label: '$500.000 - $1.000.000' },
          { value: '1000-2000', label: '$1.000.000 - $2.000.000' },
          { value: '2000-3000', label: '$2.000.000 - $3.000.000' },
          { value: '3000-5000', label: '$3.000.000 - $5.000.000' },
          { value: '5000+', label: 'Más de $5.000.000' }
        ]
      },
      {
        key: 'capacidad',
        label: 'Capacidad',
        options: capacidades.map(cap => ({
          value: cap,
          label: cap
        }))
      },
      {
        key: 'color',
        label: 'Color',
        options: colores.map(color => ({
          value: color,
          label: color
        }))
      }
    ];

    return config.filter(filter => filter.options.length > 0);
  }, [products]);

  const handleToggleExpand = (filterKey: keyof FilterState) => {
    setExpandedFilters(prev => 
      prev.includes(filterKey) 
        ? prev.filter(f => f !== filterKey)
        : [...prev, filterKey]
    );
  };

  return (
    <div className="w-full lg:w-64 bg-white p-4 sm:p-6 rounded-lg shadow-md">
      <h3 className="text-base sm:text-lg font-bold text-gray-800 mb-4 sm:mb-6">Filtros</h3>
      
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
