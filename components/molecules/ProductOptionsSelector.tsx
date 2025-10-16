interface ProductOptionsSelectorProps {
  product: any;
  selectedCondition: string;
  setSelectedCondition: (c: string) => void;
  selectedCapacity: string;
  setSelectedCapacity: (c: string) => void;
  selectedColor: string;
  setSelectedColor: (c: string) => void;
}

export default function ProductOptionsSelector({
  product,
  selectedCondition,
  setSelectedCondition,
  selectedCapacity,
  setSelectedCapacity,
  selectedColor,
  setSelectedColor
}: ProductOptionsSelectorProps) {
  const colorMap: any = {
    'Gray': '#6B7280', 'White': '#FFFFFF', 'Green': '#10B981', 'Beige': '#F3E8FF',
    'Purple': '#8B5CF6', 'Black': '#000000', 'Blue': '#3B82F6', 'Natural Titanium': '#D1D5DB',
    'Blue Titanium': '#60A5FA', 'White Titanium': '#F9FAFB', 'Black Titanium': '#374151'
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="text-sm font-medium text-gray-700 mb-2 block">Categoría: {selectedCondition}</label>
        <div className="flex flex-wrap gap-2">
          {["Outlet", "Semi Nuevo", "Como Nuevo"].map((condition) => (
            <button
              key={condition}
              onClick={() => setSelectedCondition(condition)}
              className={`px-3 sm:px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                selectedCondition === condition ? 'bg-black text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {condition}
            </button>
          ))}
        </div>
      </div>

      {product.capacity && (
        <div>
          <label className="text-sm font-medium text-gray-700 mb-2 block">Capacidad: {selectedCapacity}</label>
          <div className="flex flex-wrap gap-2">
            {(Array.isArray(product.capacity) ? product.capacity : [product.capacity]).map((cap: string) => (
              <button
                key={cap}
                onClick={() => setSelectedCapacity(cap)}
                className={`px-3 sm:px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  selectedCapacity === cap ? 'bg-black text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {cap}
              </button>
            ))}
          </div>
        </div>
      )}

      {product.color && (
        <div>
          <label className="text-sm font-medium text-gray-700 mb-2 block">Color: {selectedColor}</label>
          <div className="flex flex-wrap gap-2">
            {(Array.isArray(product.color) ? product.color : [product.color]).map((color: string) => (
              <button
                key={color}
                onClick={() => setSelectedColor(color)}
                className={`w-8 h-8 rounded-full border-2 transition-colors ${
                  selectedColor === color ? 'border-black' : 'border-gray-300 hover:border-gray-400'
                }`}
                style={{ backgroundColor: colorMap[color] || '#6B7280' }}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

