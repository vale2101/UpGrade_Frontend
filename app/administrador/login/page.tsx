"use client";

import { Suspense } from "react";
import AdministradorLoginSection from "@/components/organisms/AdministradorLoginSection";

export default function AdministradorLoginPage() {
  return (
    <Suspense fallback={<div className="text-gray-600">Cargando login...</div>}>
      <AdministradorLoginSection />
    </Suspense>
  );
}
