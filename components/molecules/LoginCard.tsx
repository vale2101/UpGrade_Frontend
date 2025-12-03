"use client";

import { Suspense } from "react";
import LoginForm from "./LoginForm";

export default function LoginCard() {
  return (
    <div className="flex items-center justify-center p-4 sm:p-6 md:p-8">
      <div className="w-full max-w-md">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 sm:mb-6 md:mb-8">Login</h1>
        <Suspense fallback={<div className="text-gray-600">Cargando formulario...</div>}>
          <LoginForm />
        </Suspense>
      </div>
    </div>
  );
}

