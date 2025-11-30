"use client";

interface UserOrderStatusBadgeProps {
  estado: 'Pendiente' | 'Pagado' | 'Enviado' | 'Entregado' | 'Cancelado';
  className?: string;
}

export default function UserOrderStatusBadge({ estado, className = "" }: UserOrderStatusBadgeProps) {
  const getStatusConfig = (estado: string) => {
    switch (estado) {
      case 'Pendiente':
        return { bg: 'bg-yellow-100', text: 'text-yellow-800', label: 'Pendiente' };
      case 'Pagado':
        return { bg: 'bg-blue-100', text: 'text-blue-800', label: 'Pagado' };
      case 'Enviado':
        return { bg: 'bg-purple-100', text: 'text-purple-800', label: 'Enviado' };
      case 'Entregado':
        return { bg: 'bg-green-100', text: 'text-green-800', label: 'Entregado' };
      case 'Cancelado':
        return { bg: 'bg-red-100', text: 'text-red-800', label: 'Cancelado' };
      default:
        return { bg: 'bg-gray-100', text: 'text-gray-800', label: estado };
    }
  };

  const config = getStatusConfig(estado);

  return (
    <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${config.bg} ${config.text} ${className}`}>
      {config.label}
    </span>
  );
}

