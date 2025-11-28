import SectionTitle from "../atoms/SectionTitle";
import SectionDescription from "../atoms/SectionDescription";
import FeatureCard from "../atoms/FeatureCard";
import HeroImage from "../atoms/HeroImage";
import SectionImage from "../atoms/SectionImage";
import Carousel from "../molecules/Carousel";
import AnimatedBadge from "../atoms/AnimatedBadge";
import { getRepairServices, getRepairProcess } from "../../contexts/DataContext";

export default function RepairsSection() {
  const repairServices = getRepairServices();
  const repairProcess = getRepairProcess();

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50/30 via-white to-gray-50 py-6 sm:py-8 md:py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-6 sm:mb-8 md:mb-12 animate-fade-in">
          <div className="inline-block mb-4">
            <div className="w-20 h-1 bg-gradient-to-r from-transparent via-green-500 to-transparent mx-auto"></div>
          </div>
          <SectionTitle className="bg-gradient-to-r from-green-600 via-green-700 to-green-600 bg-clip-text text-transparent">
            Reparaciones
          </SectionTitle>
          <SectionDescription className="max-w-3xl mx-auto text-sm sm:text-base mt-4">
            Reparamos todo tipo de dispositivos tecnológicos con la más alta calidad y garantía. 
            Nuestros técnicos especializados utilizan piezas originales y las mejores herramientas.
          </SectionDescription>
        </div>

       

        <div className="mb-6 sm:mb-8 md:mb-12">
          <div className="text-center mb-4 sm:mb-6 md:mb-8">
            <SectionTitle className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent">
              Dispositivos que Reparamos
            </SectionTitle>
            <div className="w-24 h-1 bg-gradient-to-r from-transparent via-green-500 to-transparent mx-auto mt-3"></div>
            <div className="mt-4 flex justify-center gap-2 flex-wrap">
              <AnimatedBadge variant="success">Garantía 90 días</AnimatedBadge>
              <AnimatedBadge variant="info">Piezas Originales</AnimatedBadge>
              <AnimatedBadge variant="warning">Presupuesto Gratis</AnimatedBadge>
            </div>
          </div>
          
          {/* Carrusel en móvil, grid en desktop */}
          <div className="block lg:hidden">
            <Carousel
              items={repairServices.map((service, index) => (
                <div key={index} className="px-2 h-full">
                  <FeatureCard
                    title={service.title}
                    description={service.description}
                    icon={service.icon}
                  />
                </div>
              ))}
              autoPlay={true}
              autoPlayInterval={4000}
            />
          </div>
          
          <div className="hidden lg:grid grid-cols-3 gap-4 sm:gap-6 items-stretch">
            {repairServices.map((service, index) => (
              <div 
                key={index}
                className="animate-fade-in-up h-full"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <FeatureCard
                  title={service.title}
                  description={service.description}
                  icon={service.icon}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="mb-6 sm:mb-8 md:mb-12">
          <div className="text-center mb-4 sm:mb-6 md:mb-8">
            <SectionTitle className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent">
              Tu Reparación Está En
            </SectionTitle>
            <div className="w-24 h-1 bg-gradient-to-r from-transparent via-green-500 to-transparent mx-auto mt-3"></div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 items-stretch">
            {repairProcess.map((step, index) => (
              <div 
                key={index}
                className="animate-fade-in-up h-full"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <FeatureCard
                  title={step.title}
                  description={step.description}
                  icon={step.icon}
                  className="text-center"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 md:gap-8 items-stretch">
          <div className="group relative bg-gradient-to-br from-green-50 via-green-100/50 to-green-50 p-4 sm:p-6 md:p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-green-200 overflow-hidden h-full flex flex-col">
            {/* Efecto de brillo animado */}
            <div className="absolute inset-0 bg-gradient-to-r from-green-400/0 via-green-400/10 to-green-400/0 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
            
            <div className="relative z-10 flex flex-col flex-1">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <SectionTitle className="text-green-800 mb-3 sm:mb-4 text-lg sm:text-xl md:text-2xl group-hover:text-green-900 transition-colors">
                  Garantía y Calidad
                </SectionTitle>
              </div>
              <div className="text-green-700 text-sm sm:text-base space-y-2 flex-1">
                <div className="flex items-start gap-2">
                  <span className="text-green-500 font-bold">✓</span>
                  <span>Garantía de <span className="font-semibold">90 días</span> en todas las reparaciones</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-green-500 font-bold">✓</span>
                  <span>Piezas originales y de alta calidad</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-green-500 font-bold">✓</span>
                  <span>Técnicos certificados y especializados</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-green-500 font-bold">✓</span>
                  <span>Presupuesto gratuito sin compromiso</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-green-500 font-bold">✓</span>
                  <span>Servicio de recogida y entrega a domicilio</span>
                </div>
              </div>
            </div>
          </div>
          <div className="h-full">
            <SectionImage 
              src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
              alt="Garantía y calidad en reparaciones"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
