
import React, { useState, useEffect } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';

interface HomePageProps {
  onCategoryClick: (category: string) => void;
}

const HomePage: React.FC<HomePageProps> = ({ onCategoryClick }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const heroSlides = [
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-YT4OeXobwKyk8fmWN4Cw8e2QNlG3xwP8DQ&s?auto=format&fit=crop&q=80&w=2000',
    'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?auto=format&fit=crop&q=80&w=2000',
    'https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&q=80&w=2000',
    'https://images.unsplash.com/photo-1534126511673-b6899657816a?auto=format&fit=crop&q=80&w=2000',
  ];

  const categories = [
    { name: 'Women', img: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&q=80&w=800' },
    { name: 'Men', img: 'https://images.unsplash.com/photo-1488161628813-04466f872be2?auto=format&fit=crop&q=80&w=800' },
    { name: 'Kids', img: 'https://img.freepik.com/free-photo/medium-shot-smiley-kids-posing-together_23-2149073581.jpg?auto=format&fit=crop&q=80&w=800' },
    { name: 'Home', img: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&q=80&w=800' },
  ];

  const featuredBrands = [
    { name: 'Zuba', desc: 'Modern Ethnic', img: 'https://cdn.shopify.com/s/files/1/1857/6931/files/Mens-Ethnic-Wear-Online_1024x1024.jpg?auto=format&fit=crop&q=80&w=1200' },
    { name: 'Wardrobe', desc: 'Workwear Redefined', img: 'https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?auto=format&fit=crop&q=80&w=1200' },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);

  return (
    <div className="pt-16 md:pt-20 animate-in fade-in duration-1000">
      {/* Announcement Bar */}
      <div className="bg-red-600 text-white py-2 px-4 text-center">
        <p className="text-[10px] font-black tracking-[0.3em] uppercase">
          SALE: UP TO 50% OFF | BUY ONLINE OR IN SITE
        </p>
      </div>

      {/* Hero Section - Sliding Banner Style */}
      <section className="relative h-[85vh] group overflow-hidden">
        {heroSlides.map((slide, index) => (
          <div 
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentSlide ? 'opacity-100' : 'opacity-0'}`}
          >
            <img 
              src={slide} 
              alt={`Hero Slide ${index + 1}`} 
              className="w-full h-full object-cover transition-transform duration-[10s] scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col items-center justify-end pb-24 text-white">
              <h2 className="text-sm font-bold tracking-[0.5em] uppercase mb-4 translate-y-4 animate-in slide-in-from-bottom-4 duration-700">The Summer Edit</h2>
              <h1 className="text-7xl md:text-[10rem] font-black tracking-tight font-serif italic mb-4 text-center px-4 leading-[0.8] uppercase">SALE</h1>
              <p className="text-[11px] font-bold tracking-[0.8em] uppercase mb-10 text-white/90">BUY ONLINE OR IN SITE</p>
              <button 
                onClick={() => onCategoryClick('Women')}
                className="px-10 py-4 bg-white text-black text-[11px] font-bold tracking-widest hover:bg-black hover:text-white transition-all uppercase"
              >
                Shop the sale
              </button>
            </div>
          </div>
        ))}
        
        {/* Navigation Arrows */}
        <button 
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 p-2 text-white/50 hover:text-white transition-colors opacity-0 group-hover:opacity-100"
        >
          <ChevronLeft size={32} strokeWidth={1} />
        </button>
        <button 
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 p-2 text-white/50 hover:text-white transition-colors opacity-0 group-hover:opacity-100"
        >
          <ChevronRight size={32} strokeWidth={1} />
        </button>

        {/* Indicators */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex space-x-2">
          {heroSlides.map((_, i) => (
            <button 
              key={i} 
              onClick={() => setCurrentSlide(i)}
              className={`w-12 h-[2px] transition-colors ${i === currentSlide ? 'bg-white' : 'bg-white/30'}`}
            />
          ))}
        </div>
      </section>

      {/* Shop By Category - Grid Style */}
      <section className="max-w-[1920px] mx-auto px-4 md:px-8 py-20">
        <h2 className="text-2xl font-black tracking-tighter uppercase mb-12 text-center">Shop By Category</h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
          {categories.map((cat) => (
            <div 
              key={cat.name} 
              onClick={() => onCategoryClick(cat.name)}
              className="group cursor-pointer overflow-hidden flex flex-col"
            >
              <div className="aspect-[3/4] overflow-hidden bg-gray-100 mb-4">
                <img 
                  src={cat.img} 
                  alt={cat.name} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <h3 className="text-xs font-bold tracking-widest uppercase flex justify-between items-center group-hover:pl-2 transition-all">
                {cat.name}
                <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
              </h3>
            </div>
          ))}
        </div>
      </section>

      {/* Seasonal Brands / Featured Collections */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-[1920px] mx-auto px-4 md:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            {featuredBrands.map((brand) => (
              <div 
                key={brand.name}
                className="relative h-[600px] overflow-hidden group cursor-pointer"
                onClick={() => onCategoryClick('Women')}
              >
                <img 
                  src={brand.img} 
                  alt={brand.name} 
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors" />
                <div className="absolute bottom-12 left-12 text-white">
                  <h3 className="text-4xl font-black tracking-tighter mb-2 italic font-serif">{brand.name}</h3>
                  <p className="text-[10px] font-bold tracking-widest uppercase mb-6 opacity-80">{brand.desc}</p>
                  <span className="text-[11px] font-bold tracking-widest uppercase border-b border-white pb-1">Shop Brand</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* New Arrivals Banner - Minimalist Zara style */}
      <section className="py-32 flex flex-col items-center justify-center text-center px-4">
        <span className="text-[10px] font-bold tracking-[0.4em] uppercase text-gray-400 mb-6">Just In</span>
        <h2 className="text-5xl md:text-7xl font-black tracking-tighter mb-10 max-w-3xl leading-none">
          ELEVATE YOUR <br/> EVERYDAY WARDROBE
        </h2>
        <p className="text-sm text-gray-500 uppercase tracking-[0.2em] mb-12 max-w-xl leading-relaxed">
          Discover the latest trends in our curated selection of high-quality essentials.
        </p>
        <div className="flex space-x-4">
          <button 
            onClick={() => onCategoryClick('Men')}
            className="px-10 py-4 border border-black text-[11px] font-bold tracking-widest uppercase hover:bg-black hover:text-white transition-all"
          >
            For Him
          </button>
          <button 
            onClick={() => onCategoryClick('Women')}
            className="px-10 py-4 bg-black text-white text-[11px] font-bold tracking-widest uppercase hover:bg-zinc-800 transition-all"
          >
            For Her
          </button>
        </div>
      </section>

      {/* Instagram Feed Simulation */}
      <section className="max-w-[1920px] mx-auto px-4 md:px-8 pb-20">
        <h2 className="text-[10px] font-bold tracking-widest uppercase mb-10 text-center">Follow our journey @ZARA_WESTSIDE</h2>
        <div className="grid grid-cols-3 lg:grid-cols-6 gap-2">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="aspect-square overflow-hidden bg-gray-100 grayscale hover:grayscale-0 transition-all duration-700 cursor-pointer">
              <img src={`https://picsum.photos/seed/insta${i}/600/600`} alt="social" className="w-full h-full object-cover" />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomePage;
