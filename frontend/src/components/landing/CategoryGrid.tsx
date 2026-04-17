import React from 'react';
import { CATEGORIES } from '../../data/furnitureData';
import { motion } from 'framer-motion';
import { ArrowUpRight, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const CategoryGrid: React.FC = () => {
  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-1/3 h-1/2 bg-accent/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-1/3 h-1/2 bg-primary/5 blur-[120px] rounded-full translate-y-1/2 -translate-x-1/2" />

      <div className="max-w-7xl mx-auto px-6 space-y-16 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="space-y-4 max-w-2xl">
            <h2 className="text-4xl md:text-6xl font-heading font-black italic tracking-tighter text-primary">
              Rooms That Tell <br/><span className="text-accent underline decoration-primary/10">Your Story</span>
            </h2>
            <p className="text-gray-500 font-light text-lg">
              Explore our diverse range of premium furniture tailored for every corner of your life.
            </p>
          </div>
          <Link to="/category/living-room" className="group flex items-center gap-3 text-sm font-bold uppercase tracking-widest text-primary hover:text-accent transition-colors">
            View Collections <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {CATEGORIES.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <Link
                to={`/category/${category.id}`}
                className="group relative block h-[500px] rounded-[2.5rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-700"
              >
                <img
                  src={category.imageUrl}
                  alt={category.title}
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/20 to-transparent group-hover:via-primary/40 transition-all duration-500" />
                
                <div className="absolute inset-0 p-10 flex flex-col justify-end items-start text-left space-y-4">
                  <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-white mb-2">
                     <category.icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-3xl text-white font-heading font-black italic tracking-tighter">{category.title}</h3>
                  <p className="text-white/60 text-xs font-light line-clamp-2">{category.description}</p>
                  
                  <div className="pt-4 flex items-center gap-2 text-accent font-bold text-[10px] uppercase tracking-[0.2em] opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                    Explore Now <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

