import Link from "next/link";

interface FormLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

export default function FormLink({ href, children, className = "" }: FormLinkProps) {
  // Si el href es "#", usar <a> en lugar de Link
  if (href === "#") {
    return (
      <a 
        href="#" 
        className={`text-[#57ad63] hover:text-[#459a52] font-medium ${className}`}
      >
        {children}
      </a>
    );
  }

  return (
    <Link 
      href={href} 
      className={`text-[#57ad63] hover:text-[#459a52] font-medium ${className}`}
    >
      {children}
    </Link>
  );
}

