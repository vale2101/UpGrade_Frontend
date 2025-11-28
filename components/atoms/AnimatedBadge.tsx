interface AnimatedBadgeProps {
  children: React.ReactNode;
  variant?: "primary" | "success" | "warning" | "info";
  className?: string;
}

export default function AnimatedBadge({ 
  children, 
  variant = "primary",
  className = "" 
}: AnimatedBadgeProps) {
  const variantClasses = {
    primary: "bg-[#57ad63] text-white",
    success: "bg-green-500 text-white",
    warning: "bg-yellow-500 text-white",
    info: "bg-blue-500 text-white"
  };

  return (
    <span 
      className={`
        inline-flex items-center px-3 py-1 rounded-full text-xs sm:text-sm font-semibold
        ${variantClasses[variant]}
        animate-pulse
        shadow-lg hover:shadow-xl
        transition-all duration-300
        transform hover:scale-110
        ${className}
      `}
    >
      {children}
    </span>
  );
}

