import HomeLayout from "../../components/layouts/HomeLayout";
import AboutSection from "../../components/organisms/AboutSection";

export const metadata = {
  title: "Acerca de UpGrade - Nuestra Historia y Misión",
  description: "Conoce la historia de UpGrade, tu tienda de confianza para productos tecnológicos reacondicionados. Calidad garantizada, precios justos y compromiso con el medio ambiente."
};

export default function AboutPage() {
  return (
    <HomeLayout>
      <AboutSection />
    </HomeLayout>
  );
}
