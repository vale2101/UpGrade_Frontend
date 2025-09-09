import Image from "next/image";

interface CategoryIconProps {
  src: string;
  label: string;
  onClick?: () => void;
}

export default function CategoryIcon({ src, label, onClick }: CategoryIconProps) {
  return (
    <div 
      className="flex flex-col items-center cursor-pointer hover:scale-105 transition"
      onClick={onClick}
    >
      <div className="w-16 h-16 flex items-center justify-center">
        <Image
          src={src}
          alt={label}
          width={64}
          height={64}
          className="object-contain w-full h-full"
        />
      </div>
      <span className="text-xs mt-1 text-black">{label}</span>
    </div>
  );
}
