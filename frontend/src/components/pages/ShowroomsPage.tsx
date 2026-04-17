import React from 'react';
import { motion } from 'framer-motion';
import { SHOWROOMS } from '../../data/furnitureData';
import { MapPin, Clock, Phone, Navigation, Star } from 'lucide-react';

export const ShowroomsPage: React.FC = () => {
  return (
    <div className="bg-[#FDFBF7] min-h-screen">
      {/* Hero Section */}
      <section className="bg-primary pt-32 pb-20 px-6 text-center text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="blob left-10 top-0 scale-150" />
          <div className="blob right-10 bottom-0 scale-125" />
        </div>
        <div className="max-w-4xl mx-auto space-y-6 relative z-10">
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-accent font-bold tracking-[0.3em] uppercase text-xs"
          >
            Visit Us Today
          </motion.p>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-heading font-black italic tracking-tight"
          >
            Our Kenyan <span className="text-accent underline decoration-white/20">Showrooms</span>
          </motion.h1>
          <p className="text-white/60 text-lg font-light">
            Experience luxury firsthand across our 10+ locations. Each showroom is designed to offer an immersive interior design experience.
          </p>
        </div>
      </section>

      {/* Grid Section */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {SHOWROOMS.map((showroom, idx) => (
            <motion.div
              key={showroom.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white rounded-[2.5rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 group border border-gray-50 flex flex-col"
            >
              <div className="h-64 bg-gray-100 relative overflow-hidden">
                {/* Mock image for each location */}
                <img 
                  src={`https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?q=80&w=2070&auto=format&fit=crop&sig=${idx}`} 
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" 
                  alt={showroom.name} 
                />
                <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-md px-4 py-2 rounded-full flex items-center gap-2 shadow-lg">
                  <Star className="w-4 h-4 text-accent fill-current" />
                  <span className="text-xs font-bold text-primary">Top Rated</span>
                </div>
              </div>
              <div className="p-10 space-y-6 flex-1 flex flex-col">
                <div className="space-y-2">
                  <h3 className="text-xl font-heading font-bold text-primary uppercase">{showroom.name}</h3>
                  <div className="flex items-start gap-2 text-gray-400">
                    <MapPin className="w-4 h-4 text-accent mt-1 flex-shrink-0" />
                    <p className="text-sm italic">{showroom.address}</p>
                  </div>
                </div>

                <p className="text-gray-500 font-light text-sm line-clamp-3">
                  {showroom.description}
                </p>

                <div className="space-y-4 pt-4 border-t border-gray-50 mt-auto">
                   <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-gray-400">
                         <Clock className="w-5 h-5" />
                      </div>
                      <div>
                         <p className="text-[10px] uppercase font-bold text-gray-400 tracking-widest">Opening Hours</p>
                         <p className="text-xs font-medium text-gray-700">{showroom.hours.weekday} (Wk)</p>
                      </div>
                   </div>
                   <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-gray-400">
                         <Phone className="w-5 h-5" />
                      </div>
                      <div>
                         <p className="text-[10px] uppercase font-bold text-gray-400 tracking-widest">Contact</p>
                         <p className="text-xs font-medium text-gray-700">+254 717 101010</p>
                      </div>
                   </div>
                </div>

                <button className="w-full mt-8 bg-primary text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-3 group hover:bg-accent transition-all shadow-xl shadow-primary/5 cursor-pointer">
                  <Navigation className="w-4 h-4 group-hover:rotate-45 transition-transform" />
                  Get Directions
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Global Partnership Section */}
      <section className="bg-primary py-24 mb-0">
         <div className="max-w-7xl mx-auto px-6 flex flex-col lg:flex-row items-center justify-between gap-12 text-center lg:text-left">
            <div className="space-y-4">
               <h2 className="text-2xl font-heading font-black text-white italic tracking-tight uppercase">Ready to See the Homelux Signature Collection?</h2>
               <p className="text-white/60 text-lg font-light">Visit any of our 10+ Homelux Boutique Showrooms across Kenya for exclusive international designs.</p>
            </div>
            <button className="bg-accent text-white px-10 py-5 rounded-2xl font-bold shadow-2xl hover:bg-white hover:text-primary transition-all active:scale-95 cursor-pointer">
               Find Closest Showroom
            </button>
         </div>
      </section>
    </div>
  );
};
