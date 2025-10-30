import MainLayout from "@/components/organisms/MainLayout";
import UserSection from "@/components/organisms/UserSection";

export const metadata = {
  title: "Mi Cuenta - UpGrade",
  description: "Gestiona tu cuenta de UpGrade. Revisa tus pedidos, actualiza tu información personal, configura notificaciones y accede a ofertas exclusivas."
};

export default function UserPage() {
  return (
    <MainLayout>
      <UserSection />
    </MainLayout>
  );
}
