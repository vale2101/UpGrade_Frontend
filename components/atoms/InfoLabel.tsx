interface InfoLabelProps {
  children: React.ReactNode;
  className?: string;
}

export default function InfoLabel({ children, className = "" }: InfoLabelProps) {
  return (
    <span className={`text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wide ${className}`}>
      {children}
    </span>
  );
}

