"use client";

import { Control, FieldErrors } from "react-hook-form";
import { ProductFormData } from "../../hooks/useAdministradorProductForm";
import ProductFormSelectField from "./ProductFormSelectField";

interface ProductFormCategoryTypeSectionProps {
  control: Control<ProductFormData>;
  errors: FieldErrors<ProductFormData>;
}

export default function ProductFormCategoryTypeSection({
  control,
  errors,
}: ProductFormCategoryTypeSectionProps) {
  const categoriaOptions = [
    { value: "iPhone", label: "iPhone" },
    { value: "Samsung", label: "Samsung" },
    { value: "iPad", label: "iPad" },
    { value: "Apple Watch", label: "Apple Watch" },
    { value: "Otras Marcas", label: "Otras Marcas" },
  ];

  const tipoOptions = [
    { value: "Nuevo", label: "Nuevo" },
    { value: "SemiNuevo", label: "Semi Nuevo" },
    { value: "Reacondicionado", label: "Reacondicionado" },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <ProductFormSelectField
        label="Categoría"
        name="categoria"
        control={control}
        errors={errors}
        options={categoriaOptions}
      />
      <ProductFormSelectField
        label="Tipo"
        name="tipo"
        control={control}
        errors={errors}
        options={tipoOptions}
      />
    </div>
  );
}

