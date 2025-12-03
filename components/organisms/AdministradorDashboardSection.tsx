"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Package, Wrench, Plus, ShoppingBag } from "lucide-react";
import { useAdministradorAuth } from "../../hooks/useAdministradorAuth";
import { useAdministradorProducts } from "../../hooks/useAdministradorProducts";
import { productoInterface } from "../../interfaces/producto.interface";
import Tabs from "../molecules/UserTabs";
import AdministradorDashboardHeader from "../molecules/AdministradorDashboardHeader";
import AdministradorProductsTable from "../molecules/AdministradorProductsTable";
import AdministradorProductForm from "./AdministradorProductForm";
import AdministradorRepairsTable from "../molecules/AdministradorRepairsTable";
import AdministradorOrdersList from "../molecules/AdministradorOrdersList";

export default function AdministradorDashboardSection() {
  const { administrador, logout } = useAdministradorAuth();
  const router = useRouter();
  const { products, loading, createProduct, updateProduct, deleteProduct } = useAdministradorProducts();
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<productoInterface | null>(null);

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  const handleEdit = (product: productoInterface) => {
    setEditingProduct(product);
    setShowForm(true);
  };

  const handleSave = async (productData: productoInterface) => {
    if (editingProduct && editingProduct.id_producto) {
      await updateProduct(editingProduct.id_producto, productData);
    } else {
      await createProduct(productData);
    }
    setShowForm(false);
    setEditingProduct(null);
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingProduct(null);
  };

  const handleDelete = async (id: number) => {
    await deleteProduct(id);
  };

  return (
    <div className="bg-gray-50">
      <AdministradorDashboardHeader 
        onLogout={handleLogout} 
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-6 md:py-8">
        <Tabs
          baseUrl=""
          items={[
            {
              key: "products",
              label: "Productos",
              icon: <Package size={16} />,
              content: (
                <div className="bg-white rounded-xl shadow-sm border p-4 sm:p-6">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
                    <h2 className="text-lg sm:text-xl font-semibold">Gestión de Productos</h2>
                    {!showForm && (
                      <button
                        onClick={() => setShowForm(true)}
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#57ad63] text-white px-3 sm:px-4 py-2 rounded-lg hover:bg-[#459a52] text-sm sm:text-base transition-colors"
                      >
                        <Plus size={16} />
                        Nuevo Producto
                      </button>
                    )}
                  </div>

                  {showForm ? (
                    <AdministradorProductForm
                      product={editingProduct}
                      onSave={handleSave}
                      onCancel={handleCancel}
                    />
                  ) : (
                    <AdministradorProductsTable
                      products={products}
                      loading={loading}
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
                <div className="bg-white rounded-xl shadow-sm border p-4 sm:p-6">
                  <h2 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6">Gestión de Reparaciones</h2>
                  <AdministradorRepairsTable />
                </div>
              )
            },
            {
              key: "orders",
              label: "Pedidos",
              icon: <ShoppingBag size={16} />,
              content: (
                <div className="bg-white rounded-xl shadow-sm border p-4 sm:p-6">
                  <h2 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6">Gestión de Pedidos</h2>
                  <AdministradorOrdersList />
                </div>
              )
            }
          ]}
        />
      </div>
    </div>
  );
}

