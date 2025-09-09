"use client";
import { useState } from "react";
import { useCart } from "../../contexts/CartContext";
import { useAuth } from "../../contexts/AuthContext";
import HomeLayout from "../../components/layouts/HomeLayout";
import BackToHomeButton from "../../components/atoms/BackToHomeButton";
import AuthModal from "../../components/organisms/AuthModal";
import Image from "next/image";

export default function CartPage() {
  const { items, removeFromCart, updateQuantity, clearCart, getTotalPrice } = useCart();
  const { isAuthenticated, user } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const handleProceedToPayment = () => {
    if (!isAuthenticated) {
      setShowAuthModal(true);
      return;
    }
    
    // Aquí iría la lógica para proceder al pago
    alert(`¡Hola ${user?.name}! Redirigiendo al proceso de pago...`);
  };

  if (items.length === 0) {
    return (
      <HomeLayout>
        <div className="min-h-screen bg-gray-50 py-8">
          <div className="max-w-7xl mx-auto px-4">
            <BackToHomeButton />
            
            <div className="bg-white rounded-lg shadow-lg p-8 text-center">
              <div className="max-w-md mx-auto">
                <svg className="mx-auto h-16 w-16 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01" />
                </svg>
                <h1 className="text-2xl font-bold text-gray-900 mb-2">Tu carrito está vacío</h1>
                <p className="text-gray-600 mb-6">
                  Agrega algunos productos para comenzar tu compra
                </p>
                <button
                  onClick={() => window.location.href = '/promociones'}
                  className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors"
                >
                  Ver productos
                </button>
              </div>
            </div>
          </div>
        </div>
      </HomeLayout>
    );
  }

  return (
    <HomeLayout>
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4">
          <BackToHomeButton />
          
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900">Carrito de Compras</h1>
            <p className="text-gray-600 mt-2">
              {items.length} producto{items.length !== 1 ? 's' : ''} en tu carrito
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Lista de productos */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="p-6 border-b border-gray-200">
                  <div className="flex justify-between items-center">
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
                    <div key={`${item.id}-${item.condition}-${item.capacity}-${item.color}`} className="p-6">
                      <div className="flex items-center space-x-4">
                        {/* Imagen del producto */}
                        <div className="flex-shrink-0">
                          <div className="w-20 h-20 bg-gray-100 rounded-lg overflow-hidden">
                            <Image
                              src={item.image}
                              alt={item.name}
                              width={80}
                              height={80}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        </div>

                        {/* Información del producto */}
                        <div className="flex-1 min-w-0">
                          <h3 className="text-lg font-medium text-gray-900 truncate">
                            {item.name}
                          </h3>
                          <div className="mt-1 space-y-1">
                            <p className="text-sm text-gray-600">
                              Categoría: {item.condition}
                            </p>
                            <p className="text-sm text-gray-600">
                              Capacidad: {item.capacity}
                            </p>
                            <p className="text-sm text-gray-600">
                              Color: {item.color}
                            </p>
                          </div>
                        </div>

                        {/* Precio y controles */}
                        <div className="flex-shrink-0 text-right">
                          <p className="text-lg font-semibold text-gray-900">
                            {item.price}
                          </p>
                          {item.originalPrice && (
                            <p className="text-sm text-gray-500 line-through">
                              {item.originalPrice}
                            </p>
                          )}
                          
                          {/* Controles de cantidad */}
                          <div className="mt-3 flex items-center space-x-2">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50"
                            >
                              -
                            </button>
                            <span className="w-8 text-center font-medium">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50"
                            >
                              +
                            </button>
                          </div>

                          {/* Botón eliminar */}
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="mt-2 text-red-600 hover:text-red-800 text-sm font-medium"
                          >
                            Eliminar
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Resumen del pedido */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-lg p-6 sticky top-4">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">
                  Resumen del pedido
                </h2>
                
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-medium">{formatPrice(getTotalPrice())}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Envío</span>
                    <span className="font-medium text-green-600">Gratis</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Impuestos</span>
                    <span className="font-medium">Incluidos</span>
                  </div>
                  <div className="border-t border-gray-200 pt-3">
                    <div className="flex justify-between text-lg font-semibold">
                      <span>Total</span>
                      <span>{formatPrice(getTotalPrice())}</span>
                    </div>
                  </div>
                </div>

                <button className="w-full mt-6 bg-black text-white py-3 px-4 rounded-lg hover:bg-gray-800 transition-colors font-medium">
                  Proceder al pago
                </button>

                <div className="mt-4 text-center">
                  <p className="text-sm text-gray-600">
                    Pago seguro y encriptado
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </HomeLayout>
  );
}
