"use client";

import { Control, FieldErrors } from "react-hook-form";
import { ProductFormData } from "../../hooks/useAdministradorProductForm";
import ProductFormNumberField from "./ProductFormNumberField";

interface ProductFormPriceStockSectionProps {
  control: Control<ProductFormData>;
  errors: FieldErrors<ProductFormData>;
}

export default function ProductFormPriceStockSection({
  control,
  errors,
}: ProductFormPriceStockSectionProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <ProductFormNumberField
        label="Precio"
        name="precio"
        placeholder="1000000"
        control={control}
        errors={errors}
        min={0}
      />
      <ProductFormNumberField
        label="Stock"
        name="stock"
        placeholder="10"
        control={control}
        errors={errors}
        min={0}
      />
    </div>
  );
}

