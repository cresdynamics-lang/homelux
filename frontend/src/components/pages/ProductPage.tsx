import React, { useMemo, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { PRODUCTS } from '../../data/furnitureData';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Star, 
  ShoppingCart, 
  Heart, 
  Share2, 
  Truck, 
  ShieldCheck, 
  RotateCcw, 
  ChevronRight,
  Minus,
  Plus,
  Info
} from 'lucide-react';
import { useCartStore } from '../../hooks/useCartStore';
import { ProductCard } from '../shared/ProductCard';
import { cn } from '../../lib/utils';

export const ProductPage: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const [quantity, setQuantity] = useState(1);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const addItem = useCartStore((state) => state.addItem);
  const navigate = useNavigate();

  const product = useMemo(() => 
    PRODUCTS.find(p => p.id === productId), 
  [productId]);

  const relatedProducts = useMemo(() => 
    PRODUCTS.filter(p => p.category === product?.category && p.id !== productId).slice(0, 4),
  [product, productId]);

  const images = useMemo(() => {
    if (!product) return [];
    return product.images && product.images.length > 0 ? product.images : [product.imageUrl];
  }, [product]);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-KE', {
      style: 'currency',
      currency: 'KES',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const handleBuyNow = () => {
    if (product) {
      addItem({ id: product.id, title: product.title, price: product.price, imageUrl: product.imageUrl });
      navigate('/cart');
    }
  };

  if (!product) return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-heading font-bold">Product Not Found</h2>
        <Link to="/" className="text-accent hover:underline">Return Home</Link>
      </div>
    </div>
  );

  return (
    <div className="bg-[#FDFBF7] min-h-screen">
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-sm text-gray-400 mb-12">
          <Link to="/" className="hover:text-primary transition-colors">Home</Link>
          <ChevronRight className="w-4 h-4" />
          <Link to={`/category/${product.category}`} className="hover:text-primary transition-colors capitalize">{product.category.replace('-', ' ')}</Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-gray-900 font-bold">{product.title}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Gallery */}
          <div className="space-y-6">
            <motion.div 
              key={activeImageIndex}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              className="aspect-square rounded-[3rem] overflow-hidden bg-white shadow-2xl border border-white"
            >
              <img 
                src={images[activeImageIndex]} 
                className="w-full h-full object-cover" 
                alt={product.title} 
              />
            </motion.div>
            <div className="grid grid-cols-5 gap-4">
              {images.map((img, i) => (
                <button 
                  key={i} 
                  onClick={() => setActiveImageIndex(i)}
                  className={cn(
                    "aspect-square rounded-2xl overflow-hidden cursor-pointer border-2 transition-all hover:scale-105 bg-white",
                    activeImageIndex === i ? "border-accent shadow-lg" : "border-transparent opacity-60 hover:opacity-100"
                  )}
                >
                  <img src={img} className="w-full h-full object-cover" alt="Thumb" />
                </button>
              ))}
            </div>
          </div>

          {/* Details */}
          <div className="space-y-10">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                {product.badge && (
                  <span className="inline-block bg-accent/10 text-accent text-[10px] font-bold uppercase tracking-widest px-4 py-1.5 rounded-full">
                    {product.badge}
                  </span>
                )}
                {product.color && (
                  <span className="inline-block bg-primary text-white text-[10px] font-bold uppercase tracking-widest px-4 py-1.5 rounded-full">
                    {product.color}
                  </span>
                )}
              </div>
              <h1 className="text-3xl md:text-4xl font-heading font-black text-primary tracking-tight leading-tight italic">
                {product.title}
              </h1>
              <div className="flex items-center gap-4">
                <div className="flex text-accent">
                   {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'fill-current' : 'text-gray-200'}`} />
                  ))}
                </div>
                <span className="text-sm text-gray-400 font-medium">({product.reviewCount} verified signatures)</span>
              </div>
            </div>

            <div className="flex items-baseline gap-6">
              <span className="text-3xl font-black text-primary tracking-tight italic">
                {formatPrice(product.price)}
              </span>
              {product.originalPrice && (
                <span className="text-xl text-gray-400 line-through font-medium">
                  {formatPrice(product.originalPrice)}
                </span>
              )}
            </div>

            <p className="text-gray-500 leading-relaxed text-xl font-light">
              {product.description}
            </p>

            <div className="space-y-8 pt-4">
              <div className="space-y-2">
                 <p className="text-xs font-bold uppercase tracking-widest text-gray-400">Quantity</p>
                 <div className="flex items-center bg-white rounded-2xl border border-gray-100 p-1 shadow-sm w-max">
                   <button 
                     onClick={() => setQuantity(Math.max(1, quantity - 1))}
                     className="p-3 hover:bg-gray-50 rounded-xl transition-colors"
                   >
                     <Minus className="w-4 h-4" />
                   </button>
                   <span className="w-12 text-center font-bold">{quantity}</span>
                   <button 
                     onClick={() => setQuantity(quantity + 1)}
                     className="p-3 hover:bg-gray-50 rounded-xl transition-colors"
                   >
                     <Plus className="w-4 h-4" />
                   </button>
                 </div>
              </div>

              <div className="flex flex-col sm:flex-row items-stretch gap-4">
                <button 
                  onClick={() => addItem({ id: product.id, title: product.title, price: product.price, imageUrl: product.imageUrl })}
                  className="flex-1 bg-white border-2 border-primary text-primary py-5 rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-primary hover:text-white transition-all active:scale-[0.98] cursor-pointer"
                >
                  <ShoppingCart className="w-5 h-5" />
                  Add to Bag
                </button>
                <button 
                  onClick={handleBuyNow}
                  className="flex-[1.5] bg-accent text-white py-5 rounded-2xl font-bold flex items-center justify-center gap-3 shadow-2xl shadow-accent/20 hover:bg-primary transition-all active:scale-[0.98] cursor-pointer"
                >
                  Buy Now — Express Checkout
                </button>
                <button className="p-5 border border-gray-100 bg-white rounded-2xl hover:text-accent transition-colors flex items-center justify-center">
                  <Heart className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-10 border-t border-gray-100">
               <div className="flex items-center gap-4 group">
                <div className="w-12 h-12 rounded-2xl bg-accent/10 flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-white transition-all">
                  <Truck className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider">Fast Delivery</p>
                  <p className="text-[10px] text-gray-400 italic">4-5 working days</p>
                </div>
              </div>
              <div className="flex items-center gap-4 group">
                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider">Homelux Guarantee</p>
                  <p className="text-[10px] text-gray-400 italic">12 Months Cover</p>
                </div>
              </div>
              <div className="flex items-center gap-4 group">
                <div className="w-12 h-12 rounded-2xl bg-gray-100 flex items-center justify-center text-gray-600 group-hover:bg-gray-600 group-hover:text-white transition-all">
                  <RotateCcw className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider">Secure</p>
                  <p className="text-[10px] text-gray-400 italic">Doorstep Delivery</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <section className="mt-32 space-y-16">
          <div className="bg-white rounded-[2rem] p-16 shadow-sm border border-gray-50 flex flex-col md:flex-row gap-20">
              <div className="flex-1 space-y-12">
                <div className="space-y-6">
                   <div className="inline-flex items-center gap-2 bg-primary/5 text-primary px-5 py-2 rounded-full text-[10px] font-bold tracking-widest uppercase">
                    <Info className="w-4 h-4" /> The Homelux Standard
                  </div>
                  <h3 className="text-2xl font-heading font-black text-primary italic leading-tight">Meticulously Crafted <br/> For Your Living Space.</h3>
                  <p className="text-gray-500 font-light text-lg">
                    Each piece in our collection is selected based on three pillars: durability, timeless design, and unmatched comfort. We source from the world's most reputable manufacturers to ensure that Homelux quality is a constant in your home.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-8">
                   {product.features.map((feature, i) => (
                    <div key={i} className="flex items-start gap-4 p-4 rounded-3xl hover:bg-gray-50 transition-colors">
                      <div className="w-1.5 h-1.5 rounded-full bg-accent mt-1.5" />
                      <span className="text-gray-600 text-sm font-medium">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="w-full md:w-[400px] flex-shrink-0">
                 <div className="bg-primary rounded-[3rem] p-10 text-white space-y-8 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-accent/20 rounded-full blur-3xl" />
                    <h4 className="text-2xl font-black italic tracking-tighter">Specifications</h4>
                    <div className="space-y-6">
                       <div className="flex justify-between py-4 border-b border-white/10">
                         <span className="text-white/40 text-xs uppercase tracking-widest font-bold">Material</span>
                         <span className="font-bold text-accent">{product.material || "Premium Selection"}</span>
                       </div>
                       <div className="flex justify-between py-4 border-b border-white/10">
                         <span className="text-white/40 text-xs uppercase tracking-widest font-bold">Primary Color</span>
                         <span className="font-bold text-accent">{product.color || "As Pictured"}</span>
                       </div>
                       <div className="flex justify-between py-4 border-b border-white/10">
                         <span className="text-white/40 text-xs uppercase tracking-widest font-bold">Dimensions</span>
                         <span className="font-bold">{product.dimensions || "Inquire for details"}</span>
                       </div>
                       <div className="flex justify-between py-4">
                         <span className="text-white/40 text-xs uppercase tracking-widest font-bold">SKU</span>
                         <span className="font-bold opacity-50">HLX-{product.id.slice(0, 5).toUpperCase()}</span>
                       </div>
                    </div>
                 </div>
              </div>
          </div>
        </section>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section className="mt-32 space-y-12">
            <div className="flex items-end justify-between">
              <div className="space-y-4">
                <h2 className="text-5xl font-heading font-black italic tracking-tighter">Complete The Look</h2>
                <div className="h-1.5 w-24 bg-accent rounded-full" />
              </div>
              <Link to={`/category/${product.category}`} className="text-sm font-bold text-accent hover:underline flex items-center gap-1 group">
                View Collection <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {relatedProducts.map(p => (
                <ProductCard key={p.id} {...p} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};
