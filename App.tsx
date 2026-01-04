
import React, { useState, useMemo, useEffect } from 'react';
import Navbar from './components/Navbar';
import FilterSidebar from './components/FilterSidebar';
import ProductCard from './components/ProductCard';
import ProductDetail from './components/ProductDetail';
import CartDrawer from './components/CartDrawer';
import AIAssistant from './components/AIAssistant';
import LoginModal from './components/LoginModal';
import CheckoutPage from './components/CheckoutPage';
import HomePage from './components/HomePage';
import { MOCK_PRODUCTS, CATEGORY_MAP } from './constants';
import { SortOption, FilterState, ViewState, NavigationState, Product, CartItem } from './types';
import { ChevronDown, LayoutGrid, LayoutList, CheckCircle, Heart } from 'lucide-react';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewState>('home');
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  
  const [navState, setNavState] = useState<NavigationState>({
    mainCategory: null,
    subCategory: null,
    searchTerm: ''
  });

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  
  const [activeFilters, setActiveFilters] = useState<FilterState>({
    categories: [],
    sizes: [],
    colors: [],
    priceRange: [0, 10000]
  });
  const [sortBy, setSortBy] = useState<SortOption>('newest');
  const [viewCols, setViewCols] = useState(4);

  const filteredProducts = useMemo(() => {
    let list = MOCK_PRODUCTS;

    // Handle Wishlist View
    if (currentView === 'wishlist') {
      list = MOCK_PRODUCTS.filter(p => wishlist.includes(p.id));
    }

    return list.filter(product => {
      // Search term filter
      if (navState.searchTerm) {
        const term = navState.searchTerm.toLowerCase();
        const matchesName = product.name.toLowerCase().includes(term);
        const matchesCategory = product.category.toLowerCase().includes(term);
        const matchesSubCategory = product.subCategory.toLowerCase().includes(term);
        if (!(matchesName || matchesCategory || matchesSubCategory)) return false;
      }

      // Main category filter
      const mainCatMatch = !navState.mainCategory || 
                          (navState.mainCategory === 'Sale' ? product.isSale : product.category === navState.mainCategory);
      
      // Sub category filter (either from Navbar or Sidebar)
      const sidebarCatFilters = activeFilters.categories;
      const subCatMatch = (sidebarCatFilters.length === 0 && !navState.subCategory) || 
                          (navState.subCategory ? product.subCategory === navState.subCategory : sidebarCatFilters.includes(product.subCategory));

      const sizeMatch = activeFilters.sizes.length === 0 || product.sizes.some(s => activeFilters.sizes.includes(s));
      const colorMatch = activeFilters.colors.length === 0 || product.colors.some(c => activeFilters.colors.includes(c));
      
      return mainCatMatch && subCatMatch && sizeMatch && colorMatch;
    }).sort((a, b) => {
      if (sortBy === 'price-low-high') return a.price - b.price;
      if (sortBy === 'price-high-low') return b.price - a.price;
      if (sortBy === 'discount') return b.discount - a.discount;
      return 0;
    });
  }, [activeFilters, sortBy, navState, wishlist, currentView]);

  const handleAddToCart = (product: Product, size: string) => {
    setCartItems(prev => {
      const existing = prev.find(i => i.id === product.id && i.selectedSize === size);
      if (existing) {
        return prev.map(i => (i.id === product.id && i.selectedSize === size) ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...prev, { ...product, selectedSize: size, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const handleRemoveFromCart = (id: string, size: string) => {
    setCartItems(prev => prev.filter(i => !(i.id === id && i.selectedSize === size)));
  };

  const toggleLike = (id: string, e?: React.MouseEvent) => {
    if (e) {
      e.stopPropagation();
      e.preventDefault();
    }
    setWishlist(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  const navigateToCatalog = (cat: string | null, sub?: string | null) => {
    setNavState({ mainCategory: cat, subCategory: sub || null, searchTerm: '' });
    setActiveFilters(prev => ({ ...prev, categories: [] }));
    setCurrentView('catalog');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToProduct = (product: Product) => {
    setSelectedProduct(product);
    setCurrentView('product');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToWishlist = () => {
    setCurrentView('wishlist');
    setNavState({ mainCategory: null, subCategory: null, searchTerm: '' });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSearch = (term: string) => {
    setNavState({ mainCategory: null, subCategory: null, searchTerm: term });
    setCurrentView('catalog');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col transition-all duration-700">
      <Navbar 
        onLoginClick={() => setIsLoginOpen(true)}
        onCartClick={() => setIsCartOpen(true)}
        onWishlistClick={navigateToWishlist}
        onCategorySelect={navigateToCatalog}
        onLogoClick={() => { setNavState({mainCategory: null, subCategory: null, searchTerm: ''}); setCurrentView('home'); }}
        onSearch={handleSearch}
        cartCount={cartItems.reduce((acc, i) => acc + i.quantity, 0)}
        wishlistCount={wishlist.length}
      />
      
      <CartDrawer 
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onRemove={handleRemoveFromCart}
        onCheckout={() => { setIsCartOpen(false); setCurrentView('checkout'); }}
      />
      
      <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />

      {currentView === 'home' && (
        <HomePage onCategoryClick={navigateToCatalog} />
      )}

      {(currentView === 'catalog' || currentView === 'wishlist') && (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 mt-16 md:mt-20">
          <section className="relative h-[30vh] md:h-[40vh] overflow-hidden bg-black flex items-center justify-center">
             <img 
               src={currentView === 'wishlist' 
                 ? "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=2000"
                 : "https://images.unsplash.com/photo-1549439602-43ebca2327af?w=2000"
               } 
               alt="" 
               className="absolute inset-0 w-full h-full object-cover opacity-50"
             />
             <div className="relative z-10 text-center">
                <h1 className="text-4xl md:text-7xl font-black tracking-tight text-white uppercase italic font-serif">
                   {currentView === 'wishlist' 
                     ? 'YOUR WISHLIST' 
                     : (navState.searchTerm ? `SEARCH: ${navState.searchTerm}` : (navState.subCategory || navState.mainCategory || 'VIEW ALL'))
                   }
                </h1>
                <p className="text-[10px] text-white/70 font-bold tracking-[0.5em] mt-4 uppercase">
                  {currentView === 'wishlist' ? `${wishlist.length} Items Saved` : 'New Collection 2024'}
                </p>
             </div>
          </section>

          <div className="max-w-[1920px] mx-auto w-full px-4 md:px-8 py-8 flex flex-wrap items-center justify-between border-b border-gray-100 sticky top-16 md:top-20 bg-white/95 backdrop-blur-md z-[130]">
            <div className="flex items-center space-x-4 text-[10px] font-bold tracking-widest uppercase">
              <button onClick={() => setCurrentView('home')} className="text-gray-400 hover:text-black">Home</button>
              <span className="text-gray-300">/</span>
              {currentView === 'wishlist' ? (
                <span>Wishlist</span>
              ) : (
                <>
                  <button onClick={() => setNavState(s => ({...s, subCategory: null}))} className={navState.subCategory ? 'text-gray-400 hover:text-black' : ''}>
                    {navState.mainCategory || 'All'}
                  </button>
                  {navState.subCategory && (
                    <>
                      <span className="text-gray-300">/</span>
                      <span>{navState.subCategory}</span>
                    </>
                  )}
                </>
              )}
            </div>

            <div className="flex items-center space-x-8">
              <div className="flex items-center space-x-4 border-r border-gray-200 pr-8">
                <button onClick={() => setViewCols(2)} className={`${viewCols === 2 ? 'text-black' : 'text-gray-300'}`}><LayoutList size={20} /></button>
                <button onClick={() => setViewCols(4)} className={`${viewCols === 4 ? 'text-black' : 'text-gray-300'}`}><LayoutGrid size={20} /></button>
              </div>
              <div className="relative group">
                <button className="flex items-center space-x-2 text-[10px] font-bold tracking-widest uppercase">
                  <span>Sort: {sortBy.replace(/-/g, ' ')}</span>
                  <ChevronDown size={14} />
                </button>
                <div className="absolute right-0 top-full mt-2 w-48 bg-white border border-gray-100 shadow-2xl opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all z-20">
                  {['newest', 'price-low-high', 'price-high-low', 'discount'].map(opt => (
                    <button key={opt} onClick={() => setSortBy(opt as SortOption)} className="w-full text-left px-4 py-3 text-[10px] font-bold uppercase hover:bg-gray-50 tracking-widest">
                      {opt.replace(/-/g, ' ')}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <main className="max-w-[1920px] mx-auto w-full flex flex-1 px-4 md:px-8 py-10 min-h-screen">
            <FilterSidebar 
              onFilterChange={(t, v) => setActiveFilters(prev => {
                const key = t as keyof Omit<FilterState, 'priceRange'>;
                const current = prev[key];
                const next = current.includes(v)
                  ? current.filter(item => item !== v)
                  : [...current, v];
                return { ...prev, [key]: next };
              })} 
              activeFilters={activeFilters} 
            />
            <div className="flex-1">
              {filteredProducts.length > 0 ? (
                <div className={`grid gap-x-4 gap-y-12 sm:grid-cols-2 lg:grid-cols-${viewCols}`}>
                  {filteredProducts.map((p, i) => (
                    <div key={p.id} onClick={() => navigateToProduct(p)} className="cursor-pointer">
                      <ProductCard 
                        product={p} 
                        isLiked={wishlist.includes(p.id)}
                        onToggleLike={(e) => toggleLike(p.id, e)}
                        onQuickAdd={(e) => { e.stopPropagation(); navigateToProduct(p); }}
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="h-96 flex flex-col items-center justify-center space-y-4 text-center">
                  {currentView === 'wishlist' ? (
                    <>
                      <Heart size={48} strokeWidth={1} className="text-gray-200" />
                      <p className="text-sm font-medium text-gray-400 uppercase tracking-widest">Your wishlist is empty</p>
                      <button onClick={() => setCurrentView('home')} className="text-[11px] font-bold tracking-widest uppercase underline">Browse the collection</button>
                    </>
                  ) : (
                    <>
                      <p className="text-sm font-medium text-gray-400">No items available in this selection.</p>
                      {navState.searchTerm && <p className="text-[10px] font-bold uppercase text-gray-300">Try searching for something else like "dress" or "shirt"</p>}
                      <button onClick={() => { setActiveFilters({categories:[],sizes:[],colors:[],priceRange:[0,10000]}); setNavState({mainCategory:null, subCategory:null, searchTerm: ''}); }} className="text-[11px] font-bold tracking-widest uppercase underline">Reset Catalog</button>
                    </>
                  )}
                </div>
              )}
            </div>
          </main>
        </div>
      )}

      {currentView === 'product' && selectedProduct && (
        <ProductDetail 
          product={selectedProduct} 
          isLiked={wishlist.includes(selectedProduct.id)}
          onToggleLike={() => toggleLike(selectedProduct.id)}
          onBack={() => setCurrentView('catalog')}
          onAddToCart={handleAddToCart}
          onNavigateToProduct={navigateToProduct}
          wishlist={wishlist}
          onToggleProductLike={toggleLike}
        />
      )}

      {currentView === 'checkout' && (
        <CheckoutPage 
          onBack={() => setCurrentView('catalog')} 
          onComplete={() => { setCartItems([]); setCurrentView('success'); }} 
          items={cartItems}
        />
      )}

      {currentView === 'success' && (
        <div className="flex-1 flex flex-col items-center justify-center bg-white p-8 animate-in zoom-in duration-500 min-h-[70vh]">
          <CheckCircle size={80} strokeWidth={1} className="mb-8 text-green-500" />
          <h1 className="text-4xl font-black tracking-tighter mb-4">ORDER CONFIRMED</h1>
          <p className="text-sm text-gray-500 uppercase tracking-widest mb-12 text-center max-w-md leading-relaxed">
            Your purchase has been successfully placed. Your order ID is #ZAR-{(Math.random()*1000000).toFixed(0)}.
          </p>
          <button onClick={() => { setNavState({mainCategory: null, subCategory: null, searchTerm: ''}); setCurrentView('home'); }} className="px-12 py-4 bg-black text-white text-[11px] font-bold tracking-widest hover:bg-zinc-800 transition-all uppercase">Continue Shopping</button>
        </div>
      )}

      <footer className="bg-white border-t border-gray-100 pt-20 pb-10 mt-auto">
        <div className="max-w-[1920px] mx-auto px-4 md:px-8 grid md:grid-cols-4 gap-12 mb-20">
          <div>
            <h4 className="text-[11px] font-bold tracking-widest uppercase mb-6">Newsletter</h4>
            <div className="flex border-b border-black pb-2">
              <input type="email" placeholder="EMAIL ADDRESS" className="bg-transparent flex-1 text-[11px] outline-none" />
            </div>
          </div>
          <div>
            <h4 className="text-[11px] font-bold tracking-widest uppercase mb-6">Support</h4>
            <ul className="space-y-3 text-[11px] font-medium text-gray-500 uppercase tracking-wide">
              <li><a href="#" className="hover:text-black">Order Status</a></li>
              <li><a href="#" className="hover:text-black">Returns & Refunds</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-[11px] font-bold tracking-widest uppercase mb-6">About</h4>
            <ul className="space-y-3 text-[11px] font-medium text-gray-500 uppercase tracking-wide">
              <li><a href="#" className="hover:text-black">Sustainability</a></li>
              <li><a href="#" className="hover:text-black">Work with us</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-[11px] font-bold tracking-widest uppercase mb-6">Location</h4>
            <p className="text-[11px] font-medium text-gray-500 uppercase tracking-wide">INDIA | EN</p>
          </div>
        </div>
        <div className="max-w-[1920px] mx-auto px-4 md:px-8 flex flex-col md:flex-row justify-between items-center text-[10px] font-bold tracking-widest text-gray-300 gap-4">
          <p>© ZARA GLOBAL RETAIL 2024</p>
          <div className="flex space-x-8">
             <p>STORES</p>
             <p>LEGAL</p>
             <p>PRIVACY</p>
          </div>
        </div>
      </footer>

      <AIAssistant />
    </div>
  );
};

export default App;
