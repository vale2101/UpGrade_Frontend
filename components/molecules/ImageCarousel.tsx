"use client";

import Image from "next/image";
import Carousel from "./Carousel";

interface ImageCarouselProps {
  images: Array<{
    src: string;
    alt: string;
    title?: string;
    description?: string;
  }>;
  className?: string;
}

export default function ImageCarousel({ images, className = "" }: ImageCarouselProps) {
  return (
    <Carousel
      items={images.map((image, index) => (
        <div key={index} className="relative w-full h-[300px] sm:h-[400px] md:h-[500px]">
          <Image
            src={image.src}
            alt={image.alt}
            fill
            className="object-cover rounded-xl"
            priority={index === 0}
          />
          {(image.title || image.description) && (
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent rounded-xl flex items-end">
              <div className="p-6 sm:p-8 text-white">
                {image.title && (
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2">
                    {image.title}
                  </h3>
                )}
                {image.description && (
                  <p className="text-sm sm:text-base text-gray-200">
                    {image.description}
                  </p>
                )}
              </div>
            </div>
          )}
        </div>
      ))}
      autoPlay={true}
      autoPlayInterval={5000}
      className={className}
    />
  );
}

