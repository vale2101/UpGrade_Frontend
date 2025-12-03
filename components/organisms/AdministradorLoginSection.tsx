"use client";

import Link from "next/link";
import AdministradorLoginForm from "../molecules/AdministradorLoginForm";
import BackToHomeButton from "../atoms/BackToHomeButton";
import { Shield } from "lucide-react";

export default function AdministradorLoginSection() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#57ad63]/10 to-[#fb64b6]/10 flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-[#fb64b6] rounded-full mb-4">
              <Shield size={32} className="text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Portal de Administradores
            </h1>
            <p className="text-gray-600">
              Accede a tu panel de administración
            </p>
          </div>

          <AdministradorLoginForm />
        </div>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            ¿Eres cliente?{" "}
            <Link href="/login" className="text-[#57ad63] hover:text-[#459a52] font-medium">
              Inicia sesión aquí
            </Link>
          </p>
        </div>
      </div>

      <BackToHomeButton />
    </div>
  );
}

