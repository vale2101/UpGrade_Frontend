"use client";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

export default function BackToUserButton() {
  const router = useRouter();

  return (
    <button
      onClick={() => router.push('/user?tab=orders')}
      className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors mb-4 sm:mb-6"
    >
      <ArrowLeft size={20} />
      <span className="text-sm sm:text-base">Volver a mis pedidos</span>
    </button>
  );
}

