"use client";

import VendedorLoginForm from "../molecules/VendedorLoginForm";
import BackToHomeButton from "../atoms/BackToHomeButton";
import { Store } from "lucide-react";

export default function VendedorLoginSection() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#57ad63]/10 to-[#fb64b6]/10 flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-[#57ad63] rounded-full mb-4">
              <Store size={32} className="text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Portal de Vendedores
            </h1>
            <p className="text-gray-600">
              Accede a tu panel de administración
            </p>
          </div>

          {/* Formulario */}
          <VendedorLoginForm />
        </div>

        {/* Info adicional */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            ¿Eres cliente?{" "}
            <a href="/login" className="text-[#57ad63] hover:text-[#459a52] font-medium">
              Inicia sesión aquí
            </a>
          </p>
        </div>
      </div>

      <BackToHomeButton />
    </div>
  );
}

