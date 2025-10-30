interface FormLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

export default function FormLink({ href, children, className = "" }: FormLinkProps) {
  return (
    <a 
      href={href} 
      className={`text-[#57ad63] hover:text-[#459a52] font-medium ${className}`}
    >
      {children}
    </a>
  );
}

