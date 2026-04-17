import React from 'react';
import { Star, ShoppingCart, Eye } from 'lucide-react';
import { useCartStore } from '../../hooks/useCartStore';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

interface ProductCardProps {
  id: string;
  title: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  imageUrl: string;
  badge?: string;
  discountLabel?: string;
}

export const ProductCard: React.FC<ProductCardProps> = (product) => {
  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem({
      id: product.id,
      title: product.title,
      price: product.price,
      imageUrl: product.imageUrl,
    });
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-KE', {
      style: 'currency',
      currency: 'KES',
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <motion.div
      key={product.id}
      whileHover={{ 
        y: -6,
        boxShadow: "0 20px 40px rgba(146, 64, 14, 0.18)"
      }}
      layout
      className="group bg-white rounded-[2rem] overflow-hidden transition-all duration-500 cursor-pointer border-2 border-[#F5E6C8] flex flex-col h-full"
    >
      {/* Image Wrapper */}
      <Link to={`/product/${product.id}`} className="relative overflow-hidden aspect-square block">
        <img
          src={product.imageUrl}
          alt={product.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.08]"
        />
        
        {/* Badges */}
        <div className="absolute top-5 left-5 flex flex-col gap-2">
          {product.badge && (
            <span className="bg-primary/90 backdrop-blur-md text-white text-[10px] font-bold px-4 py-1.5 rounded-full uppercase tracking-widest shadow-lg">
              {product.badge}
            </span>
          )}
          {product.discountLabel && (
            <span className="bg-accent text-white text-[10px] font-bold px-4 py-1.5 rounded-full uppercase tracking-widest shadow-lg">
              {product.discountLabel}
            </span>
          )}
        </div>

        {/* Quick Actions Overlay */}
        <div className="absolute inset-x-5 bottom-5 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500 flex gap-2">
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={handleAddToCart}
            className="flex-1 bg-white text-primary flex items-center justify-center gap-2 py-3.5 rounded-2xl font-bold shadow-xl hover:bg-primary hover:text-white transition-all cursor-pointer"
          >
            <ShoppingCart className="w-5 h-5" />
            <span className="text-xs">Add to Cart</span>
          </motion.button>
          <div className="aspect-square bg-white/90 backdrop-blur-md text-primary flex items-center justify-center p-3.5 rounded-2xl shadow-xl hover:bg-accent hover:text-white transition-all">
            <Eye className="w-5 h-5" />
          </div>
        </div>
      </Link>

      {/* Content */}
      <div className="p-8 space-y-4 flex-1 flex flex-col">
        <div className="flex items-center gap-2">
          <div className="flex text-accent">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-3.5 h-3.5 ${i < Math.floor(product.rating) ? 'fill-current' : 'text-gray-200'}`}
              />
            ))}
          </div>
          <span className="text-[11px] text-gray-400 font-bold tracking-tight uppercase">({product.reviewCount} Reviews)</span>
        </div>

        <Link to={`/product/${product.id}`} className="block group/title">
          <h3 className="font-heading text-xl font-bold text-gray-800 line-clamp-1 group-hover/title:text-accent transition-colors">
            {product.title}
          </h3>
        </Link>

        <div className="mt-auto pt-2 flex items-baseline gap-3">
          <span className="text-2xl font-black text-primary tracking-tighter">
            {formatPrice(product.price)}
          </span>
          {product.originalPrice && (
            <span className="text-sm text-gray-400 line-through font-medium">
              {formatPrice(product.originalPrice)}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
};

