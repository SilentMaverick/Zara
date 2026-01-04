
import React, { useState, useEffect } from 'react';
import { Sparkles, X, ChevronRight, MessageSquare } from 'lucide-react';
import { getTrendingOutfits } from '../services/geminiService';
import { MOCK_PRODUCTS } from '../constants';

const AIAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [trends, setTrends] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchTrends = async () => {
    setLoading(true);
    const result = await getTrendingOutfits(MOCK_PRODUCTS.slice(0, 5));
    setTrends(result);
    setLoading(false);
  };

  useEffect(() => {
    if (isOpen && trends.length === 0) {
      fetchTrends();
    }
  }, [isOpen]);

  return (
    <div className="fixed bottom-8 right-8 z-[100]">
      {isOpen ? (
        <div className="bg-black text-white w-80 md:w-96 rounded-2xl p-6 shadow-2xl animate-in slide-in-from-bottom-10 duration-500">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center space-x-2">
              <Sparkles size={18} className="text-blue-400" />
              <h3 className="text-xs font-bold tracking-widest uppercase">Style Assistant</h3>
            </div>
            <button onClick={() => setIsOpen(false)} className="hover:rotate-90 transition-transform">
              <X size={20} />
            </button>
          </div>

          <div className="space-y-6">
            <div>
              <p className="text-[11px] text-gray-400 uppercase tracking-widest mb-4">Trending Edits</p>
              {loading ? (
                <div className="flex space-x-2">
                  <div className="w-1 h-1 bg-white rounded-full animate-bounce" />
                  <div className="w-1 h-1 bg-white rounded-full animate-bounce [animation-delay:-0.15s]" />
                  <div className="w-1 h-1 bg-white rounded-full animate-bounce [animation-delay:-0.3s]" />
                </div>
              ) : (
                <div className="space-y-4">
                  {trends.map((trend, i) => (
                    <div key={i} className="group cursor-pointer flex justify-between items-start border-b border-white/10 pb-3">
                      <p className="text-xs font-medium leading-relaxed group-hover:text-blue-400 transition-colors">
                        {trend}
                      </p>
                      <ChevronRight size={14} className="mt-1 flex-shrink-0" />
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            <div className="bg-white/10 rounded-xl p-4">
              <p className="text-[10px] font-bold mb-2 uppercase tracking-widest">Personal Shopper</p>
              <p className="text-[11px] text-gray-400 leading-normal mb-4">
                Let Gemini help you build the perfect wardrobe based on your favorites.
              </p>
              <button className="w-full py-2 bg-white text-black text-[10px] font-bold tracking-widest uppercase hover:bg-gray-200 transition-colors">
                Start Consultation
              </button>
            </div>
          </div>
        </div>
      ) : (
        <button 
          onClick={() => setIsOpen(true)}
          className="bg-black text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-transform flex items-center space-x-3"
        >
          <MessageSquare size={20} />
          <span className="text-[10px] font-bold tracking-widest uppercase hidden md:block">Style Advice</span>
        </button>
      )}
    </div>
  );
};

export default AIAssistant;
