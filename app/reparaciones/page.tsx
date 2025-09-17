import HomeLayout from "../../components/layouts/HomeLayout";
import RepairsSection from "../../components/organisms/RepairsSection";

export const metadata = {
  title: "Servicio de Reparaciones - UpGrade",
  description: "Servicio profesional de reparación de dispositivos móviles y tablets. Reparamos iPhone, Samsung, iPad y más marcas con garantía y repuestos originales en UpGrade."
};

export default function RepairsPage() {
  return (
    <HomeLayout>
      <RepairsSection />
    </HomeLayout>
  );
}
