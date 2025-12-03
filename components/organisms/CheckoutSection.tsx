"use client";
import BackToHomeButton from "../atoms/BackToHomeButton";
import CheckoutAddressSection from "../molecules/CheckoutAddressSection";
import CheckoutPaymentMethod from "../molecules/CheckoutPaymentMethod";
import CheckoutOrderDetails from "../molecules/CheckoutOrderDetails";
import CheckoutOrderSummary from "../molecules/CheckoutOrderSummary";
import OrderConfirmationSection from "./OrderConfirmationSection";
import { useCheckout } from "../../hooks/useCheckout";
import { useCart } from "../../contexts/CartContext";
import { useAddressList } from "../../hooks/useAddressList";
import { useAddress } from "../../hooks/useAddress";

export default function CheckoutSection() {
  const { items, getTotalPrice } = useCart();
  const {
    selectedAddressId,
    selectedPaymentMethod,
    selectedAddress,
    showConfirmation,
    loading,
    error,
    handleAddressSelect,
    handlePaymentMethodSelect,
    handleReviewOrder,
    handleBackToCheckout,
    handleCreateOrder
  } = useCheckout();

  // Obtener la lista de direcciones para buscar la dirección seleccionada
  const { direcciones } = useAddressList({});
  
  // Obtener la dirección completa usando el hook useAddress cuando se necesita para la confirmación
  const { direccion: direccionFromHook, loading: loadingAddress } = useAddress(
    showConfirmation && selectedAddressId && !selectedAddress ? selectedAddressId : null
  );

  // Usar la dirección desde el hook si no está en selectedAddress
  const displayAddress = selectedAddress || direccionFromHook;

  const subtotal = getTotalPrice();
  const total = subtotal; // Por ahora el total es igual al subtotal (envío gratis)

  // Función para manejar el clic en "Confirmar Pedido" - busca la dirección y muestra la vista de confirmación
  const handleConfirmClick = () => {
    if (!selectedAddressId) {
      return;
    }

    // Buscar la dirección en la lista
    const address = direcciones.find((dir) => dir.id_direccion === selectedAddressId);
    
    if (address) {
      handleReviewOrder(address);
    }
  };

  // Si estamos en la vista de confirmación, mostrar OrderConfirmationSection
  if (showConfirmation && displayAddress && selectedPaymentMethod) {
    return (
      <OrderConfirmationSection
        address={displayAddress}
        paymentMethodId={selectedPaymentMethod}
        items={items}
        subtotal={subtotal}
        total={total}
        loading={loading || loadingAddress}
        onConfirm={handleCreateOrder}
        onBack={handleBackToCheckout}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-4 sm:py-8">
      <div className="max-w-7xl mx-auto px-4">
        <BackToHomeButton />
        
        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Finalizar Compra</h1>
          <p className="text-gray-600 mt-2">Completa tu información para procesar el pedido</p>
        </div>

        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <CheckoutAddressSection
              selectedAddressId={selectedAddressId}
              onAddressSelect={handleAddressSelect}
            />
            
            <CheckoutPaymentMethod
              selectedMethod={selectedPaymentMethod}
              onMethodSelect={handlePaymentMethodSelect}
            />
            
            <CheckoutOrderDetails items={items} />
          </div>

          <div className="lg:col-span-1">
            <CheckoutOrderSummary 
              subtotal={subtotal}
              total={total}
            />
            
            <button
              onClick={handleConfirmClick}
              disabled={loading || !selectedAddressId || !selectedPaymentMethod}
              className={`w-full mt-4 py-3 px-4 rounded-lg font-medium transition-colors ${
                loading || !selectedAddressId || !selectedPaymentMethod
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-black text-white hover:bg-gray-800'
              }`}
            >
              {loading ? 'Procesando...' : 'Revisar Pedido'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

