"use client";

import { Suspense } from "react";
import MainLayout from "@/components/organisms/MainLayout";
import UserSection from "@/components/organisms/UserSection";


export default function UserPage() {
  return (
    <MainLayout>
      <Suspense fallback={<div className="text-gray-600">Cargando tu cuenta...</div>}>
        <UserSection />
      </Suspense>
    </MainLayout>
  );
}
