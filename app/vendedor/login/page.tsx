import { Suspense } from "react";
import VendedorLoginSection from "@/components/organisms/VendedorLoginSection";

export default function VendedorLoginPage() {
  return (
    <Suspense fallback={<div className="text-gray-600">Cargando login de vendedor...</div>}>
      <VendedorLoginSection />
    </Suspense>
  );
}
