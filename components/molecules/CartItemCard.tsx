import Image from "next/image";

interface CartItemCardProps {
  item: any;
  updateQuantity: (id: string, quantity: number) => void;
  removeFromCart: (id: string) => void;
}

export default function CartItemCard({ item, updateQuantity, removeFromCart }: CartItemCardProps) {
  return (
    <div className="p-4 sm:p-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
        <div className="flex-shrink-0 w-full sm:w-auto">
          <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gray-100 rounded-lg overflow-hidden mx-auto sm:mx-0">
            <Image src={item.image} alt={item.name} width={80} height={80} className="w-full h-full object-cover" />
          </div>
        </div>

        <div className="flex-1 min-w-0 w-full sm:w-auto">
          <h3 className="text-base sm:text-lg font-medium text-gray-900 truncate text-center sm:text-left">
            {item.name}
          </h3>
          <div className="mt-1 space-y-1 text-center sm:text-left">
            <p className="text-sm text-gray-600">Categoría: {item.condition}</p>
            <p className="text-sm text-gray-600">Capacidad: {item.capacity}</p>
            <p className="text-sm text-gray-600">Color: {item.color}</p>
          </div>
        </div>

        <div className="flex-shrink-0 text-center sm:text-right w-full sm:w-auto">
          <p className="text-lg font-semibold text-gray-900">{item.price}</p>
          {item.originalPrice && <p className="text-sm text-gray-500 line-through">{item.originalPrice}</p>}
          
          <div className="mt-3 flex items-center justify-center sm:justify-end space-x-2">
            <button
              onClick={() => updateQuantity(item.id, item.quantity - 1)}
              className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50"
            >
              -
            </button>
            <span className="w-8 text-center font-medium">{item.quantity}</span>
            <button
              onClick={() => updateQuantity(item.id, item.quantity + 1)}
              className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50"
            >
              +
            </button>
          </div>

          <button
            onClick={() => removeFromCart(item.id)}
            className="mt-2 text-red-600 hover:text-red-800 text-sm font-medium"
          >
            Eliminar
          </button>
        </div>
      </div>
    </div>
  );
}

