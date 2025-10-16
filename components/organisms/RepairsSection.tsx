import SectionTitle from "../atoms/SectionTitle";
import SectionDescription from "../atoms/SectionDescription";
import FeatureCard from "../atoms/FeatureCard";
import HeroImage from "../atoms/HeroImage";
import SectionImage from "../atoms/SectionImage";
import { getRepairServices, getRepairProcess } from "../../contexts/DataContext";

export default function RepairsSection() {
  const repairServices = getRepairServices();
  const repairProcess = getRepairProcess();

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <SectionTitle>Reparaciones</SectionTitle>
          <SectionDescription className="max-w-3xl mx-auto">
            Reparamos todo tipo de dispositivos tecnológicos con la más alta calidad y garantía. 
            Nuestros técnicos especializados utilizan piezas originales y las mejores herramientas.
          </SectionDescription>
        </div>

        <div className="mb-12">
          <HeroImage 
            src="https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?ixlib=rb-4.0.3&auto=format&fit=crop&w=2069&q=80"
            alt="Técnico reparando dispositivos electrónicos"
          />
        </div>

        <div className="mb-12">
          <SectionTitle className="text-center mb-8">Dispositivos que Reparamos</SectionTitle>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {repairServices.map((service, index) => (
              <FeatureCard
                key={index}
                title={service.title}
                description={service.description}
                icon={service.icon}
              />
            ))}
          </div>
        </div>

        <div className="mb-12">
          <SectionTitle className="text-center mb-8">Tu Reparación Está En</SectionTitle>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {repairProcess.map((step, index) => (
              <FeatureCard
                key={index}
                title={step.title}
                description={step.description}
                icon={step.icon}
                className="text-center"
              />
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-orange-50 p-8 rounded-lg">
            <SectionTitle className="text-orange-800 mb-4">Garantía y Calidad</SectionTitle>
            <SectionDescription className="text-orange-700">
              • Garantía de 90 días en todas las reparaciones<br/>
              • Piezas originales y de alta calidad<br/>
              • Técnicos certificados y especializados<br/>
              • Presupuesto gratuito sin compromiso<br/>
              • Servicio de recogida y entrega a domicilio
            </SectionDescription>
          </div>
          <div>
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
