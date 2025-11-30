import AdministradorDashboardSection from "@/components/organisms/AdministradorDashboardSection";
import MainLayout from "@/components/organisms/MainLayout";

export const metadata = {
  title: "Dashboard Administrador - UpGrade",
  description: "Panel de administración para administradores"
};

export default function AdministradorDashboardPage() {
  return (
    <MainLayout>
      <AdministradorDashboardSection />
    </MainLayout>
  );
}

