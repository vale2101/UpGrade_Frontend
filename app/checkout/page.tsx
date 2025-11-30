"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "../../contexts/CartContext";
import { useAuth } from "../../hooks/useAuthContext";
import CheckoutSection from "../../components/organisms/CheckoutSection";

export default function CheckoutPage() {
  const router = useRouter();
  const { items } = useCart();
  const { isAuthenticated, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/login?redirect=/checkout');
    }
    if (!isLoading && items.length === 0) {
      router.push('/carrito');
    }
  }, [isAuthenticated, isLoading, items.length, router]);

  if (isLoading || !isAuthenticated || items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-center items-center py-12">
            <p className="text-gray-600">Cargando...</p>
          </div>
        </div>
      </div>
    );
  }

  return <CheckoutSection />;
}

