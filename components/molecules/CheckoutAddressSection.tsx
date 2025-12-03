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

  const combinedRefreshKey = refreshKey + localRefreshKey;
  const { direcciones, loading, loadDirecciones } = useAddressList({ refreshKey: combinedRefreshKey });

  const handleFormSubmit = async (data: direccionInterface) => {
    await onSave(data);
  };

  const refreshAddressList = useCallback(async () => {
    setLocalRefreshKey(prev => prev + 1);
    await loadDirecciones();
  }, [loadDirecciones]);

  useEffect(() => {
    if (saved && !formError) {
      setLocalRefreshKey(prev => prev + 1);
      
      loadDirecciones();
      
      const updateTimer1 = setTimeout(() => {
        loadDirecciones();
      }, 600);
      
      const updateTimer2 = setTimeout(() => {
        loadDirecciones();
      }, 1500);
      
      const closeTimer = setTimeout(() => {
        setShowForm(false);
      }, 2500);
      
      return () => {
        clearTimeout(updateTimer1);
        clearTimeout(updateTimer2);
        clearTimeout(closeTimer);
      };
    }
  }, [saved, formError]);
  
  useEffect(() => {
    if (refreshKey > 0) {
      setLocalRefreshKey(prev => prev + 1);
      
      loadDirecciones();
      const timer = setTimeout(() => {
        loadDirecciones();
      }, 400);
      
      return () => clearTimeout(timer);
    }
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
