import React from 'react';

interface SearchInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

export default function SearchInput({ 
  className = "",
  ...props
}: SearchInputProps) {
  return (
    <input
      type="text"
      className={`w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none text-sm sm:text-base ${className}`}
      {...props}
    />
  );
}
