import Image from "next/image";
import ProductHighlight from "../molecules/ProductHighlight";

export default function HeroBanner() {
  return (
    <section className="relative w-full h-[300px] sm:h-[400px] lg:h-[450px] bg-pink-700 flex items-center justify-center">
      {/* Fondo */}
      <Image
        src="https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=2074&q=80"
        alt="Banner background"
        fill
        className="object-cover opacity-60"
      />

      {/* Contenido */}
      <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between w-full px-4 sm:px-8 lg:px-12 gap-6 sm:gap-8 lg:gap-16">
        {/* Texto izq */}
        <div className="text-white font-bold text-xl sm:text-2xl md:text-3xl lg:text-4xl max-w-xs sm:max-w-lg lg:max-w-sm leading-tight text-center lg:text-left">
          PARA STALKEAR <br />
          <span className="text-yellow-400">SIN MIEDO NECESITAS EL</span>
        </div>

        {/* TODO: Caja de precio - Debe mostrar producto destacado desde la base de datos */}
        {/* <div className="w-full max-w-xs sm:max-w-sm lg:max-w-none">
          <ProductHighlight
            title="Samsung Galaxy S23 Plus"
            subtitle="512 GB - OUTLET"
            price="$2.299.900"
            cuotas="6 cuotas $383.317"
          />
        </div> */}
      </div>
    </section>
  );
}
