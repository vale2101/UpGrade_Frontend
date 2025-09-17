import { ReactNode } from "react";
import Link from "next/link";

interface NavLinkProps {
  href: string;
  children: ReactNode;
  highlight?: boolean;
  mobile?: boolean;
}

export default function NavLink({ href, children, highlight, mobile = false }: NavLinkProps) {
  if (mobile) {
    return (
      <Link
        href={href}
        className={`block py-3 px-4 text-lg font-medium rounded-lg transition-colors ${
          highlight
            ? "bg-black text-white"
            : "text-gray-700 hover:bg-gray-100"
        }`}
      >
        {children}
      </Link>
    );
  }

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
