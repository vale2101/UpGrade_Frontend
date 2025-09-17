interface ProductTitleProps {
  children: React.ReactNode;
  className?: string;
}

export default function ProductTitle({ children, className = "" }: ProductTitleProps) {
  return (
    <h3 className={`text-base sm:text-lg font-semibold text-gray-800 mb-2 line-clamp-2 ${className}`}>
      {children}
    </h3>
  );
}
