interface ProductPriceProps {
  currentPrice: string;
  originalPrice?: string;
  discount?: string;
  className?: string;
}

export default function ProductPrice({ 
  currentPrice, 
  originalPrice, 
  discount, 
  className = "" 
}: ProductPriceProps) {
  return (
    <div className={`mb-2 ${className}`}>
      {discount && (
        <span className="bg-purple-500 text-white text-xs px-2 py-1 rounded-full mb-2 inline-block">
          -{discount}
        </span>
      )}
      <div className="text-lg sm:text-xl font-bold text-gray-900">
        Desde {currentPrice}
      </div>
      {originalPrice && (
        <div className="text-xs sm:text-sm text-gray-500 line-through">
          Antes {originalPrice}
        </div>
      )}
    </div>
  );
}
