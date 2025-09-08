interface HeroImageProps {
  src: string;
  alt: string;
  className?: string;
}

export default function HeroImage({ src, alt, className = "" }: HeroImageProps) {
  return (
    <div className={`relative w-full h-64 md:h-80 lg:h-96 rounded-lg overflow-hidden ${className}`}>
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black bg-opacity-20"></div>
    </div>
  );
}
