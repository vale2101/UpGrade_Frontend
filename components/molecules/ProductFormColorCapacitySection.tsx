"use client";

import { FieldErrors, UseFormRegister } from "react-hook-form";
import { ProductFormData } from "../../hooks/useAdministradorProductForm";
import ProductFormTextField from "./ProductFormTextField";

interface ProductFormColorCapacitySectionProps {
  register: UseFormRegister<ProductFormData>;
  errors: FieldErrors<ProductFormData>;
}

export default function ProductFormColorCapacitySection({
  register,
  errors,
}: ProductFormColorCapacitySectionProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <ProductFormTextField
        label="Color"
        name="color"
        placeholder="Ej: Negro, Blanco, Azul"
        register={register}
        errors={errors}
        validationRules={{ required: "El color es requerido" }}
      />
      <ProductFormTextField
        label="Capacidad"
        name="capacidad"
        placeholder="Ej: 128GB, 256GB"
        register={register}
        errors={errors}
        validationRules={{ required: "La capacidad es requerida" }}
      />
    </div>
  );
}

