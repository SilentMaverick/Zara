
import React, { useState } from 'react';
import { ArrowLeft, ShieldCheck, Truck, CreditCard, Gift } from 'lucide-react';
import { CartItem } from '../types';

interface CheckoutPageProps {
  onBack: () => void;
  onComplete: () => void;
  items: CartItem[];
}

const CheckoutPage: React.FC<CheckoutPageProps> = ({ onBack, onComplete, items }) => {
  const [shippingMethod, setShippingMethod] = useState<'standard' | 'express'>('standard');
  const [isGift, setIsGift] = useState(false);
  
  const subtotal = items.reduce((acc, i) => acc + (i.price * i.quantity), 0);
  const shippingFee = shippingMethod === 'express' ? 290 : 0;
  const giftFee = isGift ? 150 : 0;
  const tax = Math.round(subtotal * 0.05);
  const total = subtotal + shippingFee + tax + giftFee;

  return (
    <div className="bg-gray-50 min-h-screen pt-20 pb-20 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        <button 
          onClick={onBack}
          className="flex items-center space-x-2 text-[10px] font-bold tracking-widest uppercase mb-12 hover:-translate-x-1 transition-transform"
        >
          <ArrowLeft size={16} />
          <span>Back to shop</span>
        </button>

        <div className="grid lg:grid-cols-12 gap-12">
          {/* Left: Forms */}
          <div className="lg:col-span-8 space-y-8">
            <section className="bg-white p-8 shadow-sm">
              <div className="flex items-center space-x-3 mb-8">
                <div className="w-8 h-8 bg-black text-white flex items-center justify-center text-xs font-bold">1</div>
                <h2 className="text-sm font-black tracking-widest uppercase">Shipping Details</h2>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <input placeholder="FIRST NAME" className="border-b border-gray-200 py-3 text-xs outline-none focus:border-black transition-colors" />
                <input placeholder="LAST NAME" className="border-b border-gray-200 py-3 text-xs outline-none focus:border-black transition-colors" />
                <input placeholder="ADDRESS" className="border-b border-gray-200 py-3 text-xs outline-none focus:border-black transition-colors md:col-span-2" />
                <input placeholder="CITY" className="border-b border-gray-200 py-3 text-xs outline-none focus:border-black transition-colors" />
                <input placeholder="POSTAL CODE" className="border-b border-gray-200 py-3 text-xs outline-none focus:border-black transition-colors" />
              </div>
            </section>

            <section className="bg-white p-8 shadow-sm">
              <div className="flex items-center space-x-3 mb-8">
                <div className="w-8 h-8 bg-black text-white flex items-center justify-center text-xs font-bold">2</div>
                <h2 className="text-sm font-black tracking-widest uppercase">Delivery Method</h2>
              </div>
              
              <div className="space-y-4">
                <label 
                  className={`flex items-center justify-between p-4 border cursor-pointer transition-all ${shippingMethod === 'standard' ? 'border-black bg-gray-50' : 'border-gray-200'}`}
                  onClick={() => setShippingMethod('standard')}
                >
                  <div className="flex items-center space-x-4">
                    <Truck size={20} />
                    <div>
                      <p className="text-[11px] font-bold tracking-widest uppercase">Standard Delivery</p>
                      <p className="text-[10px] text-gray-400 tracking-wide uppercase">2-3 Working Days</p>
                    </div>
                  </div>
                  <span className="text-[11px] font-bold">FREE</span>
                </label>
                <label 
                  className={`flex items-center justify-between p-4 border cursor-pointer transition-all ${shippingMethod === 'express' ? 'border-black bg-gray-50' : 'border-gray-200'}`}
                  onClick={() => setShippingMethod('express')}
                >
                  <div className="flex items-center space-x-4">
                    <Truck size={20} className="text-blue-600" />
                    <div>
                      <p className="text-[11px] font-bold tracking-widest uppercase">Express Delivery</p>
                      <p className="text-[10px] text-gray-400 tracking-wide uppercase">Next Working Day</p>
                    </div>
                  </div>
                  <span className="text-[11px] font-bold">₹290</span>
                </label>
              </div>
            </section>

            <section className="bg-white p-8 shadow-sm">
              <div className="flex items-center space-x-3 mb-8">
                <div className="w-8 h-8 bg-black text-white flex items-center justify-center text-xs font-bold">3</div>
                <h2 className="text-sm font-black tracking-widest uppercase">Options</h2>
              </div>
              <div 
                className={`flex items-center space-x-4 p-4 border cursor-pointer transition-all ${isGift ? 'border-black bg-gray-50' : 'border-gray-200'}`}
                onClick={() => setIsGift(!isGift)}
              >
                <Gift size={20} className={isGift ? 'text-red-500' : 'text-gray-400'} />
                <div className="flex-1">
                  <p className="text-[11px] font-bold tracking-widest uppercase">Gift Wrapping</p>
                  <p className="text-[10px] text-gray-400 tracking-wide uppercase">Add a personal message and premium wrap</p>
                </div>
                <span className="text-[11px] font-bold">₹150</span>
              </div>
            </section>

            <section className="bg-white p-8 shadow-sm">
              <div className="flex items-center space-x-3 mb-8">
                <div className="w-8 h-8 bg-black text-white flex items-center justify-center text-xs font-bold">4</div>
                <h2 className="text-sm font-black tracking-widest uppercase">Payment</h2>
              </div>
              
              <div className="grid md:grid-cols-3 gap-4">
                {['CREDIT CARD', 'PAYPAL', 'UPI'].map(method => (
                  <button key={method} className="border border-gray-200 p-4 text-[10px] font-bold tracking-widest uppercase hover:border-black transition-all">
                    {method}
                  </button>
                ))}
              </div>
            </section>
          </div>

          {/* Right: Summary */}
          <div className="lg:col-span-4">
            <div className="bg-white p-8 shadow-sm sticky top-28">
              <h2 className="text-sm font-black tracking-widest uppercase mb-8">Order Summary</h2>
              
              <div className="space-y-4 max-h-60 overflow-y-auto mb-8 no-scrollbar border-b border-gray-50 pb-4">
                {items.map(item => (
                   <div key={`${item.id}-${item.selectedSize}`} className="flex justify-between items-center text-[10px] uppercase font-bold tracking-widest">
                      <span className="text-gray-500">{item.quantity}x {item.name}</span>
                      <span>₹{(item.price * item.quantity).toLocaleString()}</span>
                   </div>
                ))}
              </div>

              <div className="space-y-4 pb-8 border-b border-gray-100">
                <div className="flex justify-between text-[11px] font-medium text-gray-500 uppercase">
                  <span>Subtotal</span>
                  <span>₹{subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-[11px] font-medium text-gray-500 uppercase">
                  <span>Delivery</span>
                  <span>{shippingFee === 0 ? 'FREE' : `₹${shippingFee.toLocaleString()}`}</span>
                </div>
                {isGift && (
                  <div className="flex justify-between text-[11px] font-medium text-gray-500 uppercase">
                    <span>Gift Wrap</span>
                    <span>₹{giftFee.toLocaleString()}</span>
                  </div>
                )}
                <div className="flex justify-between text-[11px] font-medium text-gray-500 uppercase">
                  <span>Estimated GST (5%)</span>
                  <span>₹{tax.toLocaleString()}</span>
                </div>
              </div>
              <div className="flex justify-between py-6 text-sm font-black uppercase tracking-widest">
                <span>Grand Total</span>
                <span>₹{total.toLocaleString()}</span>
              </div>
              
              <p className="text-[9px] text-gray-400 uppercase tracking-wide leading-relaxed mb-8">
                By placing the order, you agree to our terms and conditions and privacy policy.
              </p>

              <button 
                onClick={onComplete}
                className="w-full bg-black text-white py-4 text-[11px] font-bold tracking-widest hover:bg-zinc-800 transition-colors flex items-center justify-center space-x-2"
              >
                <ShieldCheck size={16} />
                <span>PLACE ORDER</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
