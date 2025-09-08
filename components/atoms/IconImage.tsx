interface IconImageProps {
  src: string;
  alt: string;
  className?: string;
}

export default function IconImage({ src, alt, className = "" }: IconImageProps) {
  return (
    <div className={`w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center ${className}`}>
      <img
        src={src}
        alt={alt}
        className="w-10 h-10 object-contain"
      />
    </div>
  );
}
