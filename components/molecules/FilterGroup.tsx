"use client";

import FilterItem from "./FilterItem";
import FilterCheckbox from "../atoms/FilterCheckbox";

interface FilterOption {
  value: string;
  label: string;
}

interface FilterGroupProps {
  label: string;
  filterKey: string;
  options: FilterOption[];
  isExpanded: boolean;
  onToggle: () => void;
  isFilterActive: (key: string, value: string) => boolean;
  onFilterChange: (key: string, value: string) => void;
}

export default function FilterGroup({
  label,
  filterKey,
  options,
  isExpanded,
  onToggle,
  isFilterActive,
  onFilterChange
}: FilterGroupProps) {
  return (
    <FilterItem label={label} isExpanded={isExpanded} onToggle={onToggle}>
      <div className="space-y-2">
        {options.map((option) => (
          <FilterCheckbox
            key={option.value}
            label={option.label}
            checked={isFilterActive(filterKey, option.value)}
            onChange={() => onFilterChange(filterKey, option.value)}
          />
        ))}
      </div>
    </FilterItem>
  );
}

