"use client";
import { Control } from "react-hook-form";
import { ProductFormData } from "../../hooks/useAdministradorProductForm";
import HiddenInput from "../atoms/HiddenInput";

interface ProductFormHiddenFichaIdProps {
  control: Control<ProductFormData>;
  fichaId: number;
}

export default function ProductFormHiddenFichaId({
  control,
  fichaId,
}: ProductFormHiddenFichaIdProps) {
  return <HiddenInput name="id_ficha" control={control} value={fichaId} />;
}

