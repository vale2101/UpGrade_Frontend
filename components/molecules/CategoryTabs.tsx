"use client";
import { useState } from "react";
import CategoryTab from "../atoms/CategoryTab";

const tabs = ["Samsung", "iPhone", "Apple Watch", "iPad", "Otras Marcas"];

export default function CategoryTabs() {
  const [active, setActive] = useState("Samsung");

  return (
    <div className="w-full flex flex-col items-center py-8">
      <h2 className="text-lg font-bold tracking-wide mb-6">PRODUCTOS</h2>
      <div className="flex flex-wrap gap-4 justify-center">
        {tabs.map((tab) => (
          <CategoryTab
            key={tab}
            label={tab}
            active={active === tab}
            onClick={() => setActive(tab)}
          />
        ))}
      </div>
    </div>
  );
}
