import SectionTitle from "../atoms/SectionTitle";
import SectionDescription from "../atoms/SectionDescription";

interface InfoCardProps {
  title: string;
  description: string;
  className?: string;
}

export default function InfoCard({ title, description, className = "" }: InfoCardProps) {
  return (
    <div className={`bg-white p-8 rounded-lg shadow-md ${className}`}>
      <SectionTitle className="text-2xl mb-4">{title}</SectionTitle>
      <SectionDescription>{description}</SectionDescription>
    </div>
  );
}
