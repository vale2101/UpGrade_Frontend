"use client";

import { Suspense } from "react";
import VendedorDashboardSection from "@/components/organisms/VendedorDashboardSection";
import MainLayout from "@/components/organisms/MainLayout";

export default function VendedorDashboardPage() {
  return (
    <MainLayout>
      <Suspense fallback={<div className="text-gray-600">Cargando dashboard de vendedor...</div>}>
        <VendedorDashboardSection />
      </Suspense>
    </MainLayout>
  );
}
