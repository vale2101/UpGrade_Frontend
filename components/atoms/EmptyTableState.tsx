interface EmptyTableStateProps {
  message?: string;
}

export default function EmptyTableState({ message = "No hay productos registrados" }: EmptyTableStateProps) {
  return (
    <div className="text-center py-12 text-gray-500">
      {message}
    </div>
  );
}

