"use client";

import ProductImage from "../atoms/ProductImage";
import ProductTitle from "../atoms/ProductTitle";
import ProductPrice from "../atoms/ProductPrice";
import InstallmentPlan from "../atoms/InstallmentPlan";
import ConditionBadge from "../atoms/ConditionBadge";
import AddToCartButton from "../atoms/AddToCartButton";

function normalizeConditionForBadge(condition: string): "Nuevo" | "Como Nuevo" | "Outlet" | "Semi Nuevo" {
  const normalized = condition.toLowerCase().trim();
  
  if (normalized.includes('nuevo') && !normalized.includes('semi') && !normalized.includes('como')) {
    return "Nuevo";
  }
  
  if (normalized.includes('como nuevo')) {
    return "Como Nuevo";
  }
  
  if (normalized.includes('semi')) {
    return "Semi Nuevo";
  }
  
  if (normalized.includes('outlet') || normalized.includes('reacondicionado')) {
    return "Outlet";
  }
  
  return "Outlet";
}

interface Product {
  id: string;
  name: string;
  image: string;
  currentPrice: string;
  originalPrice?: string;
  discount?: string;
  installments?: number;
  monthlyAmount?: string;
  condition: string;
}

interface ProductCardProps {
  product: Product;
  onAddToCart?: (productId: string) => void;
  onProductClick?: (productId: string) => void;
  className?: string;
}

export default function ProductCard({ product, onAddToCart, onProductClick, className = "" }: ProductCardProps) {
  const handleCardClick = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('[data-add-to-cart]')) {
      return;
    }
    onProductClick?.(product.id);
  };

  return (
    <div 
      className={`bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-3 sm:p-4 relative cursor-pointer ${className}`}
      onClick={handleCardClick}
    >
      <AddToCartButton onClick={() => onAddToCart?.(product.id)} />
      
      <ProductImage 
        src={product.image} 
        alt={product.name}
        className="mb-3 sm:mb-4"
      />
      
      <ProductTitle>{product.name}</ProductTitle>
      
      <ProductPrice
        currentPrice={product.currentPrice}
        originalPrice={product.originalPrice}
        discount={product.discount}
      />
      
      {product.installments && product.monthlyAmount && (
        <InstallmentPlan
          installments={product.installments}
          monthlyAmount={product.monthlyAmount}
        />
      )}
      
      <div className="flex justify-center mt-3">
        <ConditionBadge condition={normalizeConditionForBadge(product.condition)} />
      </div>
    </div>
  );
}
