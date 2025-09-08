import SectionTitle from "../atoms/SectionTitle";
import SectionDescription from "../atoms/SectionDescription";
import FeatureCard from "../atoms/FeatureCard";

export default function PromotionsSection() {
  const promotions = [
    {
      title: "Descuento del 20%",
      description: "En reparaciones de laptops y computadoras de escritorio. Válido hasta el 31 de diciembre.",
      icon: "💻"
    },
    {
      title: "2x1 en Accesorios",
      description: "Compra cualquier accesorio y lleva otro igual gratis. Aplican términos y condiciones.",
      icon: "🎁"
    },
    {
      title: "Garantía Extendida",
      description: "Obtén 6 meses adicionales de garantía en todas las reparaciones. Sin costo extra.",
      icon: "🛡️"
    },
    {
      title: "Servicio a Domicilio",
      description: "Reparación a domicilio sin costo adicional en compras superiores a $200.",
      icon: "🚚"
    },
    {
      title: "Estudiantes",
      description: "15% de descuento presentando carnet estudiantil. Válido todo el año.",
      icon: "🎓"
    },
    {
      title: "Primera Vez",
      description: "10% de descuento en tu primera compra. Regístrate y obtén tu código.",
      icon: "✨"
    }
  ];

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
