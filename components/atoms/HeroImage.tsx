import Image from "next/image";

interface HeroImageProps {
  src: string;
  alt: string;
  className?: string;
}

export default function HeroImage({ src, alt, className = "" }: HeroImageProps) {
  return (
    <div className={`relative w-full h-48 sm:h-64 md:h-80 lg:h-96 rounded-lg overflow-hidden ${className}`}>
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover"
      />
      <div className="absolute inset-0 bg-black bg-opacity-20"></div>
    </div>
  );
}
