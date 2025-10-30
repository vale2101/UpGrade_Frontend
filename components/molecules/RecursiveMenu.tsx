"use client";

import { useState, ReactNode } from "react";
import Link from "next/link";
import { ChevronDown, ChevronRight } from "lucide-react";

export interface MenuItem {
  label: string;
  href?: string;
  icon?: ReactNode;
  subItems?: MenuItem[]; // Recursividad: un item puede tener sub-items
  onClick?: () => void;
}

interface RecursiveMenuProps {
  items: MenuItem[];
  level?: number; // Para controlar la profundidad de anidamiento
  mobile?: boolean;
}

/**
 * Componente recursivo que renderiza un menú con soporte para sub-menús anidados
 * Usa recursividad para renderizar niveles infinitos de menú
 */
export default function RecursiveMenu({ items, level = 0, mobile = false }: RecursiveMenuProps) {
  const [openItems, setOpenItems] = useState<Set<string>>(new Set());

  const toggleItem = (label: string) => {
    setOpenItems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(label)) {
        newSet.delete(label);
      } else {
        newSet.add(label);
      }
      return newSet;
    });
  };

  const indentClass = level > 0 ? `pl-${level * 4}` : "";

  return (
    <div className={`space-y-1 ${indentClass}`}>
      {items.map((item, index) => {
        const hasSubItems = item.subItems && item.subItems.length > 0;
        const isOpen = openItems.has(item.label);

        return (
          <div key={`${item.label}-${index}`}>
            {/* Item principal */}
            {item.href ? (
              <Link
                href={item.href}
                onClick={item.onClick}
                className={`flex items-center justify-between px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors ${
                  mobile ? "text-base" : "text-sm"
                }`}
              >
                <span className="flex items-center gap-2">
                  {item.icon}
                  {item.label}
                </span>
                {hasSubItems && (
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      toggleItem(item.label);
                    }}
                    className="p-1 hover:bg-gray-200 rounded"
                  >
                    {isOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                  </button>
                )}
              </Link>
            ) : (
              <button
                onClick={() => {
                  item.onClick?.();
                  if (hasSubItems) toggleItem(item.label);
                }}
                className={`w-full flex items-center justify-between px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors ${
                  mobile ? "text-base" : "text-sm"
                }`}
              >
                <span className="flex items-center gap-2">
                  {item.icon}
                  {item.label}
                </span>
                {hasSubItems && (
                  isOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />
                )}
              </button>
            )}

            {/* Sub-items (RECURSIÓN) */}
            {hasSubItems && isOpen && (
              <div className="ml-4 mt-1">
                <RecursiveMenu
                  items={item.subItems!}
                  level={level + 1}
                  mobile={mobile}
                />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

