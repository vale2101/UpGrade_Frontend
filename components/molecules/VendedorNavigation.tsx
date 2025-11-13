"use client";

import { Package, Wrench, ShoppingBag, Settings, BarChart, Users } from "lucide-react";
import RecursiveMenu, { MenuItem } from "./RecursiveMenu";

interface VendedorNavigationProps {
  mobile?: boolean;
}

/**
 * Ejemplo de uso del componente RecursiveMenu con estructura de menú anidado
 * Demuestra recursividad en múltiples niveles
 */
export default function VendedorNavigation({ mobile = false }: VendedorNavigationProps) {
  // Configuración del menú con estructura recursiva
  const menuItems: MenuItem[] = [
    {
      label: "Productos",
      icon: <Package size={16} />,
      href: "/vendedor/dashboard?tab=products",
      subItems: [
        { label: "Todos los Productos", href: "/vendedor/dashboard?tab=products" },
        { label: "Agregar Producto", href: "/vendedor/dashboard?tab=products&action=new" },
        {
          label: "Categorías",
          subItems: [
            { label: "iPhone", href: "/vendedor/dashboard?category=iphone" },
            { label: "Samsung", href: "/vendedor/dashboard?category=samsung" },
            { label: "iPad", href: "/vendedor/dashboard?category=ipad" },
          ]
        }
      ]
    },
    {
      label: "Pedidos",
      icon: <ShoppingBag size={16} />,
      href: "/vendedor/dashboard?tab=orders",
      subItems: [
        { label: "Pendientes", href: "/vendedor/dashboard?tab=orders&status=pending" },
        { label: "En Proceso", href: "/vendedor/dashboard?tab=orders&status=processing" },
        { label: "Enviados", href: "/vendedor/dashboard?tab=orders&status=shipped" },
        { label: "Entregados", href: "/vendedor/dashboard?tab=orders&status=delivered" },
      ]
    },
    {
      label: "Reparaciones",
      icon: <Wrench size={16} />,
      href: "/vendedor/dashboard?tab=repairs"
    },
    {
      label: "Configuración",
      icon: <Settings size={16} />,
      subItems: [
        { label: "Perfil", href: "/vendedor/settings/profile" },
        { label: "Notificaciones", href: "/vendedor/settings/notifications" },
        {
          label: "Avanzado",
          subItems: [
            { label: "API Keys", href: "/vendedor/settings/api" },
            { label: "Webhooks", href: "/vendedor/settings/webhooks" },
          ]
        }
      ]
    },
    {
      label: "Estadísticas",
      icon: <BarChart size={16} />,
      href: "/vendedor/stats"
    },
    {
      label: "Clientes",
      icon: <Users size={16} />,
      href: "/vendedor/customers"
    },
  ];

  return <RecursiveMenu items={menuItems} mobile={mobile} />;
}


