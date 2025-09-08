interface FilterItemProps {
  label: string;
  isExpanded?: boolean;
  onToggle?: () => void;
  children?: React.ReactNode;
  className?: string;
}

export default function FilterItem({ 
  label, 
  isExpanded = false, 
  onToggle, 
  children,
  className = "" 
}: FilterItemProps) {
  return (
    <div className={`border-b border-gray-200 py-3 ${className}`}>
      <button
        onClick={onToggle}
        className="w-full flex justify-between items-center text-left hover:text-blue-600 transition-colors"
      >
        <span className="font-medium text-gray-700">{label}</span>
        <span className={`transform transition-transform ${isExpanded ? 'rotate-180' : ''}`}>
          ▼
        </span>
      </button>
      {isExpanded && children && (
        <div className="mt-3 space-y-2">
          {children}
        </div>
      )}
    </div>
  );
}
