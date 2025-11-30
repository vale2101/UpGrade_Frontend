"use client";

import { Control, Controller, FieldErrors } from "react-hook-form";
import { FichaFormData } from "../../hooks/useFichaForm";

interface FichaFormEstadoFieldProps {
  control: Control<FichaFormData>;
  errors: FieldErrors<FichaFormData>;
}

export default function FichaFormEstadoField({
  control,
  errors,
}: FichaFormEstadoFieldProps) {
  const errorMessage = errors.estado?.message as string | undefined;

  return (
    <div>
      <label className="text-sm font-medium text-gray-700">Estado</label>
      <Controller
        name="estado"
        control={control}
        rules={{
          required: "El estado es requerido",
        }}
        render={({ field }) => (
          <>
            <select
              {...field}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#57ad63] outline-none ${
                errorMessage ? "border-red-500" : "border-gray-300"
              }`}
            >
              <option value="Activo">Activo</option>
              <option value="Inactivo">Inactivo</option>
            </select>
            {errorMessage && (
              <p className="mt-1 text-sm text-red-600">{errorMessage}</p>
            )}
          </>
        )}
      />
    </div>
  );
}

