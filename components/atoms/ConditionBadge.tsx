interface ConditionBadgeProps {
  condition: "Nuevo" | "Como Nuevo" | "Outlet";
  className?: string;
}

export default function ConditionBadge({ condition, className = "" }: ConditionBadgeProps) {
  const getBadgeColor = (condition: string) => {
    switch (condition) {
      case "Nuevo":
        return "bg-blue-500 text-white";
      case "Como Nuevo":
        return "bg-pink-500 text-white";
      case "Outlet":
        return "bg-green-500 text-white";
      default:
        return "bg-gray-500 text-white";
    }
  };

  return (
    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getBadgeColor(condition)} ${className}`}>
      {condition}
    </span>
  );
}
