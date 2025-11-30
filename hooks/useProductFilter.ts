import { useState, useEffect } from 'react';
import { useFilter } from '../contexts/FilterContext';
import { Product } from '../utils/productMapper';

export function useProductFilter<T extends Product>(products: T[]) {
  const [loading, setLoading] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState<T[]>(products);
  const { filters } = useFilter();

  useEffect(() => {
    const performFilter = async () => {
      setLoading(true);
      
      try {
        await new Promise((resolve) => setTimeout(resolve, 100));
        
        const results = products.filter(product => {
          // Filtro de Disponibilidad (basado en stock)
          if (filters.disponibilidad.length > 0) {
            const stock = product.stock || 0;
            const isInStock = stock > 0;
            const availability = isInStock ? 'En stock' : 'Agotado';
            if (!filters.disponibilidad.includes(availability)) return false;
          }

          // Filtro de Tipo (usa condition del backend: "Nuevo", "SemiNuevo", "Reacondicionado")
          if (filters.tipo.length > 0) {
            if (!filters.tipo.includes(product.condition)) return false;
          }

          // Filtro de Marca (usa brand del mapper)
          if (filters.marca.length > 0) {
            if (!product.brand || !filters.marca.includes(product.brand)) return false;
          }

          // Filtro de Precio (rangos en miles de pesos colombianos)
          if (filters.precio.length > 0) {
            const price = parseInt(product.currentPrice.replace(/[^0-9]/g, '')) || 0;
            // Convertir a miles (dividir por 1000)
            const priceInThousands = price / 1000;
            const inRange = filters.precio.some(range => {
              if (range === '0-500') return priceInThousands < 500; // Menos de $500.000
              if (range === '500-1000') return priceInThousands >= 500 && priceInThousands < 1000;
              if (range === '1000-2000') return priceInThousands >= 1000 && priceInThousands < 2000;
              if (range === '2000-3000') return priceInThousands >= 2000 && priceInThousands < 3000;
              if (range === '3000-5000') return priceInThousands >= 3000 && priceInThousands < 5000;
              if (range === '5000+') return priceInThousands >= 5000;
              return true;
            });
            if (!inRange) return false;
          }

          // Filtro de Capacidad (usa capacity del backend)
          if (filters.capacidad.length > 0) {
            if (!product.capacity) return false;
            const capacities = Array.isArray(product.capacity) ? product.capacity : [product.capacity];
            if (!capacities.some(cap => filters.capacidad.includes(cap))) return false;
          }

          // Filtro de Color (usa color del backend)
          if (filters.color.length > 0) {
            if (!product.color) return false;
            const colors = Array.isArray(product.color) ? product.color : [product.color];
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

