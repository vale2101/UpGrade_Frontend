interface SectionImageProps {
  src: string;
  alt: string;
  className?: string;
}

export default function SectionImage({ src, alt, className = "" }: SectionImageProps) {
  return (
    <div className={`relative w-full h-full min-h-[200px] sm:min-h-[250px] md:min-h-[300px] rounded-xl overflow-hidden shadow-lg ${className}`}>
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-cover"
      />
    </div>
  );
}
