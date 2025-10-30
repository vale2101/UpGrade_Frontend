"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Package, Wrench, LogOut, Plus } from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";
import { useVendedorProducts, VendedorProduct } from "../../hooks/useVendedorProducts";
import Tabs from "../molecules/UserTabs";
import VendedorProductsTable from "../molecules/VendedorProductsTable";
import VendedorProductForm from "../molecules/VendedorProductForm";
import VendedorRepairsList from "../molecules/VendedorRepairsList";

export default function VendedorDashboardSection() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const { products, addProduct, updateProduct, deleteProduct } = useVendedorProducts();
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<VendedorProduct | null>(null);

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  const handleEdit = (product: VendedorProduct) => {
    setEditingProduct(product);
    setShowForm(true);
  };

  const handleSave = (productData: Omit<VendedorProduct, "id">) => {
    if (editingProduct) {
      updateProduct(editingProduct.id, productData);
    } else {
      addProduct(productData);
    }
    setShowForm(false);
    setEditingProduct(null);
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingProduct(null);
  };

  const handleDelete = (id: string) => {
    if (confirm("¿Estás seguro de eliminar este producto?")) {
      deleteProduct(id);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Dashboard Vendedor</h1>
            <p className="text-sm text-gray-600">Bienvenido, {user?.name}</p>
          </div>
          <button 
            onClick={handleLogout}
            className="inline-flex items-center gap-2 text-red-600 hover:bg-red-50 border border-red-200 px-4 py-2 rounded-md"
          >
            <LogOut size={16} />
            Cerrar sesión
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <Tabs
          items={[
            {
              key: "products",
              label: "Productos",
              icon: <Package size={16} />,
              content: (
                <div className="bg-white rounded-xl shadow-sm border p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-semibold">Gestión de Productos</h2>
                    {!showForm && (
                      <button
                        onClick={() => setShowForm(true)}
                        className="inline-flex items-center gap-2 bg-[#57ad63] text-white px-4 py-2 rounded-lg hover:bg-[#459a52]"
                      >
                        <Plus size={16} />
                        Nuevo Producto
                      </button>
                    )}
                  </div>

                  {showForm ? (
                    <VendedorProductForm
                      product={editingProduct}
                      onSave={handleSave}
                      onCancel={handleCancel}
                    />
                  ) : (
                    <VendedorProductsTable
                      products={products}
                      onEdit={handleEdit}
                      onDelete={handleDelete}
                    />
                  )}
                </div>
              )
            },
            {
              key: "repairs",
              label: "Reparaciones",
              icon: <Wrench size={16} />,
              content: (
                <div className="bg-white rounded-xl shadow-sm border p-6">
                  <h2 className="text-xl font-semibold mb-6">Gestión de Reparaciones</h2>
                  <VendedorRepairsList />
                </div>
              )
            }
          ]}
        />
      </div>
    </div>
  );
}

