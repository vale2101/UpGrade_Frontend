"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import FormInput from "../atoms/FormInput";

const addressFormSchema = z.object({
  fullName: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
  phone: z.string().min(10, "El teléfono debe tener al menos 10 caracteres"),
  line1: z.string().min(5, "La dirección debe tener al menos 5 caracteres"),
  line2: z.string().optional(),
  city: z.string().min(2, "La ciudad debe tener al menos 2 caracteres"),
  state: z.string().min(2, "El departamento/estado debe tener al menos 2 caracteres"),
  zip: z.string().min(4, "El código postal debe tener al menos 4 caracteres"),
});

type AddressFormData = z.infer<typeof addressFormSchema>;

const STORAGE_KEY = "upgrade-address";

export default function AddressForm() {
  const [saved, setSaved] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    watch
  } = useForm<AddressFormData>({
    resolver: zodResolver(addressFormSchema),
    defaultValues: {
      fullName: "",
      phone: "",
      line1: "",
      line2: "",
      city: "",
      state: "",
      zip: ""
    },
  });

  // Cargar datos guardados al montar el componente
  useEffect(() => {
    const savedValue = localStorage.getItem(STORAGE_KEY);
    if (savedValue) {
      try {
        const parsed = JSON.parse(savedValue);
        reset(parsed);
      } catch {}
    }
  }, [reset]);

  // Marcar como no guardado cuando cambian los valores
  const watchedValues = watch();
  useEffect(() => {
    setSaved(false);
  }, [watchedValues]);

  const onSave = async (data: AddressFormData) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      setSaved(true);
      // Limpiar el estado "guardado" después de 3 segundos
      setTimeout(() => setSaved(false), 3000);
    } catch (error) {
      console.error("Error al guardar la dirección:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSave)} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
      <div>
        <label className="block text-sm text-gray-600 mb-1">Nombre completo</label>
        <input
          {...register("fullName")}
          className={`w-full border rounded-md px-3 py-2 ${
            errors.fullName ? "border-red-500" : "border-gray-300"
          }`}
        />
        {errors.fullName && (
          <p className="mt-1 text-sm text-red-600">{errors.fullName.message}</p>
        )}
      </div>
      <div>
        <label className="block text-sm text-gray-600 mb-1">Teléfono</label>
        <input
          {...register("phone")}
          className={`w-full border rounded-md px-3 py-2 ${
            errors.phone ? "border-red-500" : "border-gray-300"
          }`}
        />
        {errors.phone && (
          <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>
        )}
      </div>
      <div className="sm:col-span-2">
        <label className="block text-sm text-gray-600 mb-1">Dirección</label>
        <input
          {...register("line1")}
          className={`w-full border rounded-md px-3 py-2 ${
            errors.line1 ? "border-red-500" : "border-gray-300"
          }`}
        />
        {errors.line1 && (
          <p className="mt-1 text-sm text-red-600">{errors.line1.message}</p>
        )}
      </div>
      <div className="sm:col-span-2">
        <label className="block text-sm text-gray-600 mb-1">Complemento</label>
        <input
          {...register("line2")}
          className="w-full border border-gray-300 rounded-md px-3 py-2"
        />
      </div>
      <div>
        <label className="block text-sm text-gray-600 mb-1">Ciudad</label>
        <input
          {...register("city")}
          className={`w-full border rounded-md px-3 py-2 ${
            errors.city ? "border-red-500" : "border-gray-300"
          }`}
        />
        {errors.city && (
          <p className="mt-1 text-sm text-red-600">{errors.city.message}</p>
        )}
      </div>
      <div>
        <label className="block text-sm text-gray-600 mb-1">Departamento/Estado</label>
        <input
          {...register("state")}
          className={`w-full border rounded-md px-3 py-2 ${
            errors.state ? "border-red-500" : "border-gray-300"
          }`}
        />
        {errors.state && (
          <p className="mt-1 text-sm text-red-600">{errors.state.message}</p>
        )}
      </div>
      <div>
        <label className="block text-sm text-gray-600 mb-1">Código Postal</label>
        <input
          {...register("zip")}
          className={`w-full border rounded-md px-3 py-2 ${
            errors.zip ? "border-red-500" : "border-gray-300"
          }`}
        />
        {errors.zip && (
          <p className="mt-1 text-sm text-red-600">{errors.zip.message}</p>
        )}
      </div>
      <div className="sm:col-span-2 flex items-center gap-4 pt-2">
        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-black text-white px-6 py-2 rounded-full font-semibold hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? "Guardando..." : "Guardar dirección"}
        </button>
        {saved && <span className="text-green-600 text-sm">Guardado ✓</span>}
      </div>
    </form>
  );
}


