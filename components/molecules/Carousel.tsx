"use client";

import { useState, useEffect, ReactNode } from "react";
import CarouselButton from "../atoms/CarouselButton";
import CarouselIndicator from "../atoms/CarouselIndicator";

interface CarouselProps {
  items: ReactNode[];
  autoPlay?: boolean;
  autoPlayInterval?: number;
  showIndicators?: boolean;
  showControls?: boolean;
  className?: string;
}

export default function Carousel({
  items,
  autoPlay = true,
  autoPlayInterval = 5000,
  showIndicators = true,
  showControls = true,
  className = ""
}: CarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? items.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === items.length - 1 ? 0 : prev + 1));
  };

  useEffect(() => {
    if (autoPlay && !isPaused && items.length > 1) {
      const interval = setInterval(() => {
        goToNext();
      }, autoPlayInterval);

      return () => clearInterval(interval);
    }
  }, [autoPlay, isPaused, autoPlayInterval, items.length]);

  if (items.length === 0) return null;

  return (
    <div 
      className={`relative w-full overflow-hidden rounded-xl ${className}`}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div 
        className="flex transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {items.map((item, index) => (
          <div 
            key={index}
            className="min-w-full flex-shrink-0 flex items-stretch"
          >
            {item}
          </div>
        ))}
      </div>

      {showControls && items.length > 1 && (
        <>
          <CarouselButton direction="prev" onClick={goToPrevious} />
          <CarouselButton direction="next" onClick={goToNext} />
        </>
      )}

      {showIndicators && items.length > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex gap-2">
          {items.map((_, index) => (
            <CarouselIndicator
              key={index}
              active={index === currentIndex}
              onClick={() => goToSlide(index)}
              index={index}
            />
          ))}
        </div>
      )}
    </div>
  );
}

