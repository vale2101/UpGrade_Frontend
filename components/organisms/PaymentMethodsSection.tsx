import SectionTitle from "../atoms/SectionTitle";
import SectionDescription from "../atoms/SectionDescription";
import FeatureCard from "../atoms/FeatureCard";
import HeroImage from "../atoms/HeroImage";
import SectionImage from "../atoms/SectionImage";
import Carousel from "../molecules/Carousel";
import AnimatedBadge from "../atoms/AnimatedBadge";
import { getPaymentMethods } from "../../contexts/DataContext";

export default function PaymentMethodsSection() {
  const paymentMethods = getPaymentMethods();

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50/30 via-white to-gray-50 py-6 sm:py-8 md:py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-6 sm:mb-8 md:mb-12 animate-fade-in">
          <div className="inline-block mb-4">
            <div className="w-20 h-1 bg-gradient-to-r from-transparent via-green-500 to-transparent mx-auto"></div>
          </div>
          <SectionTitle className="bg-gradient-to-r from-green-600 via-green-700 to-green-600 bg-clip-text text-transparent">
            Métodos de Pago
          </SectionTitle>
          <SectionDescription className="max-w-3xl mx-auto text-sm sm:text-base mt-4">
            Ofrecemos múltiples opciones de pago para que elijas la que más te convenga. 
            Todas nuestras transacciones son seguras y están protegidas.
          </SectionDescription>
        </div>


        <div className="mb-6 sm:mb-8 md:mb-12">
          <div className="text-center mb-4 flex justify-center gap-2 flex-wrap">
            <AnimatedBadge variant="success">SSL 256 bits</AnimatedBadge>
            <AnimatedBadge variant="info">Pago Seguro</AnimatedBadge>
            <AnimatedBadge variant="primary">Sin Comisiones</AnimatedBadge>
          </div>
          
          {/* Carrusel en móvil, grid en desktop */}
          <div className="block lg:hidden">
            <Carousel
              items={paymentMethods.map((method, index) => (
                <div key={index} className="px-2 h-full">
                  <FeatureCard
                    title={method.title}
                    description={method.description}
                    icon={method.icon}
                  />
                </div>
              ))}
              autoPlay={true}
              autoPlayInterval={4000}
            />
          </div>
          
          <div className="hidden lg:grid grid-cols-3 gap-4 sm:gap-6 items-stretch">
            {paymentMethods.map((method, index) => (
              <div 
                key={index}
                className="animate-fade-in-up h-full"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <FeatureCard
                  title={method.title}
                  description={method.description}
                  icon={method.icon}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 md:gap-8 items-stretch">
          <div className="group relative bg-gradient-to-br from-green-50 via-green-100/50 to-green-50 p-4 sm:p-6 md:p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-green-200 overflow-hidden h-full flex flex-col">
            {/* Efecto de brillo animado */}
            <div className="absolute inset-0 bg-gradient-to-r from-green-400/0 via-green-400/10 to-green-400/0 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
            
            {/* Icono de seguridad flotante */}
            <div className="absolute top-4 right-4 opacity-20 group-hover:opacity-30 transition-opacity">
              <svg className="w-16 h-16 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
              </svg>
            </div>
            
            <div className="relative z-10 flex flex-col flex-1">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <SectionTitle className="text-green-800 mb-3 sm:mb-4 text-lg sm:text-xl md:text-2xl group-hover:text-green-900 transition-colors">
                  Información Importante
                </SectionTitle>
              </div>
              <div className="text-green-700 text-sm sm:text-base space-y-2 flex-1">
                <div className="flex items-start gap-2">
                  <span className="text-green-500 font-bold">🔒</span>
                  <span>Todas las transacciones están protegidas con <span className="font-semibold">encriptación SSL de 256 bits</span></span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-green-500 font-bold">🛡️</span>
                  <span>No almacenamos información de tarjetas de crédito</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-green-500 font-bold">⚡</span>
                  <span>Procesamos pagos de forma segura y rápida</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-green-500 font-bold">📞</span>
                  <span>Para consultas sobre métodos de pago, contáctanos al <span className="font-semibold">+1 (555) 123-4567</span></span>
                </div>
              </div>
            </div>
          </div>
          <div className="h-full">
            <SectionImage 
              src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
              alt="Seguridad en pagos digitales"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
