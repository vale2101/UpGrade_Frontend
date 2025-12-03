import { Plus } from "lucide-react";
import Button from "./Button";

interface CreateRepairButtonProps {
  onClick: () => void;
  disabled?: boolean;
}

export default function CreateRepairButton({ onClick, disabled = false }: CreateRepairButtonProps) {
  return (
    <Button
      onClick={onClick}
      variant="primary"
      disabled={disabled}
      className="flex items-center gap-2"
    >
      <Plus size={18} />
      <span>Crear Reparación</span>
    </Button>
  );
}

