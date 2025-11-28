import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { getAllCategories } from "../contexts/DataContext";

export function useProductCategory(slug?: string) {
  const searchParams = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState("Todas");
  const categories = getAllCategories();

  useEffect(() => {
    if (slug) {
      const currentCategory = categories.find(cat => cat.slug === slug);
      if (currentCategory) {
        setSelectedCategory(currentCategory.name);
      }
    } else {
      const categoria = searchParams.get('categoria');
      if (categoria) {
        setSelectedCategory(categoria);
      }
    }
  }, [slug, searchParams, categories]);

  const categoryName = slug 
    ? categories.find(cat => cat.slug === slug)?.name || "Todas"
    : selectedCategory;

  return {
    selectedCategory: categoryName,
    setSelectedCategory,
    categories
  };
}

