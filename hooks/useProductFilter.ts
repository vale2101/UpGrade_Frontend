import { useMemo } from 'react';
import { useFilter } from '../contexts/FilterContext';
import { Product } from '../db/data';

export function useProductFilter<T extends Product>(products: T[]): T[] {
  const { filters } = useFilter();

  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      // Filtro por disponibilidad (usando condition como proxy)
      if (filters.disponibilidad.length > 0) {
        const productAvailability = product.condition === 'Nuevo' ? 'En stock' : 'Disponible';
        if (!filters.disponibilidad.includes(productAvailability)) {
          return false;
        }
      }

      // Filtro por tipo de producto
      if (filters.tipo.length > 0) {
        const productType = getProductTypeFromName(product.name);
        if (!filters.tipo.includes(productType)) {
          return false;
        }
      }

      // Filtro por marca
      if (filters.marca.length > 0) {
        const productBrand = getBrandFromName(product.name);
        if (!filters.marca.includes(productBrand)) {
          return false;
        }
      }

      // Filtro por precio
      if (filters.precio.length > 0) {
        const price = parsePrice(product.currentPrice);
        const priceInRange = filters.precio.some(range => {
          switch (range) {
            case '0-300000':
              return price >= 0 && price <= 300000;
            case '300000-500000':
              return price > 300000 && price <= 500000;
            case '500000+':
              return price > 500000;
            default:
              return true;
          }
        });
        if (!priceInRange) {
          return false;
        }
      }

      // Filtro por categoría (condición)
      if (filters.categoria.length > 0) {
        if (!filters.categoria.includes(product.condition)) {
          return false;
        }
      }

      // Filtro por capacidad
      if (filters.capacidad.length > 0) {
        const productCapacity = product.capacity || getCapacityFromName(product.name);
        if (!filters.capacidad.includes(productCapacity)) {
          return false;
        }
      }

      // Filtro por color
      if (filters.color.length > 0) {
        const productColor = product.color || getColorFromName(product.name);
        if (!filters.color.includes(productColor)) {
          return false;
        }
      }

      return true;
    });
  }, [products, filters]);

  return filteredProducts;
}

// Funciones auxiliares para extraer información de los nombres de productos
function getProductTypeFromName(name: string): string {
  const lowerName = name.toLowerCase();
  if (lowerName.includes('iphone') || lowerName.includes('galaxy') || lowerName.includes('vivo')) {
    return 'Smartphones';
  }
  if (lowerName.includes('ipad')) {
    return 'Tablets';
  }
  if (lowerName.includes('watch')) {
    return 'Accesorios';
  }
  return 'Smartphones'; // Default
}

function getBrandFromName(name: string): string {
  const lowerName = name.toLowerCase();
  if (lowerName.includes('samsung') || lowerName.includes('galaxy')) {
    return 'Samsung';
  }
  if (lowerName.includes('iphone') || lowerName.includes('ipad') || lowerName.includes('watch')) {
    return 'iPhone';
  }
  if (lowerName.includes('vivo')) {
    return 'Vivo';
  }
  return 'Samsung'; // Default
}

function getCapacityFromName(name: string): string {
  const capacityMatch = name.match(/(\d+)GB/);
  if (capacityMatch) {
    const capacity = parseInt(capacityMatch[1]);
    if (capacity <= 32) return '32GB';
    if (capacity <= 64) return '64GB';
    if (capacity <= 128) return '128GB';
    return '256GB+';
  }
  return '128GB'; // Default
}

function getColorFromName(name: string): string {
  const lowerName = name.toLowerCase();
  if (lowerName.includes('negro') || lowerName.includes('black')) return 'Negro';
  if (lowerName.includes('blanco') || lowerName.includes('white')) return 'Blanco';
  if (lowerName.includes('azul') || lowerName.includes('blue')) return 'Azul';
  if (lowerName.includes('dorado') || lowerName.includes('gold')) return 'Dorado';
  return 'Negro'; // Default
}

function parsePrice(priceString: string): number {
  // Extraer números del string de precio
  const numbers = priceString.replace(/[^0-9]/g, '');
  return parseInt(numbers) || 0;
}
