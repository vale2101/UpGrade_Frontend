"use client";

import { useState } from "react";
import ModalHeader from "../atoms/ModalHeader";
import RepairForm from "./RepairForm";
import FormActions from "./FormActions";
import CreateUserModal from "./CreateUserModal";
import { useRepairForm } from "../../hooks/useRepairForm";
import { User } from "../../interfaces/user.interface";
import Swal from "sweetalert2";

interface RepairModalProps {
  isOpen: boolean;
  onClose: () => void;
  id_trabajador: number;
  onSuccess?: () => void;
}

export default function RepairModal({
  isOpen,
  onClose,
  id_trabajador,
  onSuccess,
}: RepairModalProps) {
  const [isCreateUserModalOpen, setIsCreateUserModalOpen] = useState(false);
  const [newlyCreatedUser, setNewlyCreatedUser] = useState<User | null>(null);

  const {
    register,
    handleSubmit,
    errors,
    isSubmitting,
    onSubmit,
    control,
  } = useRepairForm({
    id_trabajador,
    onSuccess: () => {
      onSuccess?.();
      onClose();
    },
  });

  const handleUserCreated = async (newUser: User) => {
    if (newUser && newUser.id_user) {
      // Cerrar el modal de crear usuario si aún está abierto
      setIsCreateUserModalOpen(false);
      
      // Establecer el usuario creado para que se seleccione automáticamente
      setNewlyCreatedUser(newUser);
      
      // Mostrar mensaje de éxito después de un pequeño delay con botón OK
      setTimeout(() => {
        Swal.fire({
          icon: "success",
          title: "¡Éxito!",
          text: "Usuario creado correctamente",
          showConfirmButton: true,
          confirmButtonText: "OK",
          confirmButtonColor: "#57ad63",
          iconColor: "#57ad63",
        }).then(() => {
          // Cuando se hace clic en OK, el modal ya está cerrado y el usuario ya está en el formulario
          // No es necesario hacer nada adicional, el formulario de reparaciones ya está visible
        });
      }, 300);
      
      // Resetear el estado después de un tiempo para que no se vuelva a ejecutar
      setTimeout(() => {
        setNewlyCreatedUser(null);
      }, 3000);
    }
  };

  const handleCloseCreateUserModal = () => {
    setIsCreateUserModalOpen(false);
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-3 sm:p-4">
        <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
          <div className="p-4 sm:p-6">
            <ModalHeader
              title="Crear Reparación"
              onClose={onClose}
            />

            <form onSubmit={handleSubmit(onSubmit)} className="mt-4">
              <RepairForm
                register={register}
                control={control}
                errors={errors}
                isSubmitting={isSubmitting}
                onOpenCreateUserModal={() => setIsCreateUserModalOpen(true)}
                newlyCreatedUser={newlyCreatedUser}
                isCreateUserModalOpen={isCreateUserModalOpen}
              />

              <FormActions
                isSubmitting={isSubmitting}
                submitLabel="Crear Reparación"
                cancelLabel="Cancelar"
                onCancel={onClose}
                className="mt-6"
              />
            </form>
          </div>
        </div>
      </div>

      {/* Modal de crear usuario renderizado fuera del formulario para evitar anidación de forms */}
      <CreateUserModal
        isOpen={isCreateUserModalOpen}
        onClose={handleCloseCreateUserModal}
        onSuccess={handleUserCreated}
      />
    </>
  );
}

