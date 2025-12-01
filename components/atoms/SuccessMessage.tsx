"use client";

interface SuccessMessageProps {
  title: string;
  description?: string;
  className?: string;
}

export default function SuccessMessage({ title, description, className = "" }: SuccessMessageProps) {
  return (
    <div className={`p-4 bg-green-50 border border-green-200 rounded-lg ${className}`}>
      <p className="text-sm text-green-800 font-medium">{title}</p>
      {description && (
        <p className="text-xs text-green-700 mt-1">{description}</p>
      )}
    </div>
  );
}

