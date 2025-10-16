interface ProductDetailsInfoProps {
  product: any;
}

export default function ProductDetailsInfo({ product }: ProductDetailsInfoProps) {
  return (
    <>
      <div className="pt-4 border-t border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Descripción</h3>
        <p className="text-gray-600 text-sm">{product.description}</p>
      </div>

      {product.features && product.features.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Características principales</h3>
          <ul className="space-y-1">
            {product.features.map((feature: string, index: number) => (
              <li key={index} className="text-sm text-gray-600 flex items-start">
                <span className="text-green-500 mr-2">•</span>
                {feature}
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}

