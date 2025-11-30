"use client";
import { useMemo } from "react";
import BackToHomeButton from "../atoms/BackToHomeButton";
import ProductNotFound from "../atoms/ProductNotFound";
import ProductImageGallery from "../molecules/ProductImageGallery";
import ProductInfoCard from "../molecules/ProductInfoCard";
import ProductOptionsSelector from "../molecules/ProductOptionsSelector";
import ProductDetailsInfo from "../molecules/ProductDetailsInfo";
import { useProductSelection } from "../../hooks/useProductSelection";
import { useAddToCart } from "../../hooks/useAddToCart";
import { useProduct } from "../../hooks/useProduct";
import { mapProductoToProduct, Product } from "../../utils/productMapper";

export default function ProductDetailSection({ productId }: { productId: string }) {
  const { product: producto, loading, error } = useProduct(productId);
  
  // Mapear producto del backend al formato del frontend
  const product = useMemo(() => {
    if (!producto) return null;
    return mapProductoToProduct(producto);
  }, [producto]);

  const {
    selectedImage,
    setSelectedImage,
    selectedCondition,
    setSelectedCondition,
    selectedCapacity,
    setSelectedCapacity,
    selectedColor,
    setSelectedColor,
    quantity,
    setQuantity,
    addedToCart,
    showAddedToCart
  } = useProductSelection({ product, productId });
  const { handleAddToCart } = useAddToCart();

  const onAddToCart = () => {
    if (!product) return;
    for (let i = 0; i < quantity; i++) {
      handleAddToCart(product, {
        condition: selectedCondition,
        capacity: selectedCapacity,
        color: selectedColor
      });
    }
    showAddedToCart();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4">
          <BackToHomeButton />
          <div className="flex justify-center items-center py-12">
            <p className="text-gray-600">Cargando producto...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error || !product) {
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
                onAddToCart={onAddToCart}
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
              
              <ProductDetailsInfo product={product} idProducto={producto?.id_producto} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
