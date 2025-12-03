"use client";

import { useRouter } from "next/navigation";
import { Package, Wrench } from "lucide-react";
import { useAuth } from "../../hooks/useAuthContext";
import { useVendedorProductsBackend } from "../../hooks/useVendedorProductsBackend";
import Tabs from "../molecules/UserTabs";
import DashboardHeader from "../molecules/DashboardHeader";
import VendedorProductsStockTable from "../molecules/VendedorProductsStockTable";
import VendedorRepairsList from "../molecules/VendedorRepairsList";

export default function VendedorDashboardSection() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const { products, loading, updateStock } = useVendedorProductsBackend();

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  const handleStockUpdate = async (id: number, stock: number) => {
    return await updateStock(id, stock);
  };

  return (
    <div className="bg-gray-50">
      <DashboardHeader userName={user?.name || "Vendedor"} onLogout={handleLogout} />

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
                  <div className="mb-4 sm:mb-6">
                    <h2 className="text-lg sm:text-xl font-semibold">Gestión de Productos</h2>
                    <p className="text-sm text-gray-600 mt-1">Edita el stock de los productos haciendo clic en el campo de stock</p>
                  </div>

                  <VendedorProductsStockTable
                    products={products}
                    onStockUpdate={handleStockUpdate}
                    loading={loading}
                  />
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