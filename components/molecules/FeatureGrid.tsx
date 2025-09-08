import FeatureCard from "../atoms/FeatureCard";

interface Feature {
  title: string;
  description: string;
  icon?: React.ReactNode;
}

interface FeatureGridProps {
  features: Feature[];
  className?: string;
}

export default function FeatureGrid({ features, className = "" }: FeatureGridProps) {
  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ${className}`}>
      {features.map((feature, index) => (
        <FeatureCard
          key={index}
          title={feature.title}
          description={feature.description}
          icon={feature.icon}
        />
      ))}
    </div>
  );
}
