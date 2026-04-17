import React from 'react';
import { motion } from 'framer-motion';
import { HERO_CONTENT } from '../../data/mockData';
import { ChevronRight, ShoppingCart, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Hero: React.FC = () => {
  return (
    <section className="relative min-h-[95vh] flex items-center pt-20 overflow-hidden bg-primary">
      {/* Background Blobs */}
      <div className="blob -top-20 -left-20 scale-150 opacity-40 shrink-0" />
      <div className="blob top-1/2 -right-20 scale-125 opacity-30 shrink-0" />
      
      {/* Decorative patterns */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-px h-64 bg-white/20 rotate-45" />
        <div className="absolute bottom-1/4 right-1/4 w-px h-64 bg-white/20 -rotate-45" />
      </div>

      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center relative z-10">
        {/* Text Content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-white space-y-10"
        >
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="inline-flex items-center gap-2 bg-accent/20 border border-accent/30 text-accent font-bold tracking-[0.3em] uppercase text-[10px] px-4 py-2 rounded-full"
            >
              <Sparkles className="w-3.5 h-3.5" /> Exclusive Collection 2026
            </motion.div>
            <h1 className="text-5xl md:text-7xl font-heading font-extrabold leading-[1.1] italic tracking-tight">
              {HERO_CONTENT.title}
            </h1>
            <p className="text-lg text-white/80 max-w-xl font-medium leading-relaxed">
              {HERO_CONTENT.subtitle}
            </p>
          </div>

          <div className="flex flex-wrap gap-6 pt-4">
            <Link 
              to="/category/living-room" 
              className="px-10 py-5 bg-accent text-white rounded-2xl font-black text-sm uppercase tracking-widest shadow-2xl shadow-accent/20 hover:bg-white hover:text-primary transition-all duration-500 flex items-center gap-3 group animate-in slide-in-from-bottom-4"
            >
              {HERO_CONTENT.ctaText}
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link 
              to="/showrooms" 
              className="px-10 py-5 rounded-2xl font-black text-sm uppercase tracking-widest border-2 border-white/20 text-white hover:bg-white/10 transition-all duration-300 flex items-center justify-center"
            >
              Explore Showrooms
            </Link>
          </div>

          {/* Mini Stats */}
          <div className="flex gap-16 pt-12 border-t border-white/10">
            <div className="space-y-1">
              <p className="text-2xl font-black italic tracking-tight">2.5k+</p>
              <p className="text-[10px] text-white/40 uppercase font-bold tracking-widest">Premium Pieces</p>
            </div>
            <div className="space-y-1">
              <p className="text-2xl font-black italic tracking-tight">10+</p>
              <p className="text-[10px] text-white/40 uppercase font-bold tracking-widest">Kenyan Locations</p>
            </div>
          </div>
        </motion.div>

        {/* Hero Image / Composition */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="relative"
        >
          <div className="relative z-10 p-2 bg-gradient-to-br from-white/20 to-transparent backdrop-blur-3xl rounded-[3rem] shadow-3xl">
            <div className="rounded-[2.5rem] overflow-hidden">
               <img
                 src={HERO_CONTENT.imageUrl}
                 alt="Premium Furniture"
                 className="w-full h-[600px] object-cover hover:scale-105 transition-transform duration-1000"
               />
            </div>
          </div>
          
          {/* Decorative Floating Element */}
          <motion.div
            animate={{ y: [0, -20, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -bottom-10 -left-10 bg-white/95 backdrop-blur-xl p-8 rounded-[2rem] shadow-2xl border border-white hidden lg:block"
          >
            <div className="flex items-center gap-5">
              <div className="bg-accent p-4 rounded-2xl shadow-lg text-white">
                <ShoppingCart className="w-7 h-7" />
              </div>
              <div>
                <p className="text-xs uppercase tracking-widest font-bold text-gray-400">Best Seller</p>
                <p className="text-lg font-heading font-black text-primary italic">Hollyann Sofa</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

