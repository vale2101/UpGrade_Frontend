import SectionTitle from "../atoms/SectionTitle";
import SectionDescription from "../atoms/SectionDescription";

interface InfoCardProps {
  title: string;
  description: string;
  className?: string;
}

export default function InfoCard({ title, description, className = "" }: InfoCardProps) {
  return (
    <div className={`group relative bg-gradient-to-br from-white to-gray-50 p-4 sm:p-6 lg:p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-200 overflow-hidden h-full flex flex-col ${className}`}>
      {/* Efecto de fondo animado */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#57ad63]/0 via-[#57ad63]/0 to-[#57ad63]/0 group-hover:from-[#57ad63]/5 group-hover:via-[#57ad63]/3 group-hover:to-transparent transition-all duration-500"></div>
      
      {/* Patrón decorativo */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-[#57ad63]/5 rounded-full blur-3xl transform translate-x-8 -translate-y-8 group-hover:scale-150 transition-transform duration-500"></div>
      
      <div className="relative z-10 flex flex-col flex-1">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-1 h-8 bg-gradient-to-b from-[#57ad63] to-[#57ad63]/50 rounded-full group-hover:h-12 transition-all duration-300"></div>
          <SectionTitle className="text-xl sm:text-2xl group-hover:text-[#57ad63] transition-colors duration-300">{title}</SectionTitle>
        </div>
        <SectionDescription className="leading-relaxed flex-1">{description}</SectionDescription>
      </div>
    </div>
  );
}
