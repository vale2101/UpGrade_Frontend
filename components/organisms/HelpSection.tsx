import SectionTitle from "../atoms/SectionTitle";
import SectionDescription from "../atoms/SectionDescription";
import FeatureCard from "../atoms/FeatureCard";
import ContactForm from "../molecules/ContactForm";
import HeroImage from "../atoms/HeroImage";
import SectionImage from "../atoms/SectionImage";
import Carousel from "../molecules/Carousel";
import TestimonialCard from "../molecules/TestimonialCard";
import { getHelpServices, getContactInfo } from "../../contexts/DataContext";

export default function HelpSection() {
  const helpServices = getHelpServices();
  const contactInfo = getContactInfo();

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50/30 via-white to-gray-50 py-6 sm:py-8 md:py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-6 sm:mb-8 md:mb-12 animate-fade-in">
          <div className="inline-block mb-4">
            <div className="w-20 h-1 bg-gradient-to-r from-transparent via-green-500 to-transparent mx-auto"></div>
          </div>
          <SectionTitle className="bg-gradient-to-r from-green-600 via-green-700 to-green-600 bg-clip-text text-transparent">
            Te Ayudamos
          </SectionTitle>
          <SectionDescription className="max-w-3xl mx-auto text-sm sm:text-base mt-4">
            Estamos aquí para ayudarte con cualquier necesidad tecnológica. Nuestro equipo de expertos 
            está listo para brindarte el mejor servicio y soporte.
          </SectionDescription>
        </div>

    

        <div className="mb-6 sm:mb-8 md:mb-12">
          <div className="text-center mb-4 sm:mb-6 md:mb-8">
            <SectionTitle className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent">
              Nuestros Servicios de Ayuda
            </SectionTitle>
            <div className="w-24 h-1 bg-gradient-to-r from-transparent via-green-500 to-transparent mx-auto mt-3"></div>
          </div>
          
          {/* Carrusel en móvil, grid en desktop */}
          <div className="block lg:hidden">
            <Carousel
              items={helpServices.map((service, index) => (
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
            {helpServices.map((service, index) => (
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
              Contáctanos
            </SectionTitle>
            <div className="w-24 h-1 bg-gradient-to-r from-transparent via-green-500 to-transparent mx-auto mt-3"></div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 items-stretch">
            {contactInfo.map((contact, index) => (
              <div 
                key={index}
                className="animate-fade-in-up h-full"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <FeatureCard
                  title={contact.title}
                  description={contact.description}
                  icon={contact.icon}
                  className="text-center"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 md:gap-8 mb-6 sm:mb-8 md:mb-12 items-stretch">
          <div className="group relative bg-gradient-to-br from-green-50 via-green-100/50 to-green-50 p-4 sm:p-6 md:p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-green-200 overflow-hidden h-full flex flex-col">
            {/* Efecto de brillo animado */}
            <div className="absolute inset-0 bg-gradient-to-r from-green-400/0 via-green-400/10 to-green-400/0 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
            
            <div className="relative z-10 flex flex-col flex-1">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <SectionTitle className="text-green-800 mb-3 sm:mb-4 text-lg sm:text-xl md:text-2xl group-hover:text-green-900 transition-colors">
                  ¿Necesitas Ayuda Inmediata?
                </SectionTitle>
              </div>
              <div className="text-green-700 text-sm sm:text-base leading-relaxed flex-1">
                Si tienes una emergencia tecnológica, no dudes en contactarnos. Nuestro equipo de soporte 
                está disponible <span className="font-bold">24/7</span> para resolver problemas críticos. 
                <br className="hidden sm:block" />
                <span className="block mt-2">
                  📞 Llama al <span className="font-semibold">+1 (555) 123-4567</span>
                </span>
                <span className="block">
                  💬 Envía un WhatsApp al <span className="font-semibold">+1 (555) 987-6543</span>
                </span>
              </div>
            </div>
          </div>
          <div className="h-full">
            <SectionImage 
              src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
              alt="Soporte técnico 24/7"
            />
          </div>
        </div>

        {/* Testimonios */}
        <div className="mb-6 sm:mb-8 md:mb-12">
          <div className="text-center mb-4 sm:mb-6 md:mb-8">
            <SectionTitle className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent">
              Lo que dicen nuestros clientes
            </SectionTitle>
            <div className="w-24 h-1 bg-gradient-to-r from-transparent via-green-500 to-transparent mx-auto mt-3"></div>
          </div>
          
          <Carousel
            items={[
              <TestimonialCard
                key="1"
                name="María González"
                role="Cliente desde 2022"
                content="Excelente servicio de reparación. Mi teléfono quedó como nuevo y el proceso fue muy rápido. Definitivamente recomiendo UpGrade."
                rating={5}
              />,
              <TestimonialCard
                key="2"
                name="Carlos Ramírez"
                role="Cliente desde 2023"
                content="El mejor servicio técnico que he encontrado. Profesionales, puntuales y con precios justos. Muy satisfecho con el trabajo realizado."
                rating={5}
              />,
              <TestimonialCard
                key="3"
                name="Ana Martínez"
                role="Cliente desde 2021"
                content="Compré un iPhone reacondicionado y está perfecto. La calidad es excelente y el precio muy competitivo. Volveré a comprar."
                rating={5}
              />
            ]}
            autoPlay={true}
            autoPlayInterval={5000}
            className="max-w-4xl mx-auto"
          />
        </div>

        <div>
          <ContactForm />
        </div>
      </div>
    </div>
  );
}
