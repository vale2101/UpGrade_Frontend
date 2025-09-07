interface ProductCardProps {
  image: string;
  title: string;
  price: string;
  oldPrice?: string;
  cuotas?: string;
  tags?: string[];
  discount?: string;
}

export default function ProductCard({
  image,
  title,
  price,
  oldPrice,
  cuotas,
  tags = [],
  discount,
}: ProductCardProps) {
  return (
    <div className="border rounded-lg shadow-sm p-4 flex flex-col relative">
      {/* Descuento */}
      {discount && (
        <span className="absolute top-2 left-2 bg-purple-600 text-white text-xs px-2 py-1 rounded-md font-bold">
          {discount}
        </span>
      )}

      {/* Imagen */}
      <img
        src={image}
        alt={title}
        className="w-full h-52 object-contain mb-4"
      />

      {/* Info */}
      <h3 className="text-sm font-medium mb-2 text-center">{title}</h3>
      <p className="text-green-600 font-bold mb-1 text-center">{price}</p>
      {oldPrice && (
        <p className="text-gray-500 text-sm line-through text-center">{oldPrice}</p>
      )}
      {cuotas && (
        <p className="text-black text-sm font-semibold underline text-center">{cuotas}</p>
      )}

      {/* Tags */}
      <div className="grid grid-cols-3 gap-1 mt-4">
        {tags.map((tag, idx) => (
          <button
            key={idx}
            className="px-2 py-1 text-xs rounded-md text-white transition-colors"
            style={{
              backgroundColor:
                tag === "Outlet"
                  ? "#9acd32"
                  : tag === "Semi Nuevo"
                  ? "#800080"
                  : tag === "Como Nuevo"
                  ? "#ff3366"
                  : "#333",
            }}
          >
            {tag}
          </button>
        ))}
      </div>
    </div>
  );
}
