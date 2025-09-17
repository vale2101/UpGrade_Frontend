import HomeLayout from "../../components/layouts/HomeLayout";
import HelpSection from "../../components/organisms/HelpSection";

export const metadata = {
  title: "Ayuda y Soporte - UpGrade",
  description: "Encuentra ayuda y soporte para tus compras en UpGrade. Preguntas frecuentes, guías de compra, información de envíos y contacto directo con nuestro equipo."
};

export default function HelpPage() {
  return (
    <HomeLayout>
      <HelpSection />
    </HomeLayout>
  );
}
