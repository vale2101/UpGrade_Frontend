"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from './useAuthContext';
import { useCart } from '../contexts/CartContext';

export function usePayment() {
  const [loading, setLoading] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const router = useRouter();
  const { isAuthenticated, user } = useAuth();
  const { items, getTotalPrice } = useCart();

  const handleProceedToPayment = async () => {
    if (items.length === 0) {
      alert('Tu carrito está vacío. Agrega productos antes de proceder al pago.');
      return;
    }

    if (!isAuthenticated) {
      setShowAuthModal(true);
      return;
    }

    setLoading(true);
    
    try {
      const total = getTotalPrice();
      if (total <= 0) {
        throw new Error('El total debe ser mayor a 0');
      }
      
      // Redirigir a la página de checkout
      router.push('/checkout');
      
    } catch (error) {
      console.error('Error al procesar el pago:', error);
      alert('Hubo un error al procesar tu pago. Inténtalo de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  const closeAuthModal = () => {
    setShowAuthModal(false);
  };

  return {
    loading,
    showAuthModal,
    handleProceedToPayment,
    closeAuthModal
  };
}

