interface UpdatingIndicatorProps {
  message?: string;
}

export default function UpdatingIndicator({ message = "Actualizando..." }: UpdatingIndicatorProps) {
  return (
    <div className="text-gray-400">
      {message}
    </div>
  );
}

