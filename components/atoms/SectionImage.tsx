interface SectionImageProps {
  src: string;
  alt: string;
  className?: string;
}

export default function SectionImage({ src, alt, className = "" }: SectionImageProps) {
  return (
    <div className={`relative w-full h-48 rounded-lg overflow-hidden shadow-lg ${className}`}>
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-cover"
      />
    </div>
  );
}
