import React from 'react';
import CategoryButton from '../atoms/CategoryButton';
import { getAllCategories } from '../../contexts/DataContext';

interface CategoryTabsProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  className?: string;
}

export default function CategoryTabs({ 
  selectedCategory, 
  onCategoryChange,
  className = ""
}: CategoryTabsProps) {
  const categories = getAllCategories();

  return (
    <div className={`flex flex-wrap gap-2 sm:gap-4 justify-center ${className}`}>
      {categories.map((category) => (
        <CategoryButton
          key={category.id}
          isActive={selectedCategory === category.name}
          onClick={() => onCategoryChange(category.name)}
        >
          {category.name}
        </CategoryButton>
      ))}
    </div>
  );
}