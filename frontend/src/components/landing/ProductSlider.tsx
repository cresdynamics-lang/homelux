import React from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { PRODUCTS } from '../../data/furnitureData';
import { ProductCard } from '../shared/ProductCard';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

interface ProductSliderProps {
  title: string;
}

export const ProductSlider: React.FC<ProductSliderProps> = ({ title }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: 'start',
    loop: false,
    skipSnaps: false,
    dragFree: true,
  });

  const scrollPrev = () => emblaApi && emblaApi.scrollPrev();
  const scrollNext = () => emblaApi && emblaApi.scrollNext();

  return (
    <section className="py-24 bg-background overflow-hidden relative">
      <div className="absolute top-0 left-0 w-64 h-64 bg-accent/5 blur-[100px] rounded-full -translate-x-1/2 -translate-y-1/2" />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="max-w-7xl mx-auto px-6 space-y-12 relative z-10"
      >
        <div className="flex items-end justify-between">
          <div className="space-y-4">
            <h2 className="text-4xl md:text-5xl font-heading font-black italic tracking-tighter text-primary">{title}</h2>
            <div className="h-1.5 w-24 bg-accent rounded-full" />
          </div>

          <div className="flex gap-4">
            <button
              onClick={scrollPrev}
              aria-label="Previous Slide"
              className="p-4 rounded-2xl border border-gray-100 bg-white hover:bg-primary hover:text-white transition-all cursor-pointer shadow-sm hover:shadow-xl"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={scrollNext}
              aria-label="Next Slide"
              className="p-4 rounded-2xl border border-gray-100 bg-white hover:bg-primary hover:text-white transition-all cursor-pointer shadow-sm hover:shadow-xl"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="overflow-hidden cursor-grab active:cursor-grabbing" ref={emblaRef}>
          <div className="flex gap-8">
            {PRODUCTS.map((product, index) => (
              <div key={`${product.id}-${index}`} className="flex-[0_0_300px] md:flex-[0_0_380px] py-4">
                <ProductCard {...product} />
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
};
