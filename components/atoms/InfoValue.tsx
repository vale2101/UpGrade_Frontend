interface InfoValueProps {
  children: React.ReactNode;
  className?: string;
}

export default function InfoValue({ children, className = "" }: InfoValueProps) {
  return (
    <span className={`text-sm sm:text-base text-gray-900 ${className}`}>
      {children}
    </span>
  );
}

