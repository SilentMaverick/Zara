
import React, { useState, useMemo } from 'react';
import { Product } from '../types';
import { ArrowLeft, Plus, Heart, Share2, Info } from 'lucide-react';
import { MOCK_PRODUCTS } from '../constants';
import ProductCard from './ProductCard';

interface ProductDetailProps {
  product: Product;
  isLiked: boolean;
  onToggleLike: () => void;
  onBack: () => void;
  onAddToCart: (product: Product, size: string) => void;
  onNavigateToProduct: (product: Product) => void;
  wishlist: string[];
  onToggleProductLike: (id: string, e: React.MouseEvent) => void;
}

const ProductDetail: React.FC<ProductDetailProps> = ({ 
  product, 
  isLiked, 
  onToggleLike, 
  onBack, 
  onAddToCart, 
  onNavigateToProduct,
  wishlist,
  onToggleProductLike
}) => {
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [activeImg, setActiveImg] = useState(0);

  const relatedProducts = useMemo(() => {
    return MOCK_PRODUCTS
      .filter(p => p.id !== product.id && (p.category === product.category || p.subCategory === product.subCategory))
      .slice(0, 4);
  }, [product]);

  return (
    <div className="pt-20 md:pt-24 min-h-screen bg-white">
      <div className="max-w-[1920px] mx-auto px-4 md:px-8 py-8">
        <button onClick={onBack} className="flex items-center gap-2 text-[10px] font-bold tracking-widest uppercase mb-12 hover:-translate-x-1 transition-transform">
          <ArrowLeft size={16} />
          Back to list
        </button>

        <div className="grid lg:grid-cols-12 gap-12 mb-24">
          {/* Images */}
          <div className="lg:col-span-7 flex flex-col md:flex-row gap-4">
            <div className="hidden md:flex flex-col gap-4 w-20">
              {product.images.map((img, i) => (
                <button key={i} onClick={() => setActiveImg(i)} className={`aspect-[2/3] overflow-hidden border ${activeImg === i ? 'border-black' : 'border-transparent'}`}>
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
            <div className="flex-1 aspect-[2/3] bg-gray-50 overflow-hidden relative">
              <img src={product.images[activeImg]} alt={product.name} className="w-full h-full object-cover" />
              {product.isSale && (
                <div className="absolute top-6 left-6 bg-red-600 text-white text-[10px] font-black tracking-widest px-4 py-2 uppercase">
                  {product.discount}% Off
                </div>
              )}
            </div>
          </div>

          {/* Details */}
          <div className="lg:col-span-5 space-y-8 lg:pl-12">
            <div>
              <h2 className="text-[10px] font-bold tracking-widest uppercase text-gray-400 mb-2">{product.subCategory}</h2>
              <h1 className="text-3xl font-black tracking-tighter uppercase mb-4">{product.name}</h1>
              <div className="flex items-center gap-4 mb-8">
                <span className="text-2xl font-black tracking-widest">₹{product.price.toLocaleString()}</span>
                {product.originalPrice > product.price && (
                  <span className="text-xl text-gray-300 line-through">₹{product.originalPrice.toLocaleString()}</span>
                )}
              </div>
              <p className="text-xs text-gray-600 leading-relaxed uppercase tracking-wider mb-8">
                {product.description}
              </p>
            </div>

            <div>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-[11px] font-bold tracking-widest uppercase">Select Size</h3>
                <button className="text-[9px] font-bold tracking-widest uppercase underline underline-offset-4">Size Guide</button>
              </div>
              <div className="grid grid-cols-4 gap-2">
                {product.sizes.map(size => (
                  <button 
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`py-3 text-[10px] font-bold tracking-widest border transition-all ${selectedSize === size ? 'bg-black text-white border-black' : 'border-gray-100 hover:border-black'}`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex gap-4">
              <button 
                onClick={() => selectedSize && onAddToCart(product, selectedSize)}
                className="flex-1 bg-black text-white py-5 text-[11px] font-bold tracking-widest hover:bg-zinc-800 transition-all flex items-center justify-center gap-3 disabled:opacity-50"
                disabled={!selectedSize}
              >
                <Plus size={16} />
                {selectedSize ? 'ADD TO BAG' : 'SELECT SIZE'}
              </button>
              <button 
                onClick={onToggleLike}
                className={`px-6 border transition-all duration-300 ${isLiked ? 'border-red-500 text-red-500 bg-red-50' : 'border-gray-100 hover:border-black'}`}
              >
                <Heart size={20} fill={isLiked ? "currentColor" : "none"} strokeWidth={1.5} />
              </button>
            </div>

            <div className="pt-12 space-y-6 border-t border-gray-100">
              <div className="flex items-center gap-4 text-[10px] font-bold tracking-widest uppercase cursor-pointer hover:opacity-70">
                <Info size={16} />
                <span>Materials & Composition</span>
              </div>
              <div className="flex items-center gap-4 text-[10px] font-bold tracking-widest uppercase cursor-pointer hover:opacity-70">
                <Share2 size={16} />
                <span>Share Item</span>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        <div className="border-t border-gray-100 pt-24">
           <h2 className="text-sm font-black tracking-widest uppercase mb-12 text-center">You may also like</h2>
           <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {relatedProducts.map(p => (
                <div key={p.id} onClick={() => onNavigateToProduct(p)} className="cursor-pointer">
                  <ProductCard 
                    product={p} 
                    isLiked={wishlist.includes(p.id)}
                    onToggleLike={(e) => onToggleProductLike(p.id, e)}
                  />
                </div>
              ))}
           </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
