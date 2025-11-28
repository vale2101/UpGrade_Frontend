interface StatCardProps {
  value: string;
  label: string;
  icon?: React.ReactNode;
  trend?: "up" | "down";
  className?: string;
}

export default function StatCard({ 
  value, 
  label, 
  icon,
  trend,
  className = "" 
}: StatCardProps) {
  return (
    <div className={`
      group relative bg-gradient-to-br from-white to-gray-50 
      p-6 sm:p-8 rounded-xl shadow-lg hover:shadow-2xl 
      transition-all duration-300 transform hover:-translate-y-2 
      border border-gray-200 overflow-hidden
      ${className}
    `}>
      {/* Efecto de brillo */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#57ad63]/0 via-[#57ad63]/5 to-[#57ad63]/0 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
      
      <div className="relative z-10">
        {icon && (
          <div className="mb-4 text-[#57ad63] transform group-hover:scale-110 transition-transform duration-300">
            {icon}
          </div>
        )}
        
        <div className="flex items-baseline gap-2 mb-2">
          <h3 className="text-3xl sm:text-4xl font-bold text-gray-900">{value}</h3>
          {trend && (
            <span className={`text-sm font-semibold ${trend === "up" ? "text-green-500" : "text-red-500"}`}>
              {trend === "up" ? "↑" : "↓"}
            </span>
          )}
        </div>
        
        <p className="text-sm sm:text-base text-gray-600">{label}</p>
      </div>
    </div>
  );
}

