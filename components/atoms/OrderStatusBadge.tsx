import { VendedorOrder } from "../../hooks/useVendedorOrders";

interface OrderStatusBadgeProps {
  status: VendedorOrder["status"];
  label: string;
}

export default function OrderStatusBadge({ status, label }: OrderStatusBadgeProps) {
  const getStatusColor = () => {
    const colors = {
      pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
      processing: "bg-blue-100 text-blue-800 border-blue-200",
      shipped: "bg-purple-100 text-purple-800 border-purple-200",
      delivered: "bg-green-100 text-green-800 border-green-200",
      cancelled: "bg-red-100 text-red-800 border-red-200"
    };
    return colors[status];
  };

  return (
    <div className={`px-4 py-2 rounded-lg border font-medium text-sm ${getStatusColor()}`}>
      {label}
    </div>
  );
}


