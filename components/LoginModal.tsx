
import React from 'react';
import { X } from 'lucide-react';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[150] flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white w-full max-w-md p-10 shadow-2xl animate-in fade-in zoom-in duration-300">
        <button onClick={onClose} className="absolute top-6 right-6 hover:rotate-90 transition-transform">
          <X size={24} />
        </button>
        
        <h2 className="text-2xl font-black tracking-tight mb-8">LOG IN</h2>
        
        <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
          <div className="border-b border-gray-300 pb-2">
            <label className="text-[10px] font-bold tracking-widest text-gray-400 block mb-1">E-MAIL</label>
            <input type="email" className="w-full text-xs font-medium outline-none" required />
          </div>
          <div className="border-b border-gray-300 pb-2">
            <label className="text-[10px] font-bold tracking-widest text-gray-400 block mb-1">PASSWORD</label>
            <input type="password" className="w-full text-xs font-medium outline-none" required />
          </div>
          
          <div className="flex items-center justify-between pt-4">
            <a href="#" className="text-[10px] font-bold tracking-widest underline decoration-1 underline-offset-4">FORGOT PASSWORD?</a>
          </div>

          <button className="w-full bg-black text-white py-4 text-[11px] font-bold tracking-widest hover:bg-zinc-800 transition-colors">
            LOG IN
          </button>
        </form>

        <div className="mt-12">
          <p className="text-[10px] font-bold tracking-widest text-gray-400 mb-4">NEED AN ACCOUNT?</p>
          <button className="w-full border border-black py-4 text-[11px] font-bold tracking-widest hover:bg-black hover:text-white transition-all">
            REGISTER
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
