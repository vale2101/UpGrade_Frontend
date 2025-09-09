"use client";

import { useState } from "react";
import FilterItem from "../molecules/FilterItem";
import { useFilter } from "../../contexts/FilterContext";

export default function FilterSidebar() {
  const [expandedFilters, setExpandedFilters] = useState<string[]>([]);
  const { isFilterActive, toggleFilter: toggleFilterValue, clearFilters } = useFilter();

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
              <input 
                type="checkbox" 
                className="mr-2" 
                checked={isFilterActive('disponibilidad', 'En stock')}
                onChange={() => toggleFilterValue('disponibilidad', 'En stock')}
              />
              <span className="text-sm">En stock</span>
            </label>
            <label className="flex items-center">
              <input 
                type="checkbox" 
                className="mr-2" 
                checked={isFilterActive('disponibilidad', 'Agotado')}
                onChange={() => toggleFilterValue('disponibilidad', 'Agotado')}
              />
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
              <input 
                type="checkbox" 
                className="mr-2" 
                checked={isFilterActive('tipo', 'Smartphones')}
                onChange={() => toggleFilterValue('tipo', 'Smartphones')}
              />
              <span className="text-sm">Smartphones</span>
            </label>
            <label className="flex items-center">
              <input 
                type="checkbox" 
                className="mr-2" 
                checked={isFilterActive('tipo', 'Tablets')}
                onChange={() => toggleFilterValue('tipo', 'Tablets')}
              />
              <span className="text-sm">Tablets</span>
            </label>
            <label className="flex items-center">
              <input 
                type="checkbox" 
                className="mr-2" 
                checked={isFilterActive('tipo', 'Accesorios')}
                onChange={() => toggleFilterValue('tipo', 'Accesorios')}
              />
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
              <input 
                type="checkbox" 
                className="mr-2" 
                checked={isFilterActive('marca', 'Samsung')}
                onChange={() => toggleFilterValue('marca', 'Samsung')}
              />
              <span className="text-sm">Samsung</span>
            </label>
            <label className="flex items-center">
              <input 
                type="checkbox" 
                className="mr-2" 
                checked={isFilterActive('marca', 'iPhone')}
                onChange={() => toggleFilterValue('marca', 'iPhone')}
              />
              <span className="text-sm">iPhone</span>
            </label>
            <label className="flex items-center">
              <input 
                type="checkbox" 
                className="mr-2" 
                checked={isFilterActive('marca', 'iPad')}
                onChange={() => toggleFilterValue('marca', 'iPad')}
              />
              <span className="text-sm">iPad</span>
            </label>
            <label className="flex items-center">
              <input 
                type="checkbox" 
                className="mr-2" 
                checked={isFilterActive('marca', 'Vivo')}
                onChange={() => toggleFilterValue('marca', 'Vivo')}
              />
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
              <input 
                type="checkbox" 
                className="mr-2" 
                checked={isFilterActive('precio', '0-300000')}
                onChange={() => toggleFilterValue('precio', '0-300000')}
              />
              <span className="text-sm">$0 - $300.000</span>
            </label>
            <label className="flex items-center">
              <input 
                type="checkbox" 
                className="mr-2" 
                checked={isFilterActive('precio', '300000-500000')}
                onChange={() => toggleFilterValue('precio', '300000-500000')}
              />
              <span className="text-sm">$300.000 - $500.000</span>
            </label>
            <label className="flex items-center">
              <input 
                type="checkbox" 
                className="mr-2" 
                checked={isFilterActive('precio', '500000+')}
                onChange={() => toggleFilterValue('precio', '500000+')}
              />
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
              <input 
                type="checkbox" 
                className="mr-2" 
                checked={isFilterActive('categoria', 'Nuevos')}
                onChange={() => toggleFilterValue('categoria', 'Nuevos')}
              />
              <span className="text-sm">Nuevos</span>
            </label>
            <label className="flex items-center">
              <input 
                type="checkbox" 
                className="mr-2" 
                checked={isFilterActive('categoria', 'Como Nuevo')}
                onChange={() => toggleFilterValue('categoria', 'Como Nuevo')}
              />
              <span className="text-sm">Como Nuevo</span>
            </label>
            <label className="flex items-center">
              <input 
                type="checkbox" 
                className="mr-2" 
                checked={isFilterActive('categoria', 'Outlet')}
                onChange={() => toggleFilterValue('categoria', 'Outlet')}
              />
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
              <input 
                type="checkbox" 
                className="mr-2" 
                checked={isFilterActive('capacidad', '32GB')}
                onChange={() => toggleFilterValue('capacidad', '32GB')}
              />
              <span className="text-sm">32GB</span>
            </label>
            <label className="flex items-center">
              <input 
                type="checkbox" 
                className="mr-2" 
                checked={isFilterActive('capacidad', '64GB')}
                onChange={() => toggleFilterValue('capacidad', '64GB')}
              />
              <span className="text-sm">64GB</span>
            </label>
            <label className="flex items-center">
              <input 
                type="checkbox" 
                className="mr-2" 
                checked={isFilterActive('capacidad', '128GB')}
                onChange={() => toggleFilterValue('capacidad', '128GB')}
              />
              <span className="text-sm">128GB</span>
            </label>
            <label className="flex items-center">
              <input 
                type="checkbox" 
                className="mr-2" 
                checked={isFilterActive('capacidad', '256GB+')}
                onChange={() => toggleFilterValue('capacidad', '256GB+')}
              />
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
              <input 
                type="checkbox" 
                className="mr-2" 
                checked={isFilterActive('color', 'Negro')}
                onChange={() => toggleFilterValue('color', 'Negro')}
              />
              <span className="text-sm">Negro</span>
            </label>
            <label className="flex items-center">
              <input 
                type="checkbox" 
                className="mr-2" 
                checked={isFilterActive('color', 'Blanco')}
                onChange={() => toggleFilterValue('color', 'Blanco')}
              />
              <span className="text-sm">Blanco</span>
            </label>
            <label className="flex items-center">
              <input 
                type="checkbox" 
                className="mr-2" 
                checked={isFilterActive('color', 'Azul')}
                onChange={() => toggleFilterValue('color', 'Azul')}
              />
              <span className="text-sm">Azul</span>
            </label>
            <label className="flex items-center">
              <input 
                type="checkbox" 
                className="mr-2" 
                checked={isFilterActive('color', 'Dorado')}
                onChange={() => toggleFilterValue('color', 'Dorado')}
              />
              <span className="text-sm">Dorado</span>
            </label>
          </div>
        </FilterItem>
      </div>
      
      {/* Botón para limpiar filtros */}
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
