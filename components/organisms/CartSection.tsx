"use client";
import { useCart } from "../../contexts/CartContext";
import { usePayment } from "../../hooks/usePayment";
import BackToHomeButton from "../atoms/BackToHomeButton";
import EmptyCartMessage from "../molecules/EmptyCartMessage";
import CartItemCard from "../molecules/CartItemCard";
import OrderSummaryCard from "../molecules/OrderSummaryCard";
import AuthModal from "./AuthModal";

export default function CartSection() {
  const { items, removeFromCart, updateQuantity, clearCart, getTotalPrice } = useCart();
  const { 
    showAuthModal, 
    handleProceedToPayment, 
    closeAuthModal 
  } = usePayment();

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-4 sm:py-8">
        <div className="max-w-7xl mx-auto px-4">
          <BackToHomeButton />
          <EmptyCartMessage />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-4 sm:py-8">
      <div className="max-w-7xl mx-auto px-4">
        <BackToHomeButton />
        
        <div className="mb-4 sm:mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Carrito de Compras</h1>
          <p className="text-gray-600 mt-2">
            {items.length} producto{items.length !== 1 ? 's' : ''} en tu carrito
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="p-4 sm:p-6 border-b border-gray-200">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                  <h2 className="text-lg font-semibold text-gray-900">Productos</h2>
                  <button
                    onClick={clearCart}
                    className="text-red-600 hover:text-red-800 text-sm font-medium"
                  >
                    Limpiar carrito
                  </button>
                </div>
              </div>
              
                <div className="divide-y divide-gray-200">
                  {items.map((item) => (
                    <CartItemCard 
                      key={`${item.id}-${item.condition}-${item.capacity}-${item.color}`}
                      item={item}
                      updateQuantity={updateQuantity}
                      removeFromCart={removeFromCart}
                    />
                  ))}
                </div>
            </div>
          </div>

            <div className="lg:col-span-1 order-first lg:order-last">
              <OrderSummaryCard 
                total={getTotalPrice()} 
                onProceedToPayment={handleProceedToPayment}
              />
            </div>
        </div>
      </div>
      {showAuthModal && <AuthModal isOpen={showAuthModal} onClose={closeAuthModal} />}
    </div>
  );
}

