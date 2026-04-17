import React from 'react';
import { motion } from 'framer-motion';
import { History, Award, Users, Globe, ChevronRight } from 'lucide-react';

export const AboutPage: React.FC = () => {
  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-primary/95 flex items-center justify-center">
          <div className="absolute inset-0 opacity-20">
             {/* Decorative pattern or abstract shape can go here */}
             <div className="blob left-0 top-0 opacity-50" />
             <div className="blob right-0 bottom-0 opacity-50 scale-150" />
          </div>
          <div className="relative z-10 text-center space-y-6 max-w-4xl px-6">
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-accent font-bold tracking-[0.4em] uppercase text-xs"
            >
              Since 2007
            </motion.p>
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl font-heading font-black text-white italic tracking-tight"
            >
              The Story of <span className="text-accent underline decoration-white/20 underline-offset-8">Homelux</span>
            </motion.h1>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="max-w-7xl mx-auto px-6 py-32 grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
        <div className="space-y-12">
          <div className="space-y-6">
            <h2 className="text-2xl font-heading font-black text-primary leading-tight uppercase">
              A Humble Beginning, <br/>A Grand Vision.
            </h2>
            <p className="text-gray-600 text-lg font-light leading-relaxed">
              Founded in 2007 as a humble store in the coastal city of Mombasa, Homelux was born from a simple belief: <span className="text-primary font-bold">Premium lifestyle shouldn't be a luxury for the few.</span>
            </p>
            <p className="text-gray-600 text-lg font-light leading-relaxed">
              Over the last two decades, we've grown into a nationwide household name, operating 10 showrooms across Kenya and expanding our horizons into Tanzania.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8">
            <div className="space-y-2">
              <p className="text-3xl font-black text-accent">10+</p>
              <p className="text-xs font-bold uppercase tracking-widest text-gray-400">Showrooms</p>
            </div>
            <div className="space-y-2">
              <p className="text-3xl font-black text-primary">2017</p>
              <p className="text-xs font-bold uppercase tracking-widest text-gray-400">Global Design Standard</p>
            </div>
          </div>
        </div>

        <div className="relative">
          <div className="aspect-[4/5] rounded-[3rem] overflow-hidden shadow-2xl skew-y-2 hover:skew-y-0 transition-all duration-700">
            <img 
              src="https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?q=80&w=2070&auto=format&fit=crop" 
              className="w-full h-full object-cover" 
              alt="Our Story" 
            />
          </div>
          <div className="absolute -bottom-10 -left-10 bg-accent p-12 rounded-[2rem] text-white shadow-2xl hidden md:block">
            <Award className="w-12 h-12 mb-4" />
            <p className="text-xl font-black italic uppercase">Kenya's #1 Choice</p>
          </div>
        </div>
      </section>

      {/* Homelux Heritage Section */}
      <section className="bg-primary/5 py-32">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="order-2 lg:order-1">
             <div className="bg-white p-2 rounded-[3rem] shadow-xl rotate-[-2deg]">
                <div className="aspect-video rounded-[2.5rem] overflow-hidden bg-white flex items-center justify-center p-20">
                   <h2 className="text-4xl font-black tracking-widest opacity-10">HOMELUX</h2>
                   <div className="absolute inset-x-0 bottom-0 h-1 bg-accent" />
                </div>
             </div>
          </div>
          <div className="space-y-8 order-1 lg:order-2">
            <div className="inline-flex items-center gap-2 bg-accent/20 text-accent px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest">
              Unmatched Craftsmanship
            </div>
            <h2 className="text-2xl font-heading font-black text-primary italic uppercase">Global Standards, Local Touch.</h2>
            <p className="text-gray-600 font-light text-lg">
              In 2017, we reached a major milestone by refining our supply chain and partnering with international design giants to bring world-class consistency to Kenyan homes.
            </p>
            <p className="text-gray-600 font-light text-lg">
              This evolution allows us to deliver high-end design and manufacturing consistency, backed by our "Fair Pricing Model" that ensures premium luxury remains accessible to all Kenyans.
            </p>
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="max-w-7xl mx-auto px-6 py-32">
        <div className="text-center space-y-4 mb-20">
          <h2 className="text-3xl font-heading font-black text-primary uppercase">The Homelux Pillars</h2>
          <div className="h-1 w-16 bg-accent rounded-full mx-auto" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {[
            { 
              title: "Quality First", 
              desc: "Every piece of furniture undergoes rigorous testing to ensure it meets international durability standards.",
              icon: History 
            },
            { 
              title: "Customer Centric", 
              desc: "From free delivery in Kenya to professional assembly, we put your convenience at the heart of our operations.",
              icon: Users 
            },
            { 
              title: "Transparency", 
              desc: "Our Fair Pricing Model (FPM) cuts out middlemen to pass direct savings to our customers.",
              icon: Globe 
            }
          ].map((item, i) => (
            <div key={i} className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-gray-50 hover:shadow-xl transition-all duration-500 group">
              <div className="w-16 h-16 rounded-2xl bg-primary/5 flex items-center justify-center text-primary mb-8 group-hover:bg-primary group-hover:text-white transition-all">
                <item.icon className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
              <p className="text-gray-500 font-light leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
