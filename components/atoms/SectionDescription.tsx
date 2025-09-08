interface SectionDescriptionProps {
  children: React.ReactNode;
  className?: string;
}

export default function SectionDescription({ children, className = "" }: SectionDescriptionProps) {
  return (
    <p className={`text-gray-600 leading-relaxed mb-4 ${className}`}>
      {children}
    </p>
  );
}
