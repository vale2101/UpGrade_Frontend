import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Iniciar Sesión - UpGrade",
  description: "Inicia sesión en tu cuenta de UpGrade para acceder a ofertas exclusivas, seguir tus pedidos y disfrutar de una experiencia de compra personalizada.",
};

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

