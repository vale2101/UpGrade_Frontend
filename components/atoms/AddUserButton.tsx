import { UserPlus } from "lucide-react";
import Button from "./Button";

interface AddUserButtonProps {
  onClick: () => void;
  disabled?: boolean;
  className?: string;
}

export default function AddUserButton({ 
  onClick, 
  disabled = false,
  className = "" 
}: AddUserButtonProps) {
  return (
    <Button
      onClick={onClick}
      variant="outline"
      size="sm"
      disabled={disabled}
      className={`flex items-center gap-2 ${className}`}
    >
      <UserPlus size={16} />
      <span>Añadir Usuario</span>
    </Button>
  );
}

