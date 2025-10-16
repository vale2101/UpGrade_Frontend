"use client";
import { useState } from "react";
import BackToHomeButton from "../atoms/BackToHomeButton";
import ProductNotFound from "../atoms/ProductNotFound";
import ProductImageGallery from "../molecules/ProductImageGallery";
import ProductInfoCard from "../molecules/ProductInfoCard";
import ProductOptionsSelector from "../molecules/ProductOptionsSelector";
import ProductDetailsInfo from "../molecules/ProductDetailsInfo";
import { useCart } from "../../contexts/CartContext";
import { getProductDetail } from "../../contexts/DataContext";

export default function ProductDetailSection({ productId }: { productId: string }) {
  const { addToCart } = useCart();
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedCondition, setSelectedCondition] = useState("Outlet");
  const [selectedCapacity, setSelectedCapacity] = useState("128GB");
  const [selectedColor, setSelectedColor] = useState("Gray");
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);

  const product = getProductDetail(productId);

  const handleAddToCart = () => {
    if (!product) return;
    for (let i = 0; i < quantity; i++) {
      addToCart({
        id: product.id,
        name: product.name,
        image: product.image,
        price: product.currentPrice,
        originalPrice: product.originalPrice,
        discount: product.discount,
        condition: selectedCondition,
        capacity: selectedCapacity,
        color: selectedColor,
        category: product.category
      });
    }
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 3000);
  };

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4">
          <BackToHomeButton />
          <ProductNotFound />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-4 sm:py-8">
      <div className="max-w-7xl mx-auto px-4">
        <BackToHomeButton />
        
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 p-4 sm:p-6 lg:p-8">
            <ProductImageGallery 
              images={product.images || [product.image]} 
              selectedImage={selectedImage} 
              onSelectImage={setSelectedImage} 
            />
            
            <div className="space-y-4 sm:space-y-6">
              <ProductInfoCard 
                product={product}
                quantity={quantity}
                setQuantity={setQuantity}
                addedToCart={addedToCart}
                onAddToCart={handleAddToCart}
              />
              
              <ProductOptionsSelector
                product={product}
                selectedCondition={selectedCondition}
                setSelectedCondition={setSelectedCondition}
                selectedCapacity={selectedCapacity}
                setSelectedCapacity={setSelectedCapacity}
                selectedColor={selectedColor}
                setSelectedColor={setSelectedColor}
              />
              
              <ProductDetailsInfo product={product} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
