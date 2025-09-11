import SectionTitle from "../atoms/SectionTitle";
import SectionDescription from "../atoms/SectionDescription";
import FeatureCard from "../atoms/FeatureCard";
import { getPromotions } from "../../db/data";

export default function PromotionsSection() {
  const promotions = getPromotions();

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <SectionTitle>Promociones</SectionTitle>
          <SectionDescription className="max-w-3xl mx-auto">
            ¡Aprovecha nuestras increíbles ofertas! Tenemos promociones especiales para que ahorres 
            en reparaciones, accesorios y servicios. No dejes pasar estas oportunidades.
          </SectionDescription>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
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

        <div className="bg-green-50 p-8 rounded-lg">
          <SectionTitle className="text-green-800 mb-4">¡Oferta Especial!</SectionTitle>
          <SectionDescription className="text-green-700">
            <strong>Black Friday Tech:</strong> Hasta 50% de descuento en todos nuestros servicios 
            y productos. Solo del 24 al 30 de noviembre. ¡No te lo pierdas!
          </SectionDescription>
        </div>
      </div>
    </div>
  );
}
