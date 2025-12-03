"use client";

import { Suspense } from "react";
import VendedorLoginSection from "@/components/organisms/VendedorLoginSection";

export const metadata = {
  title: "Iniciar Sesión Vendedor - UpGrade",
  description: "Accede a tu panel de vendedor en UpGrade",
};

export default function VendedorLoginPage() {
  return (
    <Suspense fallback={<div className="text-gray-600">Cargando login de vendedor...</div>}>
      <VendedorLoginSection />
    </Suspense>
  );
}
