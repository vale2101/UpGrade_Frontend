"use client";
import { useState, useEffect, useCallback } from "react";
import { useAddressList } from "../../hooks/useAddressList";
import { useAddressForm } from "../../hooks/useAddressForm";
import LoadingState from "../atoms/LoadingState";
import ToggleFormButton from "../atoms/ToggleFormButton";
import AddressFormCard from "./AddressFormCard";
import CheckoutAddressList from "./CheckoutAddressList";
import { direccionInterface } from "../../interfaces/direccion.interface";

interface CheckoutAddressSectionProps {
  selectedAddressId: number | null;
  onAddressSelect: (addressId: number) => void;
  className?: string;
}

export default function CheckoutAddressSection({ 
  selectedAddressId, 
  onAddressSelect,
  className = "" 
}: CheckoutAddressSectionProps) {
  const [showForm, setShowForm] = useState(false);
  const [localRefreshKey, setLocalRefreshKey] = useState(0);
  
  const {
    register,
    handleSubmit,
    errors,
    isSubmitting,
    saved,
    error: formError,
    refreshKey,
    onSave,
  } = useAddressForm();

  // Combinar ambos refreshKeys para asegurar la actualización
  const combinedRefreshKey = refreshKey + localRefreshKey;
  const { direcciones, loading, loadDirecciones } = useAddressList({ refreshKey: combinedRefreshKey });

  // Función para manejar el envío del formulario
  const handleFormSubmit = async (data: direccionInterface) => {
    await onSave(data);
  };

  // Función para recargar la lista de direcciones
  const refreshAddressList = useCallback(async () => {
    // Incrementar refreshKey local para forzar actualización en el hook
    setLocalRefreshKey(prev => prev + 1);
    // También llamar directamente a loadDirecciones
    await loadDirecciones();
  }, [loadDirecciones]);

  // Actualizar la lista automáticamente cuando se guarda exitosamente
  useEffect(() => {
    if (saved && !formError) {
      // Incrementar refreshKey inmediatamente para forzar actualización en el hook
      setLocalRefreshKey(prev => prev + 1);
      
      // Recargar direcciones inmediatamente
      loadDirecciones();
      
      // Recargar después de un delay corto para asegurar que el backend procesó
      const updateTimer1 = setTimeout(() => {
        loadDirecciones();
      }, 600);
      
      // Recargar después de otro delay como respaldo
      const updateTimer2 = setTimeout(() => {
        loadDirecciones();
      }, 1500);
      
      // Cerrar el formulario después de mostrar el mensaje de éxito
      const closeTimer = setTimeout(() => {
        setShowForm(false);
      }, 2500);
      
      return () => {
        clearTimeout(updateTimer1);
        clearTimeout(updateTimer2);
        clearTimeout(closeTimer);
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [saved, formError]);
  
  // Actualizar cuando cambia el refreshKey del formulario (se incrementa cuando se guarda)
  useEffect(() => {
    if (refreshKey > 0) {
      // Incrementar refreshKey local también para forzar actualización
      setLocalRefreshKey(prev => prev + 1);
      
      // Recargar direcciones inmediatamente y después de un delay
      loadDirecciones();
      const timer = setTimeout(() => {
        loadDirecciones();
      }, 400);
      
      return () => clearTimeout(timer);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refreshKey]);

  if (loading) {
    return (
      <div className={`bg-white rounded-lg shadow-md p-4 sm:p-6 ${className}`}>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Dirección de entrega</h3>
        <LoadingState message="Cargando direcciones..." />
      </div>
    );
  }

  return (
    <div className={`bg-white rounded-lg shadow-md p-4 sm:p-6 ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Dirección de entrega</h3>
        <ToggleFormButton
          isOpen={showForm}
          onToggle={() => setShowForm(!showForm)}
          openLabel="Añadir dirección"
          closeLabel="Cancelar"
        />
      </div>

      {showForm && (
        <AddressFormCard
          register={register}
          handleSubmit={handleSubmit}
          errors={errors}
          isSubmitting={isSubmitting}
          saved={saved}
          error={formError}
          onSubmit={handleFormSubmit}
        />
      )}

      <CheckoutAddressList
        direcciones={direcciones}
        selectedAddressId={selectedAddressId}
        onAddressSelect={onAddressSelect}
        emptyMessage={
          showForm
            ? undefined
            : "No tienes direcciones guardadas. Agrega una nueva dirección usando el botón de arriba."
        }
      />
    </div>
  );
}
