import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Search, 
  ShoppingCart, 
  User, 
  Menu, 
  X, 
  ChevronDown,
  ChevronRight,
  Sofa,
  Bed,
  Waves,
  Briefcase
} from 'lucide-react';
import { useCartStore } from '../../hooks/useCartStore';
import { cn } from '../../lib/utils';
import { CATEGORIES, NAV_SUBCATEGORY_IMAGES } from '../../data/furnitureData';
import { motion, AnimatePresence } from 'framer-motion';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [hoveredSubcategory, setHoveredSubcategory] = useState<string | null>(null);
  const totalItems = useCartStore((state) => state.totalItems());
  const location = useLocation();

  useEffect(() => {
    setHoveredSubcategory(null);
  }, [activeMenu]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menus on navigation
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setActiveMenu(null);
  }, [location]);

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-700 outline-none',
        isScrolled 
          ? 'bg-white/90 backdrop-blur-xl shadow-lg border-b-2 border-[#F5E6C8] py-3 w-full' 
          : 'bg-transparent py-5 px-8 max-w-[98%] mx-auto top-4 bg-white/20 backdrop-blur-md rounded-[2rem] border-2 border-[#F5E6C8]'
      )}
      onMouseLeave={() => setActiveMenu(null)}
    >
      <div className={cn(
        "mx-auto flex items-center justify-between transition-all duration-700",
        isScrolled ? "max-w-7xl px-6" : "px-10"
      )}>
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="text-3xl font-heading font-extrabold flex items-baseline tracking-normal">
            <span className="text-primary group-hover:text-accent transition-colors duration-300">Home</span>
            <span className="text-accent italic group-hover:text-primary transition-colors duration-300">LuX</span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-10">
          {CATEGORIES.map((cat) => (
            <div 
              key={cat.id} 
              className="relative group"
              onMouseEnter={() => setActiveMenu(cat.id)}
            >
              <Link
                to={`/category/${cat.id}`}
                className={cn(
                  "flex items-center gap-1.5 text-sm font-semibold tracking-wide uppercase transition-all duration-300 hover:text-accent",
                  activeMenu === cat.id ? "text-accent" : "text-gray-800"
                )}
              >
                {cat.title}
                <ChevronDown className={cn("w-3.5 h-3.5 transition-transform duration-300", activeMenu === cat.id && "rotate-180")} />
              </Link>
              
              {/* Animated underline */}
              <div className={cn(
                "absolute -bottom-1 left-0 h-0.5 bg-accent rounded-full transition-all duration-300",
                activeMenu === cat.id ? "w-full" : "w-0"
              )} />
            </div>
          ))}
          

          <Link to="/about" className="text-base font-bold tracking-wide uppercase hover:text-accent transition-colors">Our Story</Link>
        </div>

        {/* Search & Actions */}
        <div className="flex items-center gap-4">
          <div className="relative group hidden sm:block">
            <input
              type="text"
              placeholder="Search collections..."
              className="bg-gray-100/50 border border-gray-200/50 rounded-full py-2 pl-10 pr-4 text-sm focus:ring-4 focus:ring-accent/10 focus:bg-white transition-all duration-500 w-48 group-hover:w-64 outline-none"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-hover:text-accent transition-colors" />
          </div>

          <Link 
            to="/cart"
            aria-label="Open Shopping Cart"
            className="p-2.5 bg-white/50 backdrop-blur-md border border-white/20 hover:bg-accent/10 hover:border-accent/30 rounded-full transition-all duration-300 relative group"
          >
            <ShoppingCart className="w-5 h-5 group-hover:scale-110 transition-transform" />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 bg-accent text-white text-[10px] font-bold h-5 w-5 flex items-center justify-center rounded-full ring-2 ring-white shadow-lg">
                {totalItems}
              </span>
            )}
          </Link>

          <Link 
            to="/login"
            aria-label="User Profile"
            className="p-2.5 bg-white/50 backdrop-blur-md border border-white/20 hover:bg-accent/10 hover:border-accent/30 rounded-full transition-all duration-300 group sm:flex hidden"
          >
            <User className="w-5 h-5 group-hover:scale-110 transition-transform" />
          </Link>

          <button
            aria-label={isMobileMenuOpen ? "Close Menu" : "Open Menu"}
            className="lg:hidden p-2.5 bg-accent/10 hover:bg-accent/20 rounded-full transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mega Menu Overlay */}
      <AnimatePresence>
        {activeMenu && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 15 }}
            transition={{ duration: 0.3 }}
            className="absolute top-full left-0 right-0 bg-white shadow-2xl border-t border-gray-100 py-12 px-6 hidden lg:block"
            onMouseEnter={() => setActiveMenu(activeMenu)}
          >
            {(() => {
              const activeCategory = CATEGORIES.find((c) => c.id === activeMenu);
              const subMap = activeMenu ? NAV_SUBCATEGORY_IMAGES[activeMenu] : undefined;
              const subHoverSrc =
                hoveredSubcategory && subMap
                  ? subMap[hoveredSubcategory]
                  : undefined;
              const previewImage = subHoverSrc ?? activeCategory?.imageUrl;
              const previewTitle =
                hoveredSubcategory && subHoverSrc
                  ? hoveredSubcategory
                  : activeCategory?.title;
              return (
            <div className="max-w-7xl mx-auto grid grid-cols-4 gap-12">
              <div className="col-span-1 space-y-6">
                <div className="bg-gray-50 rounded-3xl p-8 aspect-square relative overflow-hidden group">
                  <img 
                    key={previewImage}
                    src={previewImage} 
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                    alt={previewTitle ?? 'Category'} 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent flex flex-col justify-end p-6">
                    <h3 className="text-2xl font-heading text-white font-bold">{previewTitle}</h3>
                    <p className="text-white/80 text-xs mt-2 line-clamp-2">{activeCategory?.description}</p>
                  </div>
                </div>
              </div>

              <div
                className="col-span-3"
                onMouseLeave={() => setHoveredSubcategory(null)}
              >
                <div className="grid grid-cols-3 gap-y-10 gap-x-8">
                  {activeCategory?.subcategories.map((sub, idx) => (
                    <Link 
                      key={idx} 
                      to={`/category/${activeMenu}?sub=${encodeURIComponent(sub)}`}
                      className="group flex items-center gap-3"
                      onMouseEnter={() => setHoveredSubcategory(sub)}
                    >
                      <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center group-hover:bg-accent/10 group-hover:text-accent transition-all">
                        <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0" />
                        <span className="absolute text-[10px] font-bold group-hover:opacity-0 transition-opacity">{idx + 1}</span>
                      </div>
                      <span className="text-sm font-medium text-gray-600 group-hover:text-primary transition-colors">{sub}</span>
                    </Link>
                  ))}
                  
                  {/* Promotion in Menu */}
                  <div className="col-span-3 mt-4 border-t border-gray-50 pt-8">
                    <div className="bg-accent/5 rounded-2xl p-6 flex items-center justify-between">
                      <div className="flex items-center gap-6">
                        <div className="w-12 h-12 rounded-full bg-accent flex items-center justify-center text-white shadow-lg">
                          <Waves className="w-6 h-6" />
                        </div>
                        <div>
                          <p className="font-bold text-primary">Homelux Premium Selection</p>
                          <p className="text-sm text-gray-500">Meticulously curated furniture for high-end Kenyan homes</p>
                        </div>
                      </div>
                      <Link to="/about" className="text-sm font-bold text-accent hover:underline flex items-center gap-2">
                        Learn More <ChevronRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            );
            })()}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 bg-white z-[60] lg:hidden flex flex-col p-8"
          >
            <div className="flex items-center justify-between mb-12">
              <div className="text-2xl font-heading font-extrabold">
                <span className="text-primary">Home</span>
                <span className="text-accent italic">LuX</span>
              </div>
              <button 
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-3 bg-gray-50 rounded-full"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="flex flex-col gap-6 overflow-y-auto pb-12">
              {CATEGORIES.map((cat) => (
                <div key={cat.id} className="space-y-4">
                  <Link 
                    to={`/category/${cat.id}`}
                    className="text-2xl font-heading font-bold flex items-center justify-between"
                  >
                    {cat.title}
                    <ChevronRight className="w-5 h-5 text-accent" />
                  </Link>
                </div>
              ))}
              <hr className="border-gray-100" />

              <Link to="/about" className="text-xl font-heading font-bold">Our Story</Link>
            </div>

            <div className="mt-auto space-y-6">
              <div className="bg-primary text-white p-6 rounded-3xl relative overflow-hidden">
                <p className="text-xs uppercase tracking-widest text-white/60 mb-1">Promo Code</p>
                <p className="text-2xl font-bold font-heading">HOMELUX20</p>
                <p className="text-sm mt-1">Get 20% off your first order</p>
              </div>
              <div className="flex gap-4">
                <Link to="/login" className="flex-1 bg-gray-100 py-4 rounded-2xl font-bold text-primary text-center">Login</Link>
                <Link to="/signup" className="flex-1 bg-accent py-4 rounded-2xl font-bold text-white shadow-xl text-center">Sign Up</Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

