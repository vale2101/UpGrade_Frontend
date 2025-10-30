"use client";

import { useState, ReactNode, memo } from "react";

interface TabItem {
  key: string;
  label: string;
  icon?: ReactNode;
  content: ReactNode;
}

interface UserTabsProps {
  items: TabItem[];
  defaultKey?: string;
}

function Tabs({ items, defaultKey }: UserTabsProps) {
  const [active, setActive] = useState<string>(defaultKey || items[0]?.key);

  const ActivePanel = items.find(i => i.key === active)?.content || null;

  return (
    <div>
      <div className="sticky top-0 z-10 bg-white/70 backdrop-blur supports-[backdrop-filter]:bg-white/60 rounded-xl border border-gray-200 p-1 mb-6">
        <div className="flex flex-wrap gap-1">
          {items.map(item => (
            <button
              key={item.key}
              onClick={() => setActive(item.key)}
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


