import SectionTitle from "../atoms/SectionTitle";
import SectionDescription from "../atoms/SectionDescription";
import FeatureCard from "../atoms/FeatureCard";
import HeroImage from "../atoms/HeroImage";
import SectionImage from "../atoms/SectionImage";
import { getPaymentMethods } from "../../contexts/DataContext";

export default function PaymentMethodsSection() {
  const paymentMethods = getPaymentMethods();

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <SectionTitle>Métodos de Pago</SectionTitle>
          <SectionDescription className="max-w-3xl mx-auto">
            Ofrecemos múltiples opciones de pago para que elijas la que más te convenga. 
            Todas nuestras transacciones son seguras y están protegidas.
          </SectionDescription>
        </div>


        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {paymentMethods.map((method, index) => (
            <FeatureCard
              key={index}
              title={method.title}
              description={method.description}
              icon={method.icon}
            />
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-blue-50 p-8 rounded-lg">
            <SectionTitle className="text-blue-800 mb-4">Información Importante</SectionTitle>
            <SectionDescription className="text-blue-700">
              • Todas las transacciones están protegidas con encriptación SSL de 256 bits<br/>
              • No almacenamos información de tarjetas de crédito<br/>
              • Procesamos pagos de forma segura y rápida<br/>
              • Para consultas sobre métodos de pago, contáctanos al +1 (555) 123-4567
            </SectionDescription>
          </div>
          <div>
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
