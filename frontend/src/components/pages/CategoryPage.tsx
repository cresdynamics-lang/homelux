import React, { useState, useMemo } from 'react';
import { useParams, useSearchParams, Link } from 'react-router-dom';
import { CATEGORIES, PRODUCTS } from '../../data/furnitureData';
import { ProductCard } from '../shared/ProductCard';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Filter, 
  SlidersHorizontal, 
  ChevronRight, 
  LayoutGrid, 
  List, 
  X,
  RotateCcw,
  Tags
} from 'lucide-react';
import { cn } from '../../lib/utils';
import { Slider } from '../ui/slider';
import { Checkbox } from '../ui/checkbox';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '../ui/sheet';

export const CategoryPage: React.FC = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const [searchParams, setSearchParams] = useSearchParams();
  const subCategoryParam = searchParams.get('sub');
  
  const [sortBy, setSortBy] = useState<'default' | 'price-low' | 'price-high' | 'rating'>('default');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  
  // Advanced Filter States
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 500000]);
  const [selectedMaterials, setSelectedMaterials] = useState<string[]>([]);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);

  const category = useMemo(() => 
    CATEGORIES.find(c => c.id === categoryId), 
  [categoryId]);

  // Derived Filter Options
  const allMaterials = useMemo(() => {
    const materials = new Set<string>();
    PRODUCTS.filter(p => p.category === categoryId).forEach(p => {
      if (p.material) materials.add(p.material);
    });
    return Array.from(materials);
  }, [categoryId]);

  const allColors = useMemo(() => {
    const colors = new Set<string>();
    PRODUCTS.filter(p => p.category === categoryId).forEach(p => {
      if (p.color) colors.add(p.color);
    });
    return Array.from(colors);
  }, [categoryId]);

  const filteredProducts = useMemo(() => {
    let result = PRODUCTS.filter(p => p.category === categoryId);
    
    if (subCategoryParam) {
      result = result.filter(p => p.subcategory === subCategoryParam);
    }

    // Price Filter
    result = result.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1]);

    // Material Filter
    if (selectedMaterials.length > 0) {
      result = result.filter(p => p.material && selectedMaterials.includes(p.material));
    }

    // Color Filter
    if (selectedColor) {
      result = result.filter(p => p.color === selectedColor);
    }

    switch (sortBy) {
      case 'price-low': result.sort((a, b) => a.price - b.price); break;
      case 'price-high': result.sort((a, b) => b.price - a.price); break;
      case 'rating': result.sort((a, b) => b.rating - a.rating); break;
      default: break;
    }

    return result;
  }, [categoryId, subCategoryParam, sortBy, priceRange, selectedMaterials, selectedColor]);

  const resetFilters = () => {
    setPriceRange([0, 500000]);
    setSelectedMaterials([]);
    setSelectedColor(null);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-KE', {
      style: 'currency',
      currency: 'KES',
      maximumFractionDigits: 0
    }).format(price);
  };

  if (!category) return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-heading font-bold">Category Not Found</h2>
        <Link to="/" className="text-accent hover:underline">Return Home</Link>
      </div>
    </div>
  );

  const FilterSidebar = () => (
    <div className="space-y-10">
      {/* Category Section */}
      <div className="space-y-6">
        <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-gray-400 flex items-center gap-2">
          <Tags className="w-4 h-4" /> Collections
        </h3>
        <div className="space-y-2 flex flex-col">
          <Link 
            to={`/category/${categoryId}`}
            className={cn(
              "px-4 py-2.5 rounded-xl text-sm transition-all",
              !subCategoryParam ? "bg-primary text-white shadow-lg" : "hover:bg-gray-100 text-gray-600"
            )}
          >
            All {category.title}
          </Link>
          {category.subcategories.map(sub => (
            <Link 
              key={sub}
              to={`/category/${categoryId}?sub=${sub}`}
              className={cn(
                "px-4 py-2.5 rounded-xl text-sm transition-all",
                subCategoryParam === sub ? "bg-accent text-white shadow-lg" : "hover:bg-gray-100 text-gray-600"
              )}
            >
              {sub}
            </Link>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div className="space-y-6">
        <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-gray-400">Price Range</h3>
        <div className="px-2 pt-2">
          <Slider 
            defaultValue={[0, 500000]}
            max={500000}
            step={5000}
            value={priceRange}
            onValueChange={(val) => setPriceRange(val as [number, number])}
          />
          <div className="flex justify-between mt-4 text-[10px] font-bold text-gray-400">
            <span>{formatPrice(priceRange[0])}</span>
            <span>{formatPrice(priceRange[1])}</span>
          </div>
        </div>
      </div>

      {/* Materials */}
      {allMaterials.length > 0 && (
        <div className="space-y-6">
          <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-gray-400">Materials</h3>
          <div className="space-y-3">
            {allMaterials.map(mat => (
              <label key={mat} className="flex items-center gap-3 group cursor-pointer">
                <Checkbox 
                  checked={selectedMaterials.includes(mat)}
                  onCheckedChange={(checked) => {
                    if (checked) setSelectedMaterials([...selectedMaterials, mat]);
                    else setSelectedMaterials(selectedMaterials.filter(m => m !== mat));
                  }}
                />
                <span className="text-sm text-gray-600 group-hover:text-primary transition-colors">{mat}</span>
              </label>
            ))}
          </div>
        </div>
      )}

      {/* Colors */}
      {allColors.length > 0 && (
        <div className="space-y-6">
          <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-gray-400">Colors</h3>
          <div className="flex flex-wrap gap-2">
            {allColors.map(color => (
              <button
                key={color}
                onClick={() => setSelectedColor(selectedColor === color ? null : color)}
                className={cn(
                  "px-3 py-1.5 rounded-full text-[10px] font-bold border transition-all",
                  selectedColor === color 
                    ? "bg-primary text-white border-primary" 
                    : "bg-white text-gray-600 border-gray-100 hover:border-gray-300"
                )}
              >
                {color}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Reset */}
      <button 
        onClick={resetFilters}
        className="w-full py-4 rounded-2xl border border-gray-100 text-gray-400 text-xs font-bold hover:bg-gray-50 flex items-center justify-center gap-2 transition-all"
      >
        <RotateCcw className="w-3.5 h-3.5" /> Reset Filters
      </button>

      <div className="bg-primary/5 rounded-3xl p-6 border border-primary/10">
        <h4 className="font-bold text-primary mb-2">Fair Pricing Model</h4>
        <p className="text-xs text-gray-500 leading-relaxed">
          By sourcing directly from top-tier manufacturers, we pass savings directly to you without compromising on Homelux quality.
        </p>
      </div>
    </div>
  );

  return (
    <div className="bg-background min-h-screen">
      {/* Category Hero */}
      <section className="relative h-[40vh] min-h-[300px] overflow-hidden">
        <img 
          src={category.imageUrl} 
          className="absolute inset-0 w-full h-full object-cover"
          alt={category.title}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/40 to-transparent" />
        <div className="absolute inset-0 flex items-center">
          <div className="max-w-7xl mx-auto px-6 w-full space-y-4">
            <nav className="flex items-center gap-2 text-white/60 text-sm mb-6">
              <Link to="/" className="hover:text-white transition-colors">Home</Link>
              <ChevronRight className="w-4 h-4" />
              <span className="text-white font-bold uppercase tracking-widest text-[10px]">{category.title}</span>
            </nav>
            <motion.h1 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-4xl md:text-5xl font-heading font-black text-white tracking-tight italic"
            >
              {category.title}
            </motion.h1>
            <p className="max-w-xl text-white/80 font-light text-lg">
              {category.description}
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Desktop Sidebar */}
          <aside className="lg:w-72 hidden lg:block flex-shrink-0">
            <FilterSidebar />
          </aside>

          {/* Product Grid Area */}
          <div className="flex-1 space-y-8">
            {/* Toolbar */}
            <div className="flex flex-col lg:flex-row gap-8 items-start relative z-10 bg-white p-4 rounded-3xl shadow-sm border border-gray-100">
              <div className="flex items-center gap-4">
                {/* Mobile Filter Trigger */}
                <Sheet>
                  <SheetTrigger asChild>
                    <button className="lg:hidden p-3 bg-gray-50 rounded-2xl text-primary hover:bg-primary hover:text-white transition-all">
                      <SlidersHorizontal className="w-5 h-5" />
                    </button>
                  </SheetTrigger>
                  <SheetContent side="left" className="w-[300px] overflow-y-auto">
                    <SheetHeader className="mb-8">
                      <SheetTitle className="text-xl font-heading font-black italic">Refine Selection</SheetTitle>
                    </SheetHeader>
                    <FilterSidebar />
                  </SheetContent>
                </Sheet>
                <p className="text-sm text-gray-500">
                  Found <span className="font-bold text-primary">{filteredProducts.length}</span> curated pieces
                </p>
              </div>
              
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <SlidersHorizontal className="w-4 h-4 text-gray-400 hidden lg:block" />
                  <select 
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as any)}
                    className="text-sm font-bold bg-transparent outline-none cursor-pointer text-gray-700 focus:text-accent transition-colors"
                  >
                    <option value="default">Default Sorting</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="rating">Average Rating</option>
                  </select>
                </div>
                
                <div className="h-4 w-[1px] bg-gray-200 hidden sm:block" />
                
                <div className="flex items-center gap-1.5">
                  <button 
                    onClick={() => setViewMode('grid')}
                    className={cn("p-2.5 rounded-xl transition-all", viewMode === 'grid' ? "bg-primary text-white shadow-xl" : "text-gray-400 hover:bg-gray-50")}
                  >
                    <LayoutGrid className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => setViewMode('list')}
                    className={cn("p-2.5 rounded-xl transition-all", viewMode === 'list' ? "bg-primary text-white shadow-xl" : "text-gray-400 hover:bg-gray-50")}
                  >
                    <List className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Selection Summary Tags (if filters active) */}
            {(selectedMaterials.length > 0 || selectedColor || priceRange[0] > 0 || priceRange[1] < 500000) && (
              <div className="flex flex-wrap gap-2">
                {selectedMaterials.map(m => (
                  <button key={m} onClick={() => setSelectedMaterials(selectedMaterials.filter(x => x !== m))} className="tag-custom">
                    {m} <X className="w-3 h-3" />
                  </button>
                ))}
                {selectedColor && (
                  <button onClick={() => setSelectedColor(null)} className="tag-custom">
                    {selectedColor} <X className="w-3 h-3" />
                  </button>
                )}
                <button onClick={resetFilters} className="text-xs font-bold text-accent hover:underline ml-2">Clear All</button>
              </div>
            )}

            {/* Grid */}
            <motion.div 
              layout
              className={cn(
                "grid gap-8",
                viewMode === 'grid' ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"
              )}
            >
              <AnimatePresence mode="popLayout">
                {filteredProducts.map((product, idx) => (
                  <motion.div
                    key={product.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.4, delay: idx * 0.05 }}
                  >
                    <ProductCard {...product} />
                  </motion.div>
                ))}
              </AnimatePresence>
              
              {filteredProducts.length === 0 && (
                <div className="col-span-full py-32 text-center space-y-6">
                  <div className="w-24 h-24 bg-gray-50 rounded-[2rem] flex items-center justify-center mx-auto text-gray-200 border border-dashed border-gray-200">
                    <Filter className="w-10 h-10" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-2xl font-heading font-black italic">No Matches Found</h3>
                    <p className="text-gray-500 max-w-sm mx-auto">Try broadening your selection or resetting the filters to explore our full curated collection.</p>
                  </div>
                  <button onClick={resetFilters} className="px-8 py-3 bg-primary text-white rounded-full font-bold shadow-xl active:scale-95 transition-all">Reset Filters</button>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};
