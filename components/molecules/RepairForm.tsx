"use client";

import React, { useState, useEffect } from "react";
import { Controller, Control, FieldErrors, useWatch, UseFormRegister } from "react-hook-form";
import { RepairFormData } from "../../hooks/useRepairForm";
import InputField from "../atoms/InputField";
import { useUsers } from "../../hooks/useUsers";
import AddUserButton from "../atoms/AddUserButton";
import { User } from "../../interfaces/user.interface";

interface RepairFormProps {
  register: UseFormRegister<RepairFormData>;
  control: Control<RepairFormData>;
  errors: FieldErrors<RepairFormData>;
  isSubmitting: boolean;
  onOpenCreateUserModal?: () => void;
  newlyCreatedUser?: User | null;
  isCreateUserModalOpen?: boolean;
}

export default function RepairForm({
  register,
  control,
  errors,
  isSubmitting,
  onOpenCreateUserModal,
  newlyCreatedUser,
  isCreateUserModalOpen,
}: RepairFormProps) {
  const { users, loading: loadingUsers, refetch: refetchUsers } = useUsers();
  const [selectedUserId, setSelectedUserId] = useState<number | "">("");
  const [prevModalState, setPrevModalState] = useState<boolean | undefined>(undefined);
  const nombreFieldRef = React.useRef<{ onChange: (value: string) => void } | null>(null);
  const nombreValue = useWatch({ control, name: "nombre" });
  
  useEffect(() => {
    if (!nombreValue || nombreValue === "") {
      setSelectedUserId("");
    }
  }, [nombreValue]);

  useEffect(() => {
    if (nombreValue && nombreValue !== "") {
      const matchingUser = users.find(u => u.nombre === nombreValue);
      if (matchingUser && matchingUser.id_user !== selectedUserId) {
        setSelectedUserId(matchingUser.id_user || "");
      }
    }
  }, [nombreValue, users, selectedUserId]);

  useEffect(() => {
    if (prevModalState === true && isCreateUserModalOpen === false) {
      refetchUsers();
    }
    setPrevModalState(isCreateUserModalOpen);
  }, [isCreateUserModalOpen, prevModalState, refetchUsers]);

  useEffect(() => {
    if (newlyCreatedUser?.id_user && newlyCreatedUser.nombre) {
      const userId = newlyCreatedUser.id_user;
      const userName = newlyCreatedUser.nombre;
      
      setSelectedUserId(userId);
      if (nombreFieldRef.current) {
        nombreFieldRef.current.onChange(userName);
      }
      
      refetchUsers();
      
      setTimeout(() => {
        refetchUsers().then(() => {
          setSelectedUserId(userId);
          if (nombreFieldRef.current) {
            nombreFieldRef.current.onChange(userName);
          }
        });
      }, 800);
    }
  }, [newlyCreatedUser?.id_user, newlyCreatedUser?.nombre, refetchUsers]);

  return (
    <div className="space-y-4">
      <div>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-0 mb-1">
          <label className="block text-xs sm:text-sm font-medium text-gray-700">
            Nombre del Cliente <span className="text-red-500">*</span>
          </label>
          <AddUserButton
            onClick={() => onOpenCreateUserModal?.()}
            disabled={loadingUsers || isSubmitting}
            className="self-start sm:self-auto"
          />
        </div>
        <Controller
          name="nombre"
          control={control}
          rules={{ 
            required: "El nombre del cliente es requerido"
          }}
          render={({ field }) => {
            if (!nombreFieldRef.current || nombreFieldRef.current.onChange !== field.onChange) {
              nombreFieldRef.current = { onChange: field.onChange };
            }

            return (
              <>
                <select
                  value={selectedUserId}
                  onChange={(e) => {
                    const userId = e.target.value === "" ? "" : parseInt(e.target.value);
                    setSelectedUserId(userId);
                    
                    if (userId !== "" && !isNaN(userId as number)) {
                      const selectedUser = users.find(u => u.id_user === userId);
                      if (selectedUser) {
                        field.onChange(selectedUser.nombre);
                      }
                    } else {
                      field.onChange("");
                    }
                  }}
                  onBlur={field.onBlur}
                  disabled={loadingUsers || isSubmitting}
                  className={`w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border rounded-lg focus:ring-2 focus:ring-[#57ad63] outline-none mt-1 ${
                    errors.nombre ? "border-red-500" : "border-gray-300"
                  } ${loadingUsers || isSubmitting ? "bg-gray-100 cursor-not-allowed" : ""}`}
                >
                  <option value="">Selecciona un cliente</option>
                  {users.map((user) => (
                    <option 
                      key={user.id_user} 
                      value={user.id_user}
                    >
                      {user.nombre} {user.apellido} - {user.correo}
                    </option>
                  ))}
                </select>
                {errors.nombre && (
                  <p className="mt-1 text-sm text-red-600">{errors.nombre.message}</p>
                )}
              </>
            );
          }}
        />
      </div>

      <div>
        <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
          Dispositivo <span className="text-red-500">*</span>
        </label>
        <InputField
          {...register("dispositivo", {
            required: "El dispositivo es requerido",
          })}
          placeholder="Ej: iPhone 13 Pro"
          disabled={isSubmitting}
          className={`text-sm sm:text-base ${errors.dispositivo ? "border-red-500" : ""}`}
        />
        {errors.dispositivo && (
          <p className="mt-1 text-xs sm:text-sm text-red-600">{errors.dispositivo.message}</p>
        )}
      </div>

      <div>
        <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
          Observaciones
        </label>
        <textarea
          {...register("observaciones")}
          rows={3}
          placeholder="Describe el problema o las observaciones..."
          disabled={isSubmitting}
          className={`w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border rounded-lg focus:ring-2 focus:ring-[#57ad63] outline-none ${
            errors.observaciones ? "border-red-500" : "border-gray-300"
          }`}
        />
        {errors.observaciones && (
          <p className="mt-1 text-xs sm:text-sm text-red-600">{errors.observaciones.message}</p>
        )}
      </div>

      <div>
        <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
          Costo <span className="text-red-500">*</span>
        </label>
        <InputField
          {...register("costo", {
            required: "El costo es requerido",
            min: { value: 0, message: "El costo debe ser mayor o igual a 0" },
            valueAsNumber: true,
          })}
          type="number"
          step="0.01"
          min="0"
          placeholder="0.00"
          disabled={isSubmitting}
          className={`text-sm sm:text-base ${errors.costo ? "border-red-500" : ""}`}
        />
        {errors.costo && (
          <p className="mt-1 text-xs sm:text-sm text-red-600">{errors.costo.message}</p>
        )}
      </div>
    </div>
  );
}
