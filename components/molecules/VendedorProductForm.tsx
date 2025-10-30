"use client";

import { useState, useEffect } from "react";
import InputField from "../atoms/InputField";
import Button from "../atoms/Button";
import { VendedorProduct } from "../../hooks/useVendedorProducts";

interface VendedorProductFormProps {
  product?: VendedorProduct | null;
  onSave: (product: Omit<VendedorProduct, "id">) => void;
  onCancel: () => void;
}

export default function VendedorProductForm({ product, onSave, onCancel }: VendedorProductFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    stock: 0,
    category: "iPhone",
    condition: "Nuevo"
  });

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name,
        price: product.price,
        stock: product.stock,
        category: product.category,
        condition: product.condition
      });
    }
  }, [product]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="text-sm font-medium text-gray-700">Nombre del Producto</label>
        <InputField
          value={formData.name}
          onChange={(e: any) => setFormData(prev => ({ ...prev, name: e.target.value }))}
          placeholder="Ej: iPhone 13 Pro"
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium text-gray-700">Precio</label>
          <InputField
            value={formData.price}
            onChange={(e: any) => setFormData(prev => ({ ...prev, price: e.target.value }))}
            placeholder="$1.000.000"
            required
          />
        </div>
        <div>
          <label className="text-sm font-medium text-gray-700">Stock</label>
          <InputField
            type="number"
            value={formData.stock.toString()}
            onChange={(e: any) => setFormData(prev => ({ ...prev, stock: parseInt(e.target.value) || 0 }))}
            placeholder="10"
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium text-gray-700">Categoría</label>
          <select
            value={formData.category}
            onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#57ad63] outline-none"
          >
            <option value="iPhone">iPhone</option>
            <option value="Samsung">Samsung</option>
            <option value="iPad">iPad</option>
            <option value="Apple Watch">Apple Watch</option>
            <option value="Otras Marcas">Otras Marcas</option>
          </select>
        </div>
        <div>
          <label className="text-sm font-medium text-gray-700">Condición</label>
          <select
            value={formData.condition}
            onChange={(e) => setFormData(prev => ({ ...prev, condition: e.target.value }))}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#57ad63] outline-none"
          >
            <option value="Nuevo">Nuevo</option>
            <option value="Como Nuevo">Como Nuevo</option>
            <option value="Semi Nuevo">Semi Nuevo</option>
            <option value="Outlet">Outlet</option>
          </select>
        </div>
      </div>

      <div className="flex gap-3 pt-4">
        <Button type="submit" fullWidth>
          {product ? "Actualizar" : "Agregar"} Producto
        </Button>
        <Button type="button" fullWidth onClick={onCancel}>
          Cancelar
        </Button>
      </div>
    </form>
  );
}


