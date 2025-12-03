import { renderIcon } from "../../utils/iconMapper";

interface FeatureCardProps {
  title: string;
  description: string;
  icon?: React.ReactNode | string;
  className?: string;
}

export default function FeatureCard({ title, description, icon, className = "" }: FeatureCardProps) {
  const renderIconComponent = () => {
    if (!icon) return null;
    
    if (typeof icon !== 'string') {
      return (
        <div className="mb-3 sm:mb-4 transform group-hover:scale-110 transition-transform duration-300 text-[#57ad63]">
          {icon}
        </div>
      );
    }
    
    const iconComponent = renderIcon(icon, 40, "text-[#57ad63]");
    if (!iconComponent) return null;
    
    return (
      <div className="mb-3 sm:mb-4 transform group-hover:scale-110 transition-transform duration-300 flex items-center justify-start">
        {iconComponent}
      </div>
    );
  };

  return (
    <div className={`group bg-white p-4 sm:p-6 rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 hover:border-[#57ad63] relative overflow-hidden h-full flex flex-col ${className}`}>
      <div className="absolute inset-0 bg-gradient-to-br from-[#57ad63]/0 to-[#57ad63]/0 group-hover:from-[#57ad63]/5 group-hover:to-transparent transition-all duration-300"></div>
      
      <div className="relative z-10 flex flex-col flex-1">
        {renderIconComponent()}
        <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-2 group-hover:text-[#57ad63] transition-colors duration-300">
          {title}
        </h3>
        <p className="text-sm sm:text-base text-gray-600 leading-relaxed flex-1">{description}</p>
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#57ad63] via-[#57ad63]/50 to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
    </div>
  );
}
