import Image from "next/image";
import ProductHighlight from "../molecules/ProductHighlight";

export default function HeroBanner() {
  return (
    <section className="relative w-full h-[450px] bg-pink-700 flex items-center justify-center">
      {/* Fondo */}
      <Image
        src="https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=2074&q=80"
        alt="Banner background"
        fill
        className="object-cover opacity-60"
      />

      {/* Contenido */}
      <div className="relative z-10 flex items-center justify-between w-full px-12">
        {/* Texto izq */}
        <div className="text-white font-bold text-4xl max-w-lg leading-tight">
          PARA STALKEAR <br />
          <span className="text-yellow-400">SIN MIEDO NECESITAS EL</span>
        </div>

        {/* Caja de precio */}
        <ProductHighlight
          title="Samsung Galaxy S23 Plus"
          subtitle="512 GB - OUTLET"
          price="$2.299.900"
          cuotas="6 cuotas $383.317"
        />
      </div>
    </section>
  );
}
