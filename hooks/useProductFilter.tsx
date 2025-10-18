import { useState, useEffect } from 'react';
import { useFilter } from '../contexts/FilterContext';
import { Product } from '../contexts/DataContext';

export function useProductFilter<T extends Product>(products: T[]) {
  const [loading, setLoading] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState<T[]>(products);
  const { filters } = useFilter();

  useEffect(() => {
    const performFilter = async () => {
      setLoading(true);
      
      try {
        await new Promise((resolve) => setTimeout(resolve, 200));
        
        const results = products.filter(product => {
          if (filters.disponibilidad.length > 0) {
            const availability = product.condition === 'Nuevo' ? 'En stock' : 'Disponible';
            if (!filters.disponibilidad.includes(availability)) return false;
          }

          if (filters.tipo.length > 0) {
            const type = getProductType(product.name);
            if (!filters.tipo.includes(type)) return false;
          }

          if (filters.marca.length > 0) {
            const brand = getBrand(product.name);
            if (!filters.marca.includes(brand)) return false;
          }

          if (filters.precio.length > 0) {
            const price = parseInt(product.currentPrice.replace(/[^0-9]/g, '')) || 0;
            const inRange = filters.precio.some(range => {
              if (range === '0-300000') return price >= 0 && price <= 300000;
              if (range === '300000-500000') return price > 300000 && price <= 500000;
              if (range === '500000+') return price > 500000;
              return true;
            });
            if (!inRange) return false;
          }

          if (filters.categoria.length > 0) {
            if (!filters.categoria.includes(product.condition)) return false;
          }

          if (filters.capacidad.length > 0) {
            const capacity = product.capacity || getCapacity(product.name);
            const capacities = Array.isArray(capacity) ? capacity : [capacity];
            if (!capacities.some(cap => filters.capacidad.includes(cap))) return false;
          }

          if (filters.color.length > 0) {
            const color = product.color || getColor(product.name);
            const colors = Array.isArray(color) ? color : [color];
            if (!colors.some(col => filters.color.includes(col))) return false;
          }

          return true;
        });
        
        setFilteredProducts(results);
        
      } catch (error) {
        console.error('Error en el filtrado:', error);
        setFilteredProducts([]);
      } finally {
        setLoading(false);
      }
    };

    performFilter();
  }, [products, filters]);

  return {
    loading,
    filteredProducts,
    hasResults: filteredProducts.length > 0
  };
}

const getProductType = (name: string) => {
  const lower = name.toLowerCase();
  if (lower.includes('ipad')) return 'Tablets';
  if (lower.includes('watch')) return 'Accesorios';
  return 'Smartphones';
};

const getBrand = (name: string) => {
  const lower = name.toLowerCase();
  if (lower.includes('samsung') || lower.includes('galaxy')) return 'Samsung';
  if (lower.includes('iphone') || lower.includes('ipad') || lower.includes('watch')) return 'iPhone';
  if (lower.includes('vivo')) return 'Vivo';
  return 'Samsung';
};

const getCapacity = (name: string) => {
  const match = name.match(/(\d+)GB/);
  if (!match) return '128GB';
  const capacity = parseInt(match[1]);
  if (capacity <= 32) return '32GB';
  if (capacity <= 64) return '64GB';
  if (capacity <= 128) return '128GB';
  return '256GB+';
};

const getColor = (name: string) => {
  const lower = name.toLowerCase();
  if (lower.includes('negro') || lower.includes('black')) return 'Negro';
  if (lower.includes('blanco') || lower.includes('white')) return 'Blanco';
  if (lower.includes('azul') || lower.includes('blue')) return 'Azul';
  if (lower.includes('dorado') || lower.includes('gold')) return 'Dorado';
  return 'Negro';
};