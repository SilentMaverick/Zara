
import React, { useState } from 'react';
import { Product } from '../types';
import { Heart, Plus } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  isLiked: boolean;
  onToggleLike: (e: React.MouseEvent) => void;
  onQuickAdd?: (e: React.MouseEvent) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, isLiked, onToggleLike, onQuickAdd }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="group flex flex-col h-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container */}
      <div className="relative aspect-[2/3] overflow-hidden bg-gray-100">
        <img 
          src={isHovered && product.images[1] ? product.images[1] : product.images[0]} 
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        
        {/* Wishlist Button */}
        <button 
          onClick={onToggleLike}
          className={`absolute top-4 right-4 p-2 rounded-full transition-all duration-300 ${isLiked ? 'bg-white opacity-100 text-red-500 scale-110' : 'bg-white/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 text-black hover:bg-white'}`}
        >
          <Heart size={18} fill={isLiked ? "currentColor" : "none"} strokeWidth={1.5} />
        </button>

        {/* Sale Badge - Westside Style */}
        {product.isSale && (
          <div className="absolute top-4 left-0 bg-red-600 text-white text-[10px] font-black tracking-widest px-3 py-1 uppercase">
            Sale {product.discount}% Off
          </div>
        )}
        
        {product.isNew && !product.isSale && (
          <div className="absolute top-4 left-0 bg-black text-white text-[10px] font-black tracking-widest px-3 py-1 uppercase">
            New
          </div>
        )}

        {/* Quick Add - Zara style */}
        <button 
          onClick={onQuickAdd}
          className="absolute bottom-0 left-0 right-0 bg-black text-white text-[11px] font-bold tracking-widest py-4 translate-y-full group-hover:translate-y-0 transition-transform flex items-center justify-center space-x-2"
        >
          <Plus size={14} />
          <span>ADD TO BAG</span>
        </button>
      </div>

      {/* Info */}
      <div className="pt-4 pb-2">
        <div className="flex justify-between items-start mb-1">
          <h3 className="text-[11px] font-bold tracking-widest uppercase truncate pr-2">
            {product.name}
          </h3>
        </div>
        <p className="text-[10px] text-gray-500 mb-2 uppercase tracking-wide">
          {product.subCategory}
        </p>
        <div className="flex items-center space-x-3">
          <span className="text-[12px] font-black">₹{product.price.toLocaleString()}</span>
          {product.originalPrice > product.price && (
            <span className="text-[12px] text-gray-400 line-through">₹{product.originalPrice.toLocaleString()}</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
