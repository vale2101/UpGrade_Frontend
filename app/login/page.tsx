"use client";

import { Suspense } from "react";
import LoginSection from "@/components/molecules/LoginSection";

export default function Page() {
  return (
    <Suspense fallback={<div className="text-gray-600">Cargando login...</div>}>
      <LoginSection />
    </Suspense>
  );
}
