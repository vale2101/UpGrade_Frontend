"use client";

import ModalHeader from "../atoms/ModalHeader";
import CreateUserForm from "./CreateUserForm";
import { useCreateUserForm } from "../../hooks/useCreateUserForm";

interface CreateUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: (user: any) => void;
}

export default function CreateUserModal({
  isOpen,
  onClose,
  onSuccess,
}: CreateUserModalProps) {
  const {
    register,
    handleSubmit,
    errors,
    isSubmitting,
    onSubmit,
    reset,
  } = useCreateUserForm({
    onSuccess: (user) => {
      onClose();
      setTimeout(() => {
        onSuccess?.(user);
      }, 150);
    },
  });

  const handleClose = () => {
    reset();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[60] p-3 sm:p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="p-4 sm:p-6">
          <ModalHeader
            title="Crear Nuevo Usuario"
            onClose={handleClose}
          />

          <CreateUserForm
            register={register}
            handleSubmit={handleSubmit}
            errors={errors}
            isSubmitting={isSubmitting}
            onSubmit={onSubmit}
            onCancel={handleClose}
            className="mt-4"
          />
        </div>
      </div>
    </div>
  );
}

