"use client";

interface StepHeaderProps {
  stepNumber: number;
  title: string;
  description?: string;
  className?: string;
}

export default function StepHeader({ stepNumber, title, description, className = "" }: StepHeaderProps) {
  return (
    <div className={`mb-6 ${className}`}>
      <h3 className="text-lg font-semibold text-gray-900 mb-2">
        Paso {stepNumber}: {title}
      </h3>
      {description && (
        <p className="text-sm text-gray-600">{description}</p>
      )}
    </div>
  );
}

