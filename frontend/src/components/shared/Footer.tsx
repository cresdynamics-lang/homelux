import { ArrowRight, Phone, Mail, MapPin, Share2, Camera, MessageSquare, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';
import { CATEGORIES } from '../../data/furnitureData';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-primary text-white pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-6">
        {/* Top Section */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 mb-20">
          <div className="lg:col-span-1 space-y-8">
            <Link to="/" className="text-3xl font-heading font-extrabold flex items-baseline tracking-tighter">
              <span className="text-white">Home</span>
              <span className="text-accent italic">LuX</span>
            </Link>
            <p className="text-gray-400 font-light leading-relaxed">
              Founded in 2007, Homelux is Kenya's premier choice for luxury living. We bring international standards of craftsmanship and design directly to your doorstep.
            </p>
            <div className="flex gap-4">
              {[MessageSquare, Camera, Share2, Globe].map((Icon, i) => (
                <a 
                  key={i} 
                  href="#" 
                  className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-accent hover:text-white transition-all duration-300"
                >
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:col-span-3 gap-12">
            <div className="space-y-6">
              <h4 className="text-lg font-bold font-heading tracking-wide uppercase text-accent">Categories</h4>
              <ul className="space-y-4">
                {CATEGORIES.map((cat) => (
                  <li key={cat.id}>
                    <Link to={`/category/${cat.id}`} className="text-gray-400 hover:text-white transition-colors">
                      {cat.title}
                    </Link>
                  </li>
                ))}
                <li><Link to="/category/new-arrivals" className="text-gray-400 hover:text-white transition-colors tracking-widest text-[10px] uppercase font-bold bg-accent/10 px-2 py-1 rounded">New Arrivals</Link></li>
              </ul>
            </div>

            <div className="space-y-6">
              <h4 className="text-lg font-bold font-heading tracking-wide uppercase text-accent">Company</h4>
              <ul className="space-y-4 text-gray-400">
                <li><Link to="/about" className="hover:text-white transition-colors">About Us</Link></li>
                <li><Link to="/showrooms" className="hover:text-white transition-colors">Our Showrooms</Link></li>
                <li><Link to="#" className="hover:text-white transition-colors">Careers</Link></li>
                <li><Link to="#" className="hover:text-white transition-colors">Blog & Interior Tips</Link></li>
                <li><Link to="#" className="hover:text-white transition-colors">Fair Pricing Model (FPM)</Link></li>
              </ul>
            </div>

            <div className="space-y-6">
              <h4 className="text-lg font-bold font-heading tracking-wide uppercase text-accent">Contact Us</h4>
              <ul className="space-y-4 text-gray-400">
                <li className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-accent" />
                  <span>+254 717 101010</span>
                </li>
                <li className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-accent" />
                  <span>info@homelux.co.ke</span>
                </li>
                <li className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-accent mt-1" />
                  <span>Two Rivers Mall, 1st Floor<br/>Nairobi, Kenya</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Homelux Heritage Section */}
        <div className="bg-white/5 border border-white/10 rounded-3xl p-8 mb-16">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="space-y-2 text-center md:text-left">
              <p className="text-xs uppercase tracking-[0.2em] font-bold text-accent">Our Commitment</p>
              <h3 className="text-xl font-heading font-bold">Homelux Premium Selection</h3>
              <p className="text-sm text-gray-400 max-w-xl">
                We pride ourselves on providing exclusive access to meticulously curated furniture. Every piece is selected to meet the highest standards of luxury and durability.
              </p>
            </div>
            <div className="h-12 w-32 bg-white/10 rounded-xl flex items-center justify-center grayscale hover:grayscale-0 transition-all duration-500 cursor-pointer">
              <span className="font-black text-2xl tracking-tighter opacity-50">HOMELUX</span>
            </div>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="border-t border-white/10 pt-16 pb-12">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <div className="space-y-4">
              <h2 className="text-3xl font-heading font-bold">Stay Inspired</h2>
              <p className="text-gray-400">Subscribe to our newsletter for exclusive offers and interior design inspiration.</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-1 bg-white/5 border border-white/20 rounded-full px-8 py-4 outline-none focus:border-accent transition-all"
              />
              <button className="bg-accent px-10 py-4 rounded-full font-bold hover:bg-accent/90 transition-all shadow-lg active:scale-95 flex items-center justify-center gap-2 group cursor-pointer">
                Subscribe <ArrowRight className="w-5 h-5 group-hover:translate-x-1" />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-12 flex flex-col md:flex-row items-center justify-between gap-6 text-sm text-gray-500">
          <p>© 2026 HomeLux Furniture. Kenya's Premier Home & Office Provider.</p>
          <div className="flex gap-8">
            <Link to="#" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="#" className="hover:text-white transition-colors">Terms of Service</Link>
            <Link to="#" className="hover:text-white transition-colors">Delivery & Returns</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

