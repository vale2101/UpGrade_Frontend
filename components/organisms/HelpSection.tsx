import SectionTitle from "../atoms/SectionTitle";
import SectionDescription from "../atoms/SectionDescription";
import FeatureCard from "../atoms/FeatureCard";
import ContactForm from "../molecules/ContactForm";
import HeroImage from "../atoms/HeroImage";
import SectionImage from "../atoms/SectionImage";
import { getHelpServices, getContactInfo } from "../../db/data";

export default function HelpSection() {
  const helpServices = getHelpServices();
  const contactInfo = getContactInfo();

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <SectionTitle>Te Ayudamos</SectionTitle>
          <SectionDescription className="max-w-3xl mx-auto">
            Estamos aquí para ayudarte con cualquier necesidad tecnológica. Nuestro equipo de expertos 
            está listo para brindarte el mejor servicio y soporte.
          </SectionDescription>
        </div>

        <div className="mb-12">
          <HeroImage 
            src="https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
            alt="Equipo de soporte técnico ayudando a clientes"
          />
        </div>

        <div className="mb-12">
          <SectionTitle className="text-center mb-8">Nuestros Servicios de Ayuda</SectionTitle>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {helpServices.map((service, index) => (
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
          <SectionTitle className="text-center mb-8">Contáctanos</SectionTitle>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactInfo.map((contact, index) => (
              <FeatureCard
                key={index}
                title={contact.title}
                description={contact.description}
                icon={contact.icon}
                className="text-center"
              />
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <div className="bg-blue-50 p-8 rounded-lg">
            <SectionTitle className="text-blue-800 mb-4">¿Necesitas Ayuda Inmediata?</SectionTitle>
            <SectionDescription className="text-blue-700">
              Si tienes una emergencia tecnológica, no dudes en contactarnos. Nuestro equipo de soporte 
              está disponible 24/7 para resolver problemas críticos. Llama al +1 (555) 123-4567 o 
              envía un WhatsApp al +1 (555) 987-6543.
            </SectionDescription>
          </div>
          <div>
            <SectionImage 
              src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
              alt="Soporte técnico 24/7"
            />
          </div>
        </div>

        <div>
          <ContactForm />
        </div>
      </div>
    </div>
  );
}
