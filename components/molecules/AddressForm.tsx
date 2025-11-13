"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import FormInput from "../atoms/FormInput";

interface AddressFormData {
  fullName: string;
  phone: string;
  line1: string;
  line2?: string;
  city: string;
  state: string;
  zip: string;
}

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
          {...register("fullName", {
            required: "El nombre es requerido",
            minLength: { value: 2, message: "El nombre debe tener al menos 2 caracteres" },
          })}
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
          {...register("phone", {
            required: "El teléfono es requerido",
            minLength: { value: 10, message: "El teléfono debe tener al menos 10 caracteres" },
          })}
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
          {...register("line1", {
            required: "La dirección es requerida",
            minLength: { value: 5, message: "La dirección debe tener al menos 5 caracteres" },
          })}
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
          {...register("city", {
            required: "La ciudad es requerida",
            minLength: { value: 2, message: "La ciudad debe tener al menos 2 caracteres" },
          })}
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
          {...register("state", {
            required: "El departamento/estado es requerido",
            minLength: { value: 2, message: "El departamento/estado debe tener al menos 2 caracteres" },
          })}
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
          {...register("zip", {
            required: "El código postal es requerido",
            minLength: { value: 4, message: "El código postal debe tener al menos 4 caracteres" },
          })}
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


