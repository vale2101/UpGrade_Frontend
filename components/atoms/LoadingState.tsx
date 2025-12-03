interface LoadingStateProps {
  message?: string;
}

export default function LoadingState({ message = "Cargando..." }: LoadingStateProps) {
  return (
    <div className="text-center py-12 text-gray-500">
      {message}
    </div>
  );
}

