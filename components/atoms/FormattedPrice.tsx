interface FormattedPriceProps {
  price: number | string | null | undefined;
  fallback?: string;
}

export default function FormattedPrice({ price, fallback = '-' }: FormattedPriceProps) {
  if (price == null || price === undefined) {
    return <span>{fallback}</span>;
  }

  const numPrice = typeof price === 'string' ? parseFloat(price) : price;
  
  if (isNaN(numPrice) || !isFinite(numPrice)) {
    return <span>{fallback}</span>;
  }

  return (
    <span>
      ${numPrice.toLocaleString()}
    </span>
  );
}

