import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useCartStore } from '../../hooks/useCartStore';
import { 
  ArrowRight, 
  ChevronLeft,
  Truck,
  ShieldCheck,
  CreditCard,
  CheckCircle2,
  MapPin,
  Phone,
  User,
  Mail,
  Building
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { cn } from '../../lib/utils';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../ui/card';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';

export const CheckoutPage: React.FC = () => {
  const { items, totalPrice, clearCart } = useCartStore();
  const navigate = useNavigate();
  const [isOrdered, setIsOrdered] = useState(false);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-KE', {
      style: 'currency',
      currency: 'KES',
      maximumFractionDigits: 0
    }).format(price);
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setIsOrdered(true);
    setTimeout(() => {
      clearCart();
    }, 500);
  };

  if (isOrdered) {
    return (
      <div className="min-h-screen pt-32 pb-20 px-6 flex items-center justify-center bg-[#FDFBF7]">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-12 rounded-[2rem] shadow-2xl text-center max-w-xl space-y-8 border-2 border-[#F5E6C8] relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-full h-2 bg-accent" />
          <div className="w-24 h-24 bg-green-50 text-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
             <CheckCircle2 className="w-12 h-12" />
          </div>
          <div className="space-y-4">
            <h1 className="text-4xl font-heading font-black italic tracking-tighter text-primary">Order Confirmed!</h1>
            <p className="text-gray-500 text-lg">Thank you for choosing Homelux. Your luxury pieces are being prepared for delivery.</p>
          </div>
          <div className="bg-gray-50 rounded-3xl p-8 space-y-4 border border-gray-100 text-left">
             <div className="flex justify-between text-sm">
                <span className="text-gray-400">Order Number</span>
                <span className="font-bold text-primary">#HLX-{Math.floor(Math.random() * 90000) + 10000}</span>
             </div>
             <div className="flex justify-between text-sm">
                <span className="text-gray-400">Estimated Delivery</span>
                <span className="font-bold text-primary">3-5 Business Days</span>
             </div>
          </div>
          <Button 
            onClick={() => navigate('/')}
            className="w-full bg-primary py-8 rounded-[2rem] font-bold text-lg hover:bg-accent transition-all shadow-xl h-auto"
          >
            Return to Store
          </Button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-32 pb-24 bg-[#FDFBF7] px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-16">
          <div className="flex-1 space-y-12">
            <div className="flex items-center justify-between">
              <button onClick={() => navigate('/cart')} className="flex items-center gap-2 text-sm font-bold text-gray-400 hover:text-primary transition-colors">
                <ChevronLeft className="w-4 h-4" /> Back to Bag
              </button>
              <h1 className="text-4xl font-heading font-black italic tracking-tighter text-primary uppercase">Secure Checkout</h1>
            </div>

            <form onSubmit={handlePlaceOrder} className="space-y-12">
              {/* Customer Info */}
              <Card className="rounded-[2.5rem] border-none shadow-xl shadow-primary/5 overflow-hidden bg-white">
                <CardHeader className="bg-primary/5 p-8 border-b border-gray-50">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center shadow-sm">
                        <User className="w-6 h-6 text-accent" />
                    </div>
                    <div>
                        <CardTitle className="text-2xl font-black italic text-primary">Customer Details</CardTitle>
                        <CardDescription>We'll use this for order confirmation</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <Label htmlFor="fullName" className="text-xs uppercase tracking-widest font-bold text-gray-400">Full Name</Label>
                    <div className="relative">
                      <Input id="fullName" placeholder="John Doe" required className="pl-12 h-14 rounded-2xl border-gray-100 bg-gray-50/50 focus:bg-white" />
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-300" />
                    </div>
                  </div>
                  <div className="space-y-3">
                    <Label htmlFor="email" className="text-xs uppercase tracking-widest font-bold text-gray-400">Email Address</Label>
                    <div className="relative">
                      <Input id="email" type="email" placeholder="john@example.com" required className="pl-12 h-14 rounded-2xl border-gray-100 bg-gray-50/50 focus:bg-white" />
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-300" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Shipping Address */}
              <Card className="rounded-[2.5rem] border-none shadow-xl shadow-primary/5 overflow-hidden bg-white">
                <CardHeader className="bg-primary/5 p-8 border-b border-gray-50">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center shadow-sm">
                        <MapPin className="w-6 h-6 text-accent" />
                    </div>
                    <div>
                        <CardTitle className="text-2xl font-black italic text-primary">Shipping Destination</CardTitle>
                        <CardDescription>Where should we deliver your luxury items?</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-8 space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-3">
                        <Label htmlFor="city" className="text-xs uppercase tracking-widest font-bold text-gray-400">City / Town</Label>
                        <div className="relative">
                        <Input id="city" placeholder="Nairobi" required className="pl-12 h-14 rounded-2xl border-gray-100 bg-gray-50/50" />
                        <Building className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-300" />
                        </div>
                    </div>
                    <div className="space-y-3">
                        <Label htmlFor="phone" className="text-xs uppercase tracking-widest font-bold text-gray-400">Phone Number</Label>
                        <div className="relative">
                        <Input id="phone" placeholder="+254 --- --- ---" required className="pl-12 h-14 rounded-2xl border-gray-100 bg-gray-50/50" />
                        <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-300" />
                        </div>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <Label htmlFor="address" className="text-xs uppercase tracking-widest font-bold text-gray-400">Street Address / Apartment / Estate</Label>
                    <div className="relative">
                      <Input id="address" placeholder="e.g., Riverside Drive, Apt 4B" required className="pl-12 h-14 rounded-2xl border-gray-100 bg-gray-50/50" />
                      <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-300" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Payment Method */}
              <Card className="rounded-[2.5rem] border-none shadow-xl shadow-primary/5 overflow-hidden bg-white">
                <CardHeader className="bg-primary/5 p-8 border-b border-gray-50">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center shadow-sm">
                        <CreditCard className="w-6 h-6 text-accent" />
                    </div>
                    <div>
                        <CardTitle className="text-2xl font-black italic text-primary">Payment Method</CardTitle>
                        <CardDescription>Select your preferred payment option</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-8">
                  <RadioGroup defaultValue="mpesa" className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex items-center space-x-4 border border-gray-100 p-6 rounded-3xl cursor-pointer hover:bg-gray-50 transition-colors">
                      <RadioGroupItem value="mpesa" id="mpesa" />
                      <Label htmlFor="mpesa" className="flex-1 cursor-pointer font-bold text-primary flex items-center justify-between">
                         <span>M-Pesa Express</span>
                         <span className="text-[10px] bg-green-100 text-green-600 px-2 py-1 rounded">Fastest</span>
                      </Label>
                    </div>
                    <div className="flex items-center space-x-4 border border-gray-100 p-6 rounded-3xl cursor-pointer hover:bg-gray-50 transition-colors">
                      <RadioGroupItem value="card" id="card" />
                      <Label htmlFor="card" className="flex-1 cursor-pointer font-bold text-primary">Credit / Debit Card</Label>
                    </div>
                  </RadioGroup>
                </CardContent>
              </Card>

              <Button 
                type="submit" 
                className="w-full bg-accent text-white py-10 rounded-[2.5rem] font-bold text-xl shadow-2xl hover:bg-primary transition-all active:scale-95 flex items-center justify-center gap-4 h-auto group"
              >
                Place Secure Order <ArrowRight className="w-7 h-7 group-hover:translate-x-2 transition-transform" />
              </Button>
            </form>
          </div>

          {/* Summary Sidebar */}
          <aside className="lg:w-[450px]">
            <div className="sticky top-32 space-y-8">
                <Card className="rounded-[2rem] border-2 border-[#F5E6C8] bg-primary text-white shadow-2xl p-2">
                    <CardHeader className="p-10 pb-0">
                        <CardTitle className="text-3xl font-heading font-black italic text-white flex items-center justify-between">
                            Order Summary
                            <span className="text-sm bg-white/10 px-4 py-1.5 rounded-full not-italic font-bold text-accent">{items.length} items</span>
                        </CardTitle>
                        <hr className="border-white/10 mt-6" />
                    </CardHeader>
                    <CardContent className="p-10 space-y-8">
                        <div className="space-y-6 max-h-[400px] overflow-y-auto pr-4 custom-scrollbar">
                           {items.map((item) => (
                             <div key={item.id} className="flex gap-4">
                               <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 bg-white/10">
                                 <img src={item.imageUrl} className="w-full h-full object-cover" alt="" />
                               </div>
                               <div className="flex-1 min-w-0">
                                 <p className="font-bold text-sm truncate">{item.title}</p>
                                 <p className="text-xs text-white/50">{item.quantity} × {formatPrice(item.price)}</p>
                               </div>
                               <p className="font-bold text-sm">{formatPrice(item.price * item.quantity)}</p>
                             </div>
                           ))}
                        </div>

                        <div className="space-y-4 pt-4 border-t border-white/10">
                            <div className="flex justify-between text-sm text-white/60">
                                <span>Subtotal</span>
                                <span className="text-white font-bold">{formatPrice(totalPrice())}</span>
                            </div>
                            <div className="flex justify-between text-sm text-white/60">
                                <span>Delivery Fee</span>
                                <span className="text-white font-bold uppercase tracking-widest text-[10px]">Free</span>
                            </div>
                            <div className="flex justify-between items-end pt-4">
                                <div>
                                    <p className="text-xs tracking-widest uppercase font-bold text-accent mb-1">Total to Pay</p>
                                    <p className="text-4xl font-black tracking-tighter italic">{formatPrice(totalPrice())}</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white/5 rounded-3xl p-6 flex items-center gap-4 border border-white/10">
                           <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center text-white">
                              <ShieldCheck className="w-5 h-5" />
                           </div>
                           <p className="text-xs font-medium text-white/60 opacity-80 leading-relaxed">
                              Your transaction is encrypted. We don't store your full card details in our servers.
                           </p>
                        </div>
                    </CardContent>
                </Card>

                <div className="bg-accent/5 rounded-[2.5rem] p-8 border border-accent/10 flex items-center gap-6">
                   <div className="w-16 h-16 rounded-3xl bg-accent flex items-center justify-center text-white shadow-lg">
                      <Truck className="w-8 h-8" />
                   </div>
                   <div>
                      <h4 className="font-bold text-primary">Need urgent delivery?</h4>
                      <p className="text-xs text-gray-500">Contact our concierge for same-day priority shipping options.</p>
                   </div>
                </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};
