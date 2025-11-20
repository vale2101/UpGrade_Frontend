"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { DireccionService } from "../../services/DireccionService";
import { direccionInterface } from "../../interfaces/direccion.interface";
import AddressList from "./AddressList";

export default function AddressForm() {
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [refreshKey, setRefreshKey] = useState(0);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<direccionInterface>({
    defaultValues: {
      pais: "",
      departamento: "",
      ciudad: "",
      completa: "",
    },
  });

  const onSave = async (data: direccionInterface) => {
    try {
      setError(null);
      const res = await DireccionService.createDireccion(data);

      if (res.success) {
        setSaved(true);
        reset(); // limpiar formulario
        setTimeout(() => setSaved(false), 3000);
        // Refrescar la lista de direcciones
        setRefreshKey(prev => prev + 1);
      } else {
        setError(res.message || "Error al guardar la dirección");
      }
    } catch (err: any) {
      setError(err.message || "Error inesperado");
    }
  };

  const handleRefresh = () => {
    setRefreshKey(prev => prev + 1);
  };

  return (
    <div className="space-y-6">
      <form
        onSubmit={handleSubmit(onSave)}
        className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 grid grid-cols-1 gap-4"
      >
      <div>
        <label className="block text-sm text-gray-600 mb-1">País</label>
        <input
          {...register("pais", { required: "El país es requerido" })}
          className={`w-full border rounded-md px-3 py-2 ${
            errors.pais ? "border-red-500" : "border-gray-300"
          }`}
        />
        {errors.pais && <p className="mt-1 text-sm text-red-600">{errors.pais.message}</p>}
      </div>

      <div>
        <label className="block text-sm text-gray-600 mb-1">Departamento</label>
        <input
          {...register("departamento", { required: "El departamento es requerido" })}
          className={`w-full border rounded-md px-3 py-2 ${
            errors.departamento ? "border-red-500" : "border-gray-300"
          }`}
        />
        {errors.departamento && (
          <p className="mt-1 text-sm text-red-600">{errors.departamento.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm text-gray-600 mb-1">Ciudad</label>
        <input
          {...register("ciudad", { required: "La ciudad es requerida" })}
          className={`w-full border rounded-md px-3 py-2 ${
            errors.ciudad ? "border-red-500" : "border-gray-300"
          }`}
        />
        {errors.ciudad && <p className="mt-1 text-sm text-red-600">{errors.ciudad.message}</p>}
      </div>

      <div className="col-span-1">
        <label className="block text-sm text-gray-600 mb-1">Dirección completa</label>
        <input
          {...register("completa", {
            required: "La dirección es requerida",
            minLength: { value: 5, message: "Debe tener al menos 5 caracteres" },
          })}
          className={`w-full border rounded-md px-3 py-2 ${
            errors.completa ? "border-red-500" : "border-gray-300"
          }`}
        />
        {errors.completa && (
          <p className="mt-1 text-sm text-red-600">{errors.completa.message}</p>
        )}
      </div>

      <div className="flex items-center gap-4 pt-2">
        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-black text-white px-6 py-2 rounded-full font-semibold hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? "Guardando..." : "Guardar dirección"}
        </button>
        {saved && <span className="text-green-600 text-sm">Guardado ✓</span>}
      </div>

      {error && <p className="text-red-600 text-sm mt-2">{error}</p>}
      </form>

      {/* Lista de direcciones registradas */}
      <AddressList refreshKey={refreshKey} onRefresh={handleRefresh} />
    </div>
  );
}
