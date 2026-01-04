
import React from 'react';
import { X, Trash2, ShoppingBag } from 'lucide-react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onRemove: (id: string, size: string) => void;
  onCheckout: () => void;
}

const CartDrawer: React.FC<CartDrawerProps> = ({ isOpen, onClose, items, onRemove, onCheckout }) => {
  const subtotal = items.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const tax = Math.round(subtotal * 0.05); // 5% GST
  const estimatedTotal = subtotal + tax;

  return (
    <div className={`fixed inset-0 z-[160] transition-opacity duration-500 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className={`absolute right-0 top-0 bottom-0 w-full max-w-md bg-white shadow-2xl transition-transform duration-500 transform ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex flex-col h-full">
          <div className="p-6 border-b border-gray-100 flex justify-between items-center">
            <h2 className="text-sm font-black tracking-widest uppercase flex items-center gap-2">
              <ShoppingBag size={18} />
              Shopping Bag ({items.reduce((acc, i) => acc + i.quantity, 0)})
            </h2>
            <button onClick={onClose} className="hover:rotate-90 transition-transform">
              <X size={24} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-6 space-y-8 no-scrollbar">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-gray-400">
                <p className="text-[10px] font-bold tracking-widest uppercase">Your bag is empty</p>
              </div>
            ) : (
              items.map((item, idx) => (
                <div key={`${item.id}-${item.selectedSize}`} className="flex gap-4 group">
                  <div className="w-24 aspect-[2/3] bg-gray-100 overflow-hidden">
                    <img src={item.images[0]} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-1">
                      <h3 className="text-[10px] font-bold tracking-widest uppercase">{item.name}</h3>
                      <button onClick={() => onRemove(item.id, item.selectedSize)} className="text-gray-300 hover:text-black transition-colors">
                        <Trash2 size={14} />
                      </button>
                    </div>
                    <p className="text-[9px] text-gray-400 uppercase tracking-widest mb-2">Size: {item.selectedSize} | Qty: {item.quantity}</p>
                    <p className="text-[11px] font-black tracking-widest">₹{item.price.toLocaleString()}</p>
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="p-6 border-t border-gray-100 space-y-4 bg-gray-50">
            <div className="flex justify-between text-[10px] font-bold tracking-widest text-gray-500 uppercase">
              <span>Subtotal</span>
              <span>₹{subtotal.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-[10px] font-bold tracking-widest text-gray-500 uppercase">
              <span>Estimated GST (5%)</span>
              <span>₹{tax.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center text-sm font-black tracking-widest uppercase pt-2 border-t border-gray-200">
              <span>Estimated Total</span>
              <span>₹{estimatedTotal.toLocaleString()}</span>
            </div>
            <p className="text-[9px] text-gray-400 uppercase tracking-widest text-center mt-2 italic">Shipping calculated at checkout</p>
            <button 
              disabled={items.length === 0}
              onClick={onCheckout}
              className="w-full bg-black text-white py-4 text-[11px] font-bold tracking-widest hover:bg-zinc-800 transition-colors disabled:opacity-50 mt-4"
            >
              CONTINUE TO CHECKOUT
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartDrawer;
