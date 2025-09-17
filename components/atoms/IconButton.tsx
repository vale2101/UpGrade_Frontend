import { ReactNode } from "react";

interface IconButtonProps {
  children: ReactNode;
}

export default function IconButton({ children }: IconButtonProps) {
  return (
    <button className="text-white hover:text-brand p-1.5 sm:p-2 rounded-md hover:bg-gray-800 transition-colors">
      {children}
    </button>
  );
}
