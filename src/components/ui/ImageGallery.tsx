"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

interface ImageGalleryProps {
  images: string[];
  stopName: string;
  isOpen: boolean;
  onClose: () => void;
}

export default function ImageGallery({
  images,
  stopName,
  isOpen,
  onClose,
}: ImageGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  }, [images.length]);

  const goPrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  }, [images.length]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose, goNext, goPrev]);

  // Reset index when opening
  useEffect(() => {
    if (isOpen) setCurrentIndex(0);
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[100] flex flex-col"
          onClick={onClose}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/95 backdrop-blur-sm" />

          {/* Header */}
          <div className="relative z-10 flex items-center justify-between px-4 sm:px-6 py-4">
            <div>
              <h3 className="text-white font-serif text-lg sm:text-xl font-bold">
                {stopName}
              </h3>
              <p className="text-white/50 text-sm">
                {currentIndex + 1} of {images.length}
              </p>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onClose();
              }}
              className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
              aria-label="Close gallery"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="2"
              >
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Main image area */}
          <div
            className="relative flex-1 flex items-center justify-center px-4 sm:px-16 pb-4"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Previous button */}
            <button
              onClick={goPrev}
              className="absolute left-2 sm:left-4 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
              aria-label="Previous image"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="2"
              >
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>

            {/* Image */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.25 }}
                className="relative w-full max-w-5xl aspect-[16/10] sm:aspect-[16/9] rounded-xl overflow-hidden"
              >
                <Image
                  src={images[currentIndex]}
                  alt={`${stopName} - Photo ${currentIndex + 1}`}
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 100vw, 80vw"
                  priority
                />
              </motion.div>
            </AnimatePresence>

            {/* Next button */}
            <button
              onClick={goNext}
              className="absolute right-2 sm:right-4 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
              aria-label="Next image"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="2"
              >
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          </div>

          {/* Thumbnail strip */}
          <div className="relative z-10 px-4 sm:px-6 pb-4">
            <div className="flex gap-2 justify-center overflow-x-auto py-2 scrollbar-hide">
              {images.map((img, i) => (
                <button
                  key={i}
                  onClick={(e) => {
                    e.stopPropagation();
                    setCurrentIndex(i);
                  }}
                  className={`relative flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 rounded-lg overflow-hidden transition-all ${
                    i === currentIndex
                      ? "ring-2 ring-karoo-400 opacity-100 scale-105"
                      : "opacity-50 hover:opacity-80"
                  }`}
                >
                  <Image
                    src={img}
                    alt={`Thumbnail ${i + 1}`}
                    fill
                    className="object-cover"
                    sizes="80px"
                  />
                </button>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
