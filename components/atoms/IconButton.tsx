import { ReactNode } from "react";

interface IconButtonProps {
  children: ReactNode;
}

export default function IconButton({ children }: IconButtonProps) {
  return (
    <button className="text-white hover:text-brand p-2">
      {children}
    </button>
  );
}
