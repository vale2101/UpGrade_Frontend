interface ProductImageGalleryProps {
  images: string[];
  selectedImage: number;
  onSelectImage: (index: number) => void;
}

export default function ProductImageGallery({ images, selectedImage, onSelectImage }: ProductImageGalleryProps) {
  return (
    <div className="space-y-4">
      <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
        <img src={images?.[selectedImage] || images?.[0]} alt="Product" className="w-full h-full object-contain" />
      </div>
      {images && images.length > 1 && (
        <div className="flex space-x-2 overflow-x-auto">
          {images.map((image: string, index: number) => (
            <button
              key={index}
              onClick={() => onSelectImage(index)}
              className={`w-12 h-12 sm:w-16 sm:h-16 rounded-lg overflow-hidden border-2 transition-colors flex-shrink-0 ${
                selectedImage === index ? 'border-black' : 'border-gray-200 hover:border-gray-400'
              }`}
            >
              <img src={image} alt={`${index + 1}`} className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

