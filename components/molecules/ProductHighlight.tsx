interface Props {
  title: string;
  subtitle: string;
  price: string;
  cuotas: string;
}

export default function ProductHighlight({ title, subtitle, price, cuotas }: Props) {
  return (
    <div className="bg-black text-white p-4 sm:p-6 rounded-2xl shadow-lg w-full max-w-[280px] sm:max-w-[300px]">
      <h2 className="text-lg sm:text-xl font-bold mb-2">{title}</h2>

      <p className="text-pink-400 font-semibold text-xs sm:text-sm mb-3">{subtitle}</p>

      <div className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#57ad63]">{price}</div>

      <div className="mt-3">
        <p className="font-semibold text-sm sm:text-base">0% interés</p>
        <p className="text-xs sm:text-sm">{cuotas}</p>
      </div>

      <div className="mt-4">
        <span className="bg-[#57ad63] text-white px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-semibold">
          Enamórate de un UPGRADE
        </span>
      </div>
    </div>
  );
}
