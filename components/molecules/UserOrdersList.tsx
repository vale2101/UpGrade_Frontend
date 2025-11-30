"use client";
import { PedidoInterface } from "../../interfaces/pedido.interface";
import UserOrderCard from "./UserOrderCard";

interface UserOrdersListProps {
  pedidos: PedidoInterface[];
  className?: string;
}

export default function UserOrdersList({ pedidos, className = "" }: UserOrdersListProps) {
  if (pedidos.length === 0) {
    return null;
  }

  return (
    <div className={`space-y-4 ${className}`}>
      {pedidos.map((pedido) => (
        <UserOrderCard key={pedido.id_pedido} pedido={pedido} />
      ))}
    </div>
  );
}

