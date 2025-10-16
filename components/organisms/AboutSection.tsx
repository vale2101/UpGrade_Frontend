import SectionTitle from "../atoms/SectionTitle";
import SectionDescription from "../atoms/SectionDescription";
import InfoCard from "../molecules/InfoCard";
import FeatureGrid from "../molecules/FeatureGrid";
import HeroImage from "../atoms/HeroImage";
import SectionImage from "../atoms/SectionImage";
import { getAboutFeatures } from "../../contexts/DataContext";

export default function AboutSection() {
  const features = getAboutFeatures();

  return (
    <div className="min-h-screen bg-gray-50 py-8 sm:py-12">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-8 sm:mb-12">
          <SectionTitle>¿Quiénes somos?</SectionTitle>
          <SectionDescription className="max-w-3xl mx-auto">
            Somos una empresa especializada en la reparación y venta de equipos tecnológicos, 
            comprometidos con brindar soluciones de calidad y confianza a nuestros clientes.
          </SectionDescription>
        </div>

        <div className="mb-8 sm:mb-12">
          <HeroImage 
            src="https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
            alt="Equipo de técnicos trabajando en reparaciones"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 mb-8 sm:mb-12">
          <div>
            <InfoCard
              title="Nuestra Misión"
              description="Proporcionar servicios de reparación y venta de equipos tecnológicos de la más alta calidad, 
              con un enfoque en la satisfacción del cliente y la innovación constante en nuestros procesos."
            />
          </div>
          <div>
            <SectionImage 
              src="https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?ixlib=rb-4.0.3&auto=format&fit=crop&w=2069&q=80"
              alt="Técnico trabajando en reparación de dispositivo"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <div className="order-2 lg:order-1">
            <SectionImage 
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2071&q=80"
              alt="Equipo de trabajo colaborativo"
            />
          </div>
          <div className="order-1 lg:order-2">
            <InfoCard
              title="Nuestra Visión"
              description="Ser la empresa líder en servicios tecnológicos, reconocida por nuestra excelencia, 
              confiabilidad y compromiso con el medio ambiente a través de prácticas sostenibles."
            />
          </div>
        </div>

        <div>
          <SectionTitle className="text-center mb-8">¿Por qué elegirnos?</SectionTitle>
          <FeatureGrid features={features} />
        </div>
      </div>
    </div>
  );
}
