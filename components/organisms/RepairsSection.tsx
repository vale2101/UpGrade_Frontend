import SectionTitle from "../atoms/SectionTitle";
import SectionDescription from "../atoms/SectionDescription";
import FeatureCard from "../atoms/FeatureCard";
import HeroImage from "../atoms/HeroImage";
import SectionImage from "../atoms/SectionImage";

export default function RepairsSection() {
  const repairServices = [
    {
      title: "Laptops",
      description: "Reparación de pantallas, teclados, baterías, puertos USB y problemas de software.",
      icon: "💻"
    },
    {
      title: "Smartphones",
      description: "Cambio de pantallas, baterías, módulos de cámara y reparación de software.",
      icon: "📱"
    },
    {
      title: "Tablets",
      description: "Reparación de pantallas táctiles, conectores de carga y problemas de rendimiento.",
      icon: "📱"
    },
    {
      title: "PCs de Escritorio",
      description: "Reparación de motherboards, fuentes de poder, discos duros y tarjetas gráficas.",
      icon: "🖥️"
    },
    {
      title: "Consolas de Videojuegos",
      description: "Reparación de PlayStation, Xbox, Nintendo Switch y accesorios gaming.",
      icon: "🎮"
    },
    {
      title: "Impresoras",
      description: "Mantenimiento, reparación de cabezales, alimentadores y problemas de conectividad.",
      icon: "🖨️"
    }
  ];

  const repairProcess = [
    {
      title: "Recibido",
      description: "Tu dispositivo ha sido recibido y registrado en nuestro sistema.",
      icon: "📥"
    },
    {
      title: "Revisión",
      description: "Nuestros técnicos están evaluando el problema y preparando el presupuesto.",
      icon: "🔍"
    },
    {
      title: "Reparación",
      description: "Realizamos la reparación con piezas originales y técnicas especializadas.",
      icon: "🔧"
    },
    {
      title: "Reparado",
      description: "Tu dispositivo está listo y ha pasado todas las pruebas de calidad.",
      icon: "✅"
    }
  ];

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
            src="https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80"
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
              src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
              alt="Garantía y calidad en reparaciones"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
