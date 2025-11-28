import SectionTitle from "../atoms/SectionTitle";
import SectionDescription from "../atoms/SectionDescription";
import FeatureCard from "../atoms/FeatureCard";
import { getPromotions } from "../../contexts/DataContext";

export default function PromotionsSection() {
  const promotions = getPromotions();

  return (
    <div className="min-h-screen bg-gray-50 py-6 sm:py-8 md:py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-6 sm:mb-8 md:mb-12">
          <SectionTitle>Promociones</SectionTitle>
          <SectionDescription className="max-w-3xl mx-auto text-sm sm:text-base">
            ¡Aprovecha nuestras increíbles ofertas! Tenemos promociones especiales para que ahorres 
            en reparaciones, accesorios y servicios. No dejes pasar estas oportunidades.
          </SectionDescription>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8 md:mb-12 items-stretch">
          {promotions.map((promotion, index) => (
            <FeatureCard
              key={index}
              title={promotion.title}
              description={promotion.description}
              icon={promotion.icon}
              className="border-2 border-green-200 hover:border-green-400"
            />
          ))}
        </div>

        <div className="bg-green-50 p-4 sm:p-6 md:p-8 rounded-lg">
          <SectionTitle className="text-green-800 mb-3 sm:mb-4 text-lg sm:text-xl md:text-2xl">¡Oferta Especial!</SectionTitle>
          <SectionDescription className="text-green-700 text-sm sm:text-base">
            <strong>Black Friday Tech:</strong> Hasta 50% de descuento en todos nuestros servicios 
            y productos. Solo del 24 al 30 de noviembre. ¡No te lo pierdas!
          </SectionDescription>
        </div>
      </div>
    </div>
  );
}
