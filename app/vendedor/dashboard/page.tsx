import VendedorDashboardSection from "@/components/organisms/VendedorDashboardSection";
import MainLayout from "@/components/organisms/MainLayout";

export const metadata = {
  title: "Dashboard Vendedor - UpGrade",
  description: "Panel de administración para vendedores"
};

export default function VendedorDashboardPage() {
  return (
    <MainLayout>
      <VendedorDashboardSection />
    </MainLayout>
  );
}
