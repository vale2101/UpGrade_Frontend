import { ReactNode } from "react";
import Link from "next/link";

interface NavLinkProps {
  href: string;
  children: ReactNode;
  highlight?: boolean;
}

export default function NavLink({ href, children, highlight }: NavLinkProps) {
  return (
    <Link
      href={href}
      className={`px-3 text-sm ${
        highlight
          ? "bg-brand text-white rounded-full font-semibold"
          : "text-white hover:text-brand"
      }`}
    >
      {children}
    </Link>
  );
}
