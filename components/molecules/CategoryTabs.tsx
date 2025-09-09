"use client";
import { useCategory } from "../../contexts/CategoryContext";

export default function CategoryTabs() {
  const { selectedCategory } = useCategory();

  return (
    <div className="w-full flex flex-col items-center py-8">
      <h2 className="text-lg font-bold tracking-wide mb-6">PRODUCTOS</h2>
      <p className="text-sm text-gray-600 mb-4">
        Categoría: {selectedCategory}
      </p>
    </div>
  );
}
