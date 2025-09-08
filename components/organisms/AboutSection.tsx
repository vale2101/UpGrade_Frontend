import SectionTitle from "../atoms/SectionTitle";
import SectionDescription from "../atoms/SectionDescription";
import InfoCard from "../molecules/InfoCard";
import FeatureGrid from "../molecules/FeatureGrid";
import HeroImage from "../atoms/HeroImage";
import SectionImage from "../atoms/SectionImage";

export default function AboutSection() {
  const features = [
    {
      title: "Experiencia",
      description: "Más de 10 años en el mercado de reparación y venta de equipos tecnológicos.",
      icon: "🔧"
    },
    {
      title: "Calidad",
      description: "Garantizamos la mejor calidad en todos nuestros servicios y productos.",
      icon: "⭐"
    },
    {
      title: "Confianza",
      description: "Miles de clientes satisfechos respaldan nuestro trabajo.",
      icon: "🤝"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <SectionTitle>¿Quiénes somos?</SectionTitle>
          <SectionDescription className="max-w-3xl mx-auto">
            Somos una empresa especializada en la reparación y venta de equipos tecnológicos, 
            comprometidos con brindar soluciones de calidad y confianza a nuestros clientes.
          </SectionDescription>
        </div>

        <div className="mb-12">
          <HeroImage 
            src="https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1926&q=80"
            alt="Equipo de técnicos trabajando en reparaciones"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <div>
            <InfoCard
              title="Nuestra Misión"
              description="Proporcionar servicios de reparación y venta de equipos tecnológicos de la más alta calidad, 
              con un enfoque en la satisfacción del cliente y la innovación constante en nuestros procesos."
            />
          </div>
          <div>
            <SectionImage 
              src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80"
              alt="Técnico trabajando en reparación de dispositivo"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <div className="order-2 lg:order-1">
            <SectionImage 
              src="https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2025&q=80"
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
