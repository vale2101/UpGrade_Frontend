import { useMemo } from 'react';
import { useFilter } from '../contexts/FilterContext';
import { Product } from '../contexts/DataContext';

export function useProductFilter<T extends Product>(products: T[]): T[] {
  const { filters } = useFilter();

  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      if (filters.disponibilidad.length > 0) {
        const productAvailability = product.condition === 'Nuevo' ? 'En stock' : 'Disponible';
        if (!filters.disponibilidad.includes(productAvailability)) {
          return false;
        }
      }

      if (filters.tipo.length > 0) {
        const productType = getProductTypeFromName(product.name);
        if (!filters.tipo.includes(productType)) {
          return false;
        }
      }

      if (filters.marca.length > 0) {
        const productBrand = getBrandFromName(product.name);
        if (!filters.marca.includes(productBrand)) {
          return false;
        }
      }

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

      if (filters.categoria.length > 0) {
        if (!filters.categoria.includes(product.condition)) {
          return false;
        }
      }

      if (filters.capacidad.length > 0) {
        const productCapacity = product.capacity || getCapacityFromName(product.name);
        if (!filters.capacidad.includes(productCapacity)) {
          return false;
        }
      }

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
  return 'Smartphones';
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
  return 'Samsung';
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
  return '128GB';
}

function getColorFromName(name: string): string {
  const lowerName = name.toLowerCase();
  if (lowerName.includes('negro') || lowerName.includes('black')) return 'Negro';
  if (lowerName.includes('blanco') || lowerName.includes('white')) return 'Blanco';
  if (lowerName.includes('azul') || lowerName.includes('blue')) return 'Azul';
  if (lowerName.includes('dorado') || lowerName.includes('gold')) return 'Dorado';
  return 'Negro';
}

function parsePrice(priceString: string): number {
  const numbers = priceString.replace(/[^0-9]/g, '');
  return parseInt(numbers) || 0;
}