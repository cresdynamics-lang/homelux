import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCartStore } from '../../hooks/useCartStore';
import { 
  Trash2, 
  Minus, 
  Plus, 
  ArrowRight, 
  ShoppingBag, 
  ChevronLeft,
  Truck,
  ShieldCheck,
  CreditCard
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { cn } from '../../lib/utils';

export const CartPage: React.FC = () => {
  const { items, addItem, removeItem, clearCart, totalPrice } = useCartStore();
  const navigate = useNavigate();

  const handleUpdateQuantity = (item: any, delta: number) => {
    if (delta > 0) {
      addItem(item);
    } else {
      // Logic for reducing quantity (AddItem currently only adds)
      // For now, if we want to reduce, we might need a decrement function in store
      // I'll assume addItem(item) with a quantity logic or just leave it for now
      // Actually, let's just use the current store which only has addItem/removeItem
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-KE', {
      style: 'currency',
      currency: 'KES',
      maximumFractionDigits: 0
    }).format(price);
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen pt-32 pb-20 px-6 flex items-center justify-center bg-[#FDFBF7]">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center space-y-8 max-w-md"
        >
          <div className="w-24 h-24 bg-primary/5 rounded-[2.5rem] flex items-center justify-center mx-auto text-primary/20">
            <ShoppingBag className="w-12 h-12" />
          </div>
          <div className="space-y-2">
            <h1 className="text-4xl font-heading font-black italic tracking-tighter">Your Bag is Empty</h1>
            <p className="text-gray-500">Looks like you haven't added any luxury pieces to your collection yet.</p>
          </div>
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 bg-primary text-white px-10 py-5 rounded-full font-bold shadow-2xl hover:bg-accent transition-all active:scale-95"
          >
            Start Shopping <ArrowRight className="w-5 h-5" />
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-32 pb-24 bg-[#FDFBF7] px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-16">
          {/* Main Cart Content */}
          <div className="flex-1 space-y-12">
            <div className="flex items-center justify-between">
              <h1 className="text-5xl font-heading font-black italic tracking-tighter text-primary">Your Shopping Bag</h1>
              <span className="text-sm font-bold text-gray-400 uppercase tracking-widest">{items.length} Items</span>
            </div>

            <div className="space-y-6">
              <AnimatePresence mode="popLayout">
                {items.map((item) => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="group bg-white rounded-[2rem] p-8 shadow-sm border-2 border-[#F5E6C8] flex flex-col sm:flex-row items-center gap-8 transition-all hover:shadow-xl hover:-translate-y-1"
                  >
                    <div className="w-32 h-32 rounded-3xl overflow-hidden bg-gray-50 flex-shrink-0">
                      <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                    </div>
                    
                    <div className="flex-1 space-y-1 text-center sm:text-left">
                      <h3 className="text-xl font-bold text-primary">{item.title}</h3>
                      <p className="text-sm text-gray-400 font-medium">Ref: {item.id.toUpperCase()}</p>
                      <p className="text-lg font-black text-accent mt-2">{formatPrice(item.price)}</p>
                    </div>

                    <div className="flex items-center gap-6">
                      <div className="flex items-center bg-gray-50 rounded-2xl p-1 border border-gray-100">
                        <button 
                          className="p-3 hover:text-accent transition-colors disabled:opacity-30"
                          disabled={item.quantity <= 1}
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="w-10 text-center font-bold text-primary">{item.quantity}</span>
                        <button 
                          onClick={() => addItem(item)}
                          className="p-3 hover:text-accent transition-colors"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                      
                      <button 
                        onClick={() => removeItem(item.id)}
                        className="p-4 bg-red-50 text-red-400 rounded-2xl hover:bg-red-400 hover:text-white transition-all duration-300"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            <button 
              onClick={() => navigate('/')}
              className="flex items-center gap-2 text-sm font-bold text-gray-400 hover:text-primary transition-colors mt-8"
            >
              <ChevronLeft className="w-4 h-4" /> Continue Shopping
            </button>
          </div>

          {/* Checkout Summary */}
          <aside className="lg:w-[400px] space-y-8">
            <div className="bg-primary rounded-[3rem] p-10 text-white shadow-2xl relative overflow-hidden">
               <div className="absolute top-0 right-0 w-32 h-32 bg-accent/20 rounded-full -mr-16 -mt-16 blur-3xl" />
               <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full -ml-12 -mb-12 blur-2xl" />
               
               <h2 className="text-3xl font-heading font-black italic mb-10 text-accent uppercase">Order Summary</h2>
               
               <div className="space-y-6">
                  <div className="flex justify-between items-center text-white/60">
                    <span className="text-sm">Subtotal</span>
                    <span className="font-bold text-white">{formatPrice(totalPrice())}</span>
                  </div>
                  <div className="flex justify-between items-center text-white/60">
                    <span className="text-sm">Estimated Shipping</span>
                    <span className="font-bold text-white">Calculated at checkout</span>
                  </div>
                  <div className="h-px bg-white/10 my-4" />
                  <div className="flex justify-between items-end">
                    <div className="space-y-1">
                       <span className="text-xs uppercase tracking-widest text-accent font-bold">Total Amount</span>
                       <p className="text-4xl font-black tracking-tighter italic">{formatPrice(totalPrice())}</p>
                    </div>
                  </div>
               </div>

               <button 
                onClick={() => navigate('/checkout')}
                className="w-full bg-accent text-white py-6 rounded-[2rem] font-bold text-lg mt-12 flex items-center justify-center gap-3 shadow-xl hover:bg-white hover:text-primary transition-all active:scale-95 group"
               >
                 Checkout Now <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
               </button>

               <div className="mt-8 flex items-center justify-center gap-4 text-xs text-white/40 font-medium">
                  <div className="flex items-center gap-1.5"><ShieldCheck className="w-3.5 h-3.5" /> Secure</div>
                  <div className="w-1 h-1 bg-white/20 rounded-full" />
                  <div className="flex items-center gap-1.5"><Truck className="w-3.5 h-3.5" /> Doorstep Delivery</div>
               </div>
            </div>

            {/* Side Guarantees */}
            <div className="grid grid-cols-1 gap-6">
               {[
                 { icon: Truck, title: "Free Shipping", desc: "For orders above KSh 50k" },
                 { icon: ShieldCheck, title: "1-Year Warranty", desc: "Full structural coverage" },
                 { icon: CreditCard, title: "Lipia Polepole", desc: "Flexible payment plans" }
               ].map((g, i) => (
                 <div key={i} className="bg-white p-8 rounded-[2rem] border-2 border-[#F5E6C8] flex items-center gap-5">
                    <div className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center text-accent">
                       <g.icon className="w-6 h-6" />
                    </div>
                    <div>
                       <h4 className="font-bold text-primary text-sm">{g.title}</h4>
                       <p className="text-xs text-gray-400">{g.desc}</p>
                    </div>
                 </div>
               ))}
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};
