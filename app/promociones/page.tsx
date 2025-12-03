"use client";

import { Suspense } from "react";
import MainLayout from "../../components/organisms/MainLayout";
import PromotionsPageSection from "../../components/organisms/PromotionsPageSection";

export default function PromotionsPage() {
  return (
    <MainLayout>
      <Suspense fallback={<div className="text-gray-600">Cargando promociones...</div>}>
        <PromotionsPageSection />
      </Suspense>
    </MainLayout>
  );
}
