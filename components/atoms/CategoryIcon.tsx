import Image from "next/image";

interface CategoryIconProps {
  src: string;
  label: string;
  onClick?: () => void;
}

export default function CategoryIcon({ src, label, onClick }: CategoryIconProps) {
  return (
    <div 
      className="flex flex-col items-center cursor-pointer hover:scale-105 transition flex-shrink-0"
      onClick={onClick}
    >
      <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 flex items-center justify-center">
        <Image
          src={src}
          alt={label}
          width={64}
          height={64}
          className="object-contain w-full h-full"
        />
      </div>
      <span className="text-xs mt-1 text-black text-center max-w-[60px] sm:max-w-none">{label}</span>
    </div>
  );
}
