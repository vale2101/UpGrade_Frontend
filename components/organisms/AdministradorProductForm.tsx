"use client";

import { productoInterface } from "../../interfaces/producto.interface";
import FichaForm from "../molecules/FichaForm";
import { useAdministradorProductForm } from "../../hooks/useAdministradorProductForm";
import ProductFormTextField from "../molecules/ProductFormTextField";
import ProductFormPriceStockSection from "../molecules/ProductFormPriceStockSection";
import ProductFormCategoryTypeSection from "../molecules/ProductFormCategoryTypeSection";
import ProductFormColorCapacitySection from "../molecules/ProductFormColorCapacitySection";
import ProductFormSuccessMessage from "../molecules/ProductFormSuccessMessage";
import ProductFormActions from "../molecules/ProductFormActions";
import ProductFormHiddenFichaId from "../molecules/ProductFormHiddenFichaId";
import ProductFormNumberField from "../molecules/ProductFormNumberField";
import FichaStepHeader from "../molecules/FichaStepHeader";
import FichaStepHeaderEditable from "../molecules/FichaStepHeaderEditable";
import ProductStepHeader from "../molecules/ProductStepHeader";
import FormNavigationArrow from "../molecules/FormNavigationArrow";

interface AdministradorProductFormProps {
  product?: productoInterface | null;
  onSave: (product: productoInterface) => Promise<void>;
  onCancel: () => void;
}

export default function AdministradorProductForm({ product, onSave, onCancel }: AdministradorProductFormProps) {
  const {
    currentStep,
    fichaId,
    currentFicha,
    loadingFicha,
    register,
    handleSubmit,
    errors,
    isSubmitting,
    control,
    handleFichaSave,
    handleFichaCancel,
    onFormSubmit,
    goToFicha,
    goToProducto,
  } = useAdministradorProductForm({ product, onSave, onCancel });

  if (currentStep === 'ficha') {
    return (
      <div>
        {product && (
          <div className="mb-4">
            <FormNavigationArrow
              direction="left"
              onClick={goToProducto}
              label="Volver a Editar Producto"
            />
          </div>
        )}
        <FichaStepHeaderEditable isEditMode={!!product && !!currentFicha} />
        {loadingFicha ? (
          <div className="text-center py-8 text-gray-500">Cargando ficha técnica...</div>
        ) : (
          <FichaForm 
            onSave={handleFichaSave} 
            onCancel={handleFichaCancel}
            initialFicha={currentFicha}
          />
        )}
      </div>
    );
  }

  return (
    <div>
      {!product && fichaId && <ProductFormSuccessMessage fichaId={fichaId} />}
      {!product && <ProductStepHeader />}
      
      <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-4">
        <ProductFormTextField
          label="Nombre del Producto"
          name="nombre"
          placeholder="Ej: iPhone 13 Pro"
          register={register}
          errors={errors}
          validationRules={{
            required: "El nombre del producto es requerido",
            minLength: { value: 2, message: "El nombre del producto debe tener al menos 2 caracteres" },
          }}
        />

        <ProductFormPriceStockSection control={control} errors={errors} />
        <ProductFormCategoryTypeSection control={control} errors={errors} />
        <ProductFormColorCapacitySection register={register} errors={errors} />

        <ProductFormTextField
          label="URL de la Foto"
          name="foto"
          placeholder="https://ejemplo.com/imagen.jpg"
          register={register}
          errors={errors}
          validationRules={{ required: "La URL de la foto es requerida" }}
        />

        {product && (
          <>
            <div className="border-t pt-4">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <label className="text-sm font-medium text-gray-700">Ficha Técnica</label>
                  <p className="text-xs text-gray-500 mt-1">
                    ID: {fichaId || 'No asignada'}
                  </p>
                </div>
                {fichaId && (
                  <FormNavigationArrow
                    direction="right"
                    onClick={goToFicha}
                    label="Editar Ficha Técnica"
                  />
                )}
              </div>
            </div>
            <ProductFormNumberField
              label="ID Ficha Técnica"
              name="id_ficha"
              placeholder="1"
              control={control}
              errors={errors}
              min={1}
              validationRules={{
                required: "El ID de ficha es requerido",
                min: { value: 1, message: "El ID de ficha debe ser mayor a 0" },
              }}
            />
          </>
        )}

        {!product && fichaId && <ProductFormHiddenFichaId control={control} fichaId={fichaId} />}

        <ProductFormActions
          isSubmitting={isSubmitting}
          isEditMode={!!product}
          onCancel={onCancel}
        />
      </form>
    </div>
  );
}

