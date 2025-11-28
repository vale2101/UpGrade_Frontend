import SectionTitle from "../atoms/SectionTitle";
import SectionDescription from "../atoms/SectionDescription";
import InfoCard from "../molecules/InfoCard";
import FeatureGrid from "../molecules/FeatureGrid";
import FeatureCard from "../atoms/FeatureCard";
import HeroImage from "../atoms/HeroImage";
import SectionImage from "../atoms/SectionImage";
import Carousel from "../molecules/Carousel";
import StatCard from "../molecules/StatCard";
import { getAboutFeatures } from "../../contexts/DataContext";
import { Users, Award, Clock, Heart } from "lucide-react";

export default function AboutSection() {
  const features = getAboutFeatures();

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-50 py-6 sm:py-8 md:py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-6 sm:mb-8 md:mb-12 animate-fade-in">
          <div className="inline-block mb-4">
            <div className="w-20 h-1 bg-gradient-to-r from-transparent via-[#57ad63] to-transparent mx-auto"></div>
          </div>
          <SectionTitle className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent">
            ¿Quiénes somos?
          </SectionTitle>
          <SectionDescription className="max-w-3xl mx-auto text-sm sm:text-base mt-4">
            Somos una empresa especializada en la reparación y venta de equipos tecnológicos, 
            comprometidos con brindar soluciones de calidad y confianza a nuestros clientes.
          </SectionDescription>
        </div>

  
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 md:gap-8 mb-6 sm:mb-8 md:mb-12 items-stretch">
          <div className="h-full">
            <InfoCard
              title="Nuestra Misión"
              description="Proporcionar servicios de reparación y venta de equipos tecnológicos de la más alta calidad, 
              con un enfoque en la satisfacción del cliente y la innovación constante en nuestros procesos."
            />
          </div>
          <div className="h-full">
            <SectionImage 
              src="https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?ixlib=rb-4.0.3&auto=format&fit=crop&w=2069&q=80"
              alt="Técnico trabajando en reparación de dispositivo"
              className="min-h-[150px] sm:min-h-[180px] md:min-h-[200px]"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 md:gap-8 mb-6 sm:mb-8 md:mb-12 items-stretch">
          <div className="order-2 lg:order-1 h-full">
            <SectionImage 
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2071&q=80"
              alt="Equipo de trabajo colaborativo"
              className="min-h-[150px] sm:min-h-[180px] md:min-h-[200px]"
            />
          </div>
          <div className="order-1 lg:order-2 h-full">
            <InfoCard
              title="Nuestra Visión"
              description="Ser la empresa líder en servicios tecnológicos, reconocida por nuestra excelencia, 
              confiabilidad y compromiso con el medio ambiente a través de prácticas sostenibles."
            />
          </div>
        </div>

        {/* Estadísticas */}
        <div className="mb-6 sm:mb-8 md:mb-12">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            <StatCard
              value="10K+"
              label="Clientes Satisfechos"
              icon={<Users size={32} />}
              trend="up"
            />
            <StatCard
              value="5+"
              label="Años de Experiencia"
              icon={<Award size={32} />}
              trend="up"
            />
            <StatCard
              value="24/7"
              label="Soporte Disponible"
              icon={<Clock size={32} />}
            />
            <StatCard
              value="98%"
              label="Satisfacción"
              icon={<Heart size={32} />}
              trend="up"
            />
          </div>
        </div>

        {/* Carrusel de características */}
        <div className="mb-6 sm:mb-8 md:mb-12">
          <div className="text-center mb-4 sm:mb-6 md:mb-8">
            <SectionTitle className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent">
              ¿Por qué elegirnos?
            </SectionTitle>
            <div className="w-24 h-1 bg-gradient-to-r from-transparent via-[#57ad63] to-transparent mx-auto mt-3"></div>
          </div>
          
          {/* Carrusel en móvil, grid en desktop */}
          <div className="block lg:hidden">
            <Carousel
              items={features.map((feature, index) => (
                <div key={index} className="px-2 h-full">
                  <FeatureCard
                    title={feature.title}
                    description={feature.description}
                    icon={feature.icon}
                  />
                </div>
              ))}
              autoPlay={true}
              autoPlayInterval={4000}
            />
          </div>
          
          <div className="hidden lg:block">
            <FeatureGrid features={features} />
          </div>
        </div>
      </div>
    </div>
  );
}
