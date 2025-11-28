import React from 'react';

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

export default function InputField({ 
  className = "",
  ...props
}: InputFieldProps) {
  return (
    <input
      className={`w-full border-b border-gray-300 p-2 sm:p-3 focus:outline-none focus:border-black transition-colors text-sm sm:text-base ${className}`}
      {...props}
    />
  );
}