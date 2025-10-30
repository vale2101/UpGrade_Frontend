"use client";

import { useState, ReactNode, memo, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";

interface TabItem {
  key: string;
  label: string;
  icon?: ReactNode;
  content: ReactNode;
}

interface UserTabsProps {
  items: TabItem[];
  defaultKey?: string;
  baseUrl?: string; // URL base para la navegación de tabs (por defecto /user)
}

function Tabs({ items, defaultKey, baseUrl = "/user" }: UserTabsProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const tabFromUrl = searchParams.get("tab");
  const [active, setActive] = useState<string>(tabFromUrl || defaultKey || items[0]?.key);

  useEffect(() => {
    if (tabFromUrl && items.some(i => i.key === tabFromUrl)) {
      setActive(tabFromUrl);
    }
  }, [tabFromUrl, items]);

  const handleTabChange = (key: string) => {
    setActive(key);
    // Solo navegar si se proporciona una baseUrl válida (no vacía)
    if (baseUrl && baseUrl.trim() !== "") {
      router.push(`${baseUrl}?tab=${key}`, { scroll: false });
    }
  };

  const ActivePanel = items.find(i => i.key === active)?.content || null;

  return (
    <div>
      <div className="sticky top-0 z-10 bg-white/70 backdrop-blur supports-[backdrop-filter]:bg-white/60 rounded-xl border border-gray-200 p-1 mb-6">
        <div className="flex flex-wrap gap-1">
          {items.map(item => (
            <button
              key={item.key}
              onClick={() => handleTabChange(item.key)}
              className={`px-3 sm:px-4 py-2 rounded-lg text-sm sm:text-base transition-colors ${
                active === item.key
                  ? "bg-[#57ad63] text-white"
                  : "text-gray-600 hover:bg-[#fb64b61a]"
              }`}
            >
              <span className="inline-flex items-center gap-2">
                {item.icon}
                {item.label}
              </span>
            </button>
          ))}
        </div>
      </div>

      <div className="pt-2">
        {ActivePanel}
      </div>
    </div>
  );
}

export default memo(Tabs);


