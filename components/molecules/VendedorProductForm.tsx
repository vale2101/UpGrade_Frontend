"use client";

import { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import InputField from "../atoms/InputField";
import Button from "../atoms/Button";
import { VendedorProduct } from "../../hooks/useVendedorProducts";

const vendedorProductFormSchema = z.object({
  name: z.string().min(2, "El nombre del producto debe tener al menos 2 caracteres"),
  price: z.string().min(1, "El precio es requerido"),
  stock: z.number().min(0, "El stock debe ser mayor o igual a 0"),
  category: z.string().min(1, "La categoría es requerida"),
  condition: z.string().min(1, "La condición es requerida"),
});

type VendedorProductFormData = z.infer<typeof vendedorProductFormSchema>;

interface VendedorProductFormProps {
  product?: VendedorProduct | null;
  onSave: (product: Omit<VendedorProduct, "id">) => void;
  onCancel: () => void;
}

export default function VendedorProductForm({ product, onSave, onCancel }: VendedorProductFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    control,
    reset
  } = useForm<VendedorProductFormData>({
    resolver: zodResolver(vendedorProductFormSchema),
    defaultValues: {
      name: "",
      price: "",
      stock: 0,
      category: "iPhone",
      condition: "Nuevo"
    },
  });

  useEffect(() => {
    if (product) {
      reset({
        name: product.name,
        price: product.price,
        stock: product.stock,
        category: product.category,
        condition: product.condition
      });
    }
  }, [product, reset]);

  const onFormSubmit = async (data: VendedorProductFormData) => {
    onSave({
      name: data.name,
      price: data.price,
      stock: data.stock,
      category: data.category,
      condition: data.condition
    });
  };

  return (
    <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-4">
      <div>
        <label className="text-sm font-medium text-gray-700">Nombre del Producto</label>
        <InputField
          {...register("name")}
          placeholder="Ej: iPhone 13 Pro"
          required
        />
        {errors.name && (
          <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium text-gray-700">Precio</label>
          <InputField
            {...register("price")}
            placeholder="$1.000.000"
            required
          />
          {errors.price && (
            <p className="mt-1 text-sm text-red-600">{errors.price.message}</p>
          )}
        </div>
        <div>
          <label className="text-sm font-medium text-gray-700">Stock</label>
          <Controller
            name="stock"
            control={control}
            render={({ field }) => (
              <>
                <InputField
                  type="number"
                  {...field}
                  onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                  placeholder="10"
                  required
                />
                {errors.stock && (
                  <p className="mt-1 text-sm text-red-600">{errors.stock.message}</p>
                )}
              </>
            )}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium text-gray-700">Categoría</label>
          <Controller
            name="category"
            control={control}
            render={({ field }) => (
              <>
                <select
                  {...field}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#57ad63] outline-none ${
                    errors.category ? "border-red-500" : "border-gray-300"
                  }`}
                >
                  <option value="iPhone">iPhone</option>
                  <option value="Samsung">Samsung</option>
                  <option value="iPad">iPad</option>
                  <option value="Apple Watch">Apple Watch</option>
                  <option value="Otras Marcas">Otras Marcas</option>
                </select>
                {errors.category && (
                  <p className="mt-1 text-sm text-red-600">{errors.category.message}</p>
                )}
              </>
            )}
          />
        </div>
        <div>
          <label className="text-sm font-medium text-gray-700">Condición</label>
          <Controller
            name="condition"
            control={control}
            render={({ field }) => (
              <>
                <select
                  {...field}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#57ad63] outline-none ${
                    errors.condition ? "border-red-500" : "border-gray-300"
                  }`}
                >
                  <option value="Nuevo">Nuevo</option>
                  <option value="Como Nuevo">Como Nuevo</option>
                  <option value="Semi Nuevo">Semi Nuevo</option>
                  <option value="Outlet">Outlet</option>
                </select>
                {errors.condition && (
                  <p className="mt-1 text-sm text-red-600">{errors.condition.message}</p>
                )}
              </>
            )}
          />
        </div>
      </div>

      <div className="flex gap-3 pt-4">
        <Button type="submit" fullWidth disabled={isSubmitting}>
          {isSubmitting ? "Guardando..." : product ? "Actualizar" : "Agregar"} Producto
        </Button>
        <Button type="button" fullWidth onClick={onCancel}>
          Cancelar
        </Button>
      </div>
    </form>
  );
}





