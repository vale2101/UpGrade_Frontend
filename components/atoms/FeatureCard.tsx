interface FeatureCardProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
  className?: string;
}

export default function FeatureCard({ title, description, icon, className = "" }: FeatureCardProps) {
  return (
    <div className={`bg-white p-4 sm:p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow ${className}`}>
      {icon && <div className="mb-3 sm:mb-4">{icon}</div>}
      <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2">{title}</h3>
      <p className="text-sm sm:text-base text-gray-600">{description}</p>
    </div>
  );
}
