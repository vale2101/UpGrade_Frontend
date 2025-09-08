"use client";

import ProductImage from "../atoms/ProductImage";
import ProductTitle from "../atoms/ProductTitle";
import ProductPrice from "../atoms/ProductPrice";
import InstallmentPlan from "../atoms/InstallmentPlan";
import ConditionBadge from "../atoms/ConditionBadge";
import AddToCartButton from "../atoms/AddToCartButton";

interface Product {
  id: string;
  name: string;
  image: string;
  currentPrice: string;
  originalPrice?: string;
  discount?: string;
  installments: number;
  monthlyAmount: string;
  condition: "Nuevo" | "Como Nuevo" | "Outlet";
}

interface ProductCardProps {
  product: Product;
  onAddToCart?: (productId: string) => void;
  className?: string;
}

export default function ProductCard({ product, onAddToCart, className = "" }: ProductCardProps) {
  return (
    <div className={`bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-4 relative ${className}`}>
      <AddToCartButton onClick={() => onAddToCart?.(product.id)} />
      
      <ProductImage 
        src={product.image} 
        alt={product.name}
        className="mb-4"
      />
      
      <ProductTitle>{product.name}</ProductTitle>
      
      <ProductPrice
        currentPrice={product.currentPrice}
        originalPrice={product.originalPrice}
        discount={product.discount}
      />
      
      <InstallmentPlan
        installments={product.installments}
        monthlyAmount={product.monthlyAmount}
      />
      
      <div className="flex justify-center">
        <ConditionBadge condition={product.condition} />
      </div>
    </div>
  );
}
