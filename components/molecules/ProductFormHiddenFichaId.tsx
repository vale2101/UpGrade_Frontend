"use client";

import { Control, Controller } from "react-hook-form";
import { ProductFormData } from "../../hooks/useAdministradorProductForm";

interface ProductFormHiddenFichaIdProps {
  control: Control<ProductFormData>;
  fichaId: number;
}

export default function ProductFormHiddenFichaId({
  control,
  fichaId,
}: ProductFormHiddenFichaIdProps) {
  return (
    <Controller
      name="id_ficha"
      control={control}
      defaultValue={fichaId}
      rules={{ required: true }}
      render={({ field }) => {
        if (fichaId && field.value !== fichaId) {
          field.onChange(fichaId);
        }
        return <input type="hidden" {...field} value={fichaId || field.value} />;
      }}
    />
  );
}

