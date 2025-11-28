import Image from "next/image";

export default function HeroBanner() {
  return (
    <section className="relative w-full h-[300px] sm:h-[400px] lg:h-[450px] bg-green-700 flex items-center justify-center">
      <Image
        src="https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=2074&q=80"
        alt="Banner background"
        fill
        className="object-cover opacity-60"
      />
  
      <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between w-full px-4 sm:px-8 lg:px-12 gap-6 sm:gap-8 lg:gap-16">
        <div className="text-white font-bold text-xl sm:text-2xl md:text-3xl lg:text-4xl max-w-xs sm:max-w-lg lg:max-w-sm leading-tight text-center lg:text-left">
          PARA STALKEAR <br />
          <span className="text-yellow-400">SIN MIEDO NECESITAS EL</span>
        </div>

      </div>
    </section>
  );
}

