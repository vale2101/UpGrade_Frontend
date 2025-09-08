interface Props {
  title: string;
  subtitle: string;
  price: string;
  cuotas: string;
}

export default function ProductHighlight({ title, subtitle, price, cuotas }: Props) {
  return (
    <div className="bg-black text-white p-6 rounded-2xl shadow-lg w-[300px]">
      {/* Título */}
      <h2 className="text-xl font-bold mb-2">{title}</h2>

      {/* Subtítulo */}
      <p className="text-pink-400 font-semibold text-sm mb-3">{subtitle}</p>

      {/* Precio */}
      <div className="text-4xl font-extrabold text-[#57ad63]">{price}</div>

      {/* Información de cuotas */}
      <div className="mt-3">
        <p className="font-semibold">0% interés</p>
        <p className="text-sm">{cuotas}</p>
      </div>

      {/* Badge UpGrade */}
      <div className="mt-4">
        <span className="bg-[#57ad63] text-white px-3 py-1 rounded-full text-sm font-semibold">
          Enamórate de un UPGRADE
        </span>
      </div>
    </div>
  );
}
