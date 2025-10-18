import { useState, useEffect } from 'react';
import { Product } from '../contexts/DataContext';

export function useProductSearch(products: Product[]) {
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);

  useEffect(() => {
    const performSearch = async () => {
      if (!searchQuery.trim()) {
        setFilteredProducts(products);
        return;
      }

      setLoading(true);
      
      try {
        await new Promise((resolve) => setTimeout(resolve, 300));
        
        const query = searchQuery.toLowerCase();
        const results = products.filter(product => 
          product.name.toLowerCase().includes(query) ||
          product.brand?.toLowerCase().includes(query) ||
          product.category.toLowerCase().includes(query) ||
          product.condition.toLowerCase().includes(query)
        );
        
        setFilteredProducts(results);
        
      } catch (error) {
        console.error('Error en la búsqueda:', error);
        setFilteredProducts([]);
      } finally {
        setLoading(false);
      }
    };

    performSearch();
  }, [products, searchQuery]);

  const clearSearch = () => {
    setSearchQuery('');
  };

  return {
    loading,
    searchQuery,
    setSearchQuery,
    filteredProducts,
    clearSearch,
    hasResults: filteredProducts.length > 0
  };
}
