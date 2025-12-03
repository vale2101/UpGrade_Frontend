"use client";

import { Suspense } from "react";
import SearchResultsSection from "../../components/organisms/SearchResultsSection";

export default function SearchPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-4 sm:py-8">
      <Suspense fallback={<div className="text-gray-600">Cargando resultados...</div>}>
        <SearchResultsSection />
      </Suspense>
    </div>
  );
}
