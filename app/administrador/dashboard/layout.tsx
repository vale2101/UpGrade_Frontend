import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Panel de Administrador - UpGrade",
  description: "Gestiona productos, reparaciones y pedidos desde tu panel de administrador en UpGrade",
};

export default function AdministradorDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

