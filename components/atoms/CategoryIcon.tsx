import Image from "next/image";

interface Props {
  src: string;
  label: string;
}

export default function CategoryIcon({ src, label }: Props) {
  return (
    <div className="flex flex-col items-center cursor-pointer hover:scale-105 transition">
      <Image src={src} alt={label} width={40} height={40} />
      <span className="text-xs mt-1">{label}</span>
    </div>
  );
}