"use client";

import { useAddressForm } from "../../hooks/useAddressForm";
import AddressList from "./AddressList";

export default function AddressForm() {
  const {
    register,
    handleSubmit,
    errors,
    isSubmitting,
    saved,
    error,
    refreshKey,
    onSave,
    handleRefresh
  } = useAddressForm();

  return (
    <div className="space-y-4 sm:space-y-6">
      <form
        onSubmit={handleSubmit(onSave)}
        className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 sm:p-6 grid grid-cols-1 gap-3 sm:gap-4"
      >
      <div>
        <label className="block text-xs sm:text-sm text-gray-600 mb-1">País</label>
        <input
          {...register("pais", { required: "El país es requerido" })}
          className={`w-full border rounded-md px-3 py-2 text-sm sm:text-base ${
            errors.pais ? "border-red-500" : "border-gray-300"
          } focus:outline-none focus:ring-2 focus:ring-black`}
        />
        {errors.pais && <p className="mt-1 text-xs sm:text-sm text-red-600">{errors.pais.message}</p>}
      </div>

      <div>
        <label className="block text-xs sm:text-sm text-gray-600 mb-1">Departamento</label>
        <input
          {...register("departamento", { required: "El departamento es requerido" })}
          className={`w-full border rounded-md px-3 py-2 text-sm sm:text-base ${
            errors.departamento ? "border-red-500" : "border-gray-300"
          } focus:outline-none focus:ring-2 focus:ring-black`}
        />
        {errors.departamento && (
          <p className="mt-1 text-xs sm:text-sm text-red-600">{errors.departamento.message}</p>
        )}
      </div>

      <div>
        <label className="block text-xs sm:text-sm text-gray-600 mb-1">Ciudad</label>
        <input
          {...register("ciudad", { required: "La ciudad es requerida" })}
          className={`w-full border rounded-md px-3 py-2 text-sm sm:text-base ${
            errors.ciudad ? "border-red-500" : "border-gray-300"
          } focus:outline-none focus:ring-2 focus:ring-black`}
        />
        {errors.ciudad && <p className="mt-1 text-xs sm:text-sm text-red-600">{errors.ciudad.message}</p>}
      </div>

      <div className="col-span-1">
        <label className="block text-xs sm:text-sm text-gray-600 mb-1">Dirección completa</label>
        <input
          {...register("completa", {
            required: "La dirección es requerida",
            minLength: { value: 5, message: "Debe tener al menos 5 caracteres" },
          })}
          className={`w-full border rounded-md px-3 py-2 text-sm sm:text-base ${
            errors.completa ? "border-red-500" : "border-gray-300"
          } focus:outline-none focus:ring-2 focus:ring-black`}
        />
        {errors.completa && (
          <p className="mt-1 text-xs sm:text-sm text-red-600">{errors.completa.message}</p>
        )}
      </div>

      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 pt-2">
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full sm:w-auto bg-black text-white px-4 sm:px-6 py-2 rounded-full font-semibold hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base transition-colors"
        >
          {isSubmitting ? "Guardando..." : "Guardar dirección"}
        </button>
        {saved && <span className="text-green-600 text-xs sm:text-sm text-center sm:text-left">Guardado ✓</span>}
      </div>

      {error && <p className="text-red-600 text-sm mt-2">{error}</p>}
      </form>

      <AddressList refreshKey={refreshKey} onRefresh={handleRefresh} />
    </div>
  );
}

