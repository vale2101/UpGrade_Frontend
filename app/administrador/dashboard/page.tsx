"use client";

import { Suspense } from "react";
import AdministradorDashboardSection from "@/components/organisms/AdministradorDashboardSection";

export default function AdministradorDashboardPage() {
  return (
    <Suspense fallback={<div className="text-gray-600">Cargando panel...</div>}>
      <AdministradorDashboardSection />
    </Suspense>
  );
}
