"use client";

import { useState } from "react";
import { useVendedorRepairs } from "../../hooks/useVendedorRepairs";
import { useVendedorAuth } from "../../hooks/useVendedorAuth";
import LoadingState from "../atoms/LoadingState";
import EmptyTableState from "../atoms/EmptyTableState";
import RepairCard from "./RepairCard";
import RepairModal from "./RepairModal";
import CreateRepairButton from "../atoms/CreateRepairButton";

export default function VendedorRepairsList() {
  const { reparaciones, loading, error, refetch } = useVendedorRepairs();
  const { vendedor } = useVendedorAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCreateSuccess = () => {
    refetch();
  };

  if (loading) {
    return <LoadingState message="Cargando reparaciones..." />;
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-end mb-4">
        <CreateRepairButton
          onClick={() => setIsModalOpen(true)}
          disabled={!vendedor?.id_trabajador}
        />
      </div>

      {reparaciones.length === 0 ? (
        <EmptyTableState message="No hay reparaciones registradas" />
      ) : (
        reparaciones.map((reparacion) => (
          <RepairCard
            key={reparacion.id_reparacion}
            reparacion={reparacion}
            onStatusUpdate={refetch}
          />
        ))
      )}

      {vendedor?.id_trabajador && (
        <RepairModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          id_trabajador={vendedor.id_trabajador}
          onSuccess={handleCreateSuccess}
        />
      )}
    </div>
  );
}