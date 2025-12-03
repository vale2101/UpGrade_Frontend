import Image from "next/image";

interface ProductImageProps {
    src: string;
    alt: string;
    className?: string;
  }
  
  export default function ProductImage({ src, alt, className = "" }: ProductImageProps) {
    return (
      <div className={`relative w-full h-40 sm:h-48 bg-gray-100 rounded-lg overflow-hidden ${className}`}>
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover"
        />
      </div>
    );
  }