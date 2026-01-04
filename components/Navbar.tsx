
import React, { useState } from 'react';
import { Search, User, Heart, ShoppingBag, Menu, X, ChevronRight } from 'lucide-react';
import { CATEGORIES, CATEGORY_MAP } from '../constants';

interface NavbarProps {
  onLoginClick: () => void;
  onCartClick: () => void;
  onWishlistClick: () => void;
  onCategorySelect: (cat: string | null, sub?: string | null) => void;
  onLogoClick: () => void;
  onSearch: (term: string) => void;
  cartCount: number;
  wishlistCount: number;
}

const Navbar: React.FC<NavbarProps> = ({ 
  onLoginClick, 
  onCartClick, 
  onWishlistClick,
  onCategorySelect, 
  onLogoClick, 
  onSearch, 
  cartCount,
  wishlistCount
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeMainHover, setActiveMainHover] = useState<string | null>(null);
  const [searchValue, setSearchValue] = useState('');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchValue);
  };

  return (
    <nav 
      className="fixed top-0 left-0 right-0 z-[140] bg-white border-b border-gray-100"
      onMouseLeave={() => setActiveMainHover(null)}
    >
      <div className="max-w-[1920px] mx-auto px-4 md:px-8 h-16 md:h-20 flex items-center justify-between">
        <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        <div className="flex-1 md:flex-initial flex justify-center md:justify-start">
          <h1 
            onClick={onLogoClick}
            className="text-4xl md:text-6xl font-black tracking-[-0.1em] cursor-pointer hover:opacity-80 transition-opacity"
          >
            ZARA
          </h1>
        </div>

        <div className="hidden md:flex space-x-8 h-full items-center text-[11px] font-bold tracking-widest uppercase">
          {CATEGORIES.map(cat => (
            <div key={cat} className="h-full flex items-center group relative">
              <button 
                onMouseEnter={() => setActiveMainHover(cat)}
                onClick={() => onCategorySelect(cat)}
                className="hover:underline underline-offset-4 decoration-2"
              >
                {cat}
              </button>
            </div>
          ))}
          <button 
            onClick={() => onCategorySelect('Sale')}
            className="text-red-600 hover:underline underline-offset-4 decoration-2"
          >
            SALE
          </button>
        </div>

        <div className="flex items-center space-x-4 md:space-x-6">
          <form onSubmit={handleSearchSubmit} className="hidden lg:flex items-center border-b border-gray-200 pb-1">
            <input 
              type="text" 
              placeholder="SEARCH" 
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              className="bg-transparent text-[11px] tracking-widest font-bold outline-none w-32" 
            />
            <button type="submit">
              <Search size={16} strokeWidth={2.5} />
            </button>
          </form>
          <button onClick={onLoginClick}><User size={20} strokeWidth={1.5} /></button>
          <button onClick={onWishlistClick} className="relative group">
            <Heart size={20} strokeWidth={1.5} className="group-hover:scale-110 transition-transform" />
            {wishlistCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-black text-white text-[9px] w-4 h-4 flex items-center justify-center rounded-full">
                {wishlistCount}
              </span>
            )}
          </button>
          <button onClick={onCartClick} className="relative group">
            <ShoppingBag size={20} strokeWidth={1.5} className="group-hover:scale-110 transition-transform" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-black text-white text-[9px] w-4 h-4 flex items-center justify-center rounded-full">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Expanded Hover Menu */}
      <div className={`absolute top-full left-0 right-0 bg-white border-b border-gray-100 transition-all duration-300 overflow-hidden ${activeMainHover ? 'max-h-[500px] py-10 opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="max-w-[1920px] mx-auto px-8 grid grid-cols-4 gap-12">
          <div className="col-span-1 border-r border-gray-50 pr-8">
            <h3 className="text-[10px] font-black tracking-[0.2em] uppercase mb-6 text-gray-400">Shop by {activeMainHover}</h3>
            <ul className="space-y-4">
              {activeMainHover && CATEGORY_MAP[activeMainHover]?.map(sub => (
                <li key={sub}>
                  <button 
                    onClick={() => { onCategorySelect(activeMainHover, sub); setActiveMainHover(null); }}
                    className="text-[11px] font-bold tracking-widest uppercase hover:underline underline-offset-4 flex justify-between w-full group"
                  >
                    {sub}
                    <ChevronRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div className="col-span-3 grid grid-cols-3 gap-4">
            {[1, 2, 3].map(i => (
              <div key={i} className="aspect-[3/4] bg-gray-50 overflow-hidden group cursor-pointer relative">
                <img src={`https://picsum.photos/seed/nav${activeMainHover}${i}/800/1200`} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" />
                <div className="absolute inset-0 bg-black/5" />
                <div className="absolute bottom-6 left-6 text-white">
                  <p className="text-[9px] font-bold tracking-[0.3em] uppercase mb-1">Trending</p>
                  <p className="text-sm font-black tracking-widest uppercase italic font-serif">Essential Edit 0{i}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 top-16 bg-white z-[150] p-8 overflow-y-auto animate-in slide-in-from-left duration-300">
          <div className="mb-8 border-b border-gray-100 pb-4">
             <form onSubmit={handleSearchSubmit} className="flex items-center space-x-2">
                <input 
                  type="text" 
                  placeholder="SEARCH" 
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  className="bg-transparent text-[11px] tracking-widest font-bold outline-none flex-1" 
                />
                <button type="submit">
                  <Search size={20} />
                </button>
             </form>
          </div>
          {CATEGORIES.map(cat => (
            <div key={cat} className="mb-8">
              <h3 className="text-2xl font-black tracking-tighter uppercase mb-4">{cat}</h3>
              <ul className="space-y-4 pl-4 border-l border-gray-100">
                {CATEGORY_MAP[cat].map(sub => (
                  <li key={sub}>
                    <button 
                      onClick={() => { onCategorySelect(cat, sub); setIsMenuOpen(false); }}
                      className="text-xs font-bold tracking-widest uppercase text-gray-500 hover:text-black"
                    >
                      {sub}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div className="pt-8 border-t border-gray-100">
            <button onClick={() => { onWishlistClick(); setIsMenuOpen(false); }} className="flex items-center space-x-3 text-sm font-bold tracking-widest uppercase">
              <Heart size={20} />
              <span>Wishlist ({wishlistCount})</span>
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
