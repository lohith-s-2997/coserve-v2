import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useApp, WORKER_PROFILES } from '../context/AppContext';
import { ShieldCheck, Star, MapPin, Wrench, ArrowRight, X, CheckCircle2 } from 'lucide-react';

interface ChooseProfessionalModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ChooseProfessionalModal: React.FC<ChooseProfessionalModalProps> = ({ isOpen, onClose }) => {
  const { setActiveWorkerId, setRole, navigate } = useApp();

  if (!isOpen) return null;

  const handleSelectWorker = (workerId: string) => {
    setActiveWorkerId(workerId);
    setRole('worker');
    navigate('/worker');
    onClose();
  };

  const professionals = Object.values(WORKER_PROFILES);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 12 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 12 }}
        className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-[#0A0A0A] text-[#F5F5F2] border border-white/20 shadow-2xl p-4 sm:p-8 font-mono-code my-8"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 sm:top-5 sm:right-5 p-2 text-white/50 hover:text-white hover:bg-white/10 transition z-10"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="space-y-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#CCFF00]/10 border border-[#CCFF00]/30 text-[#CCFF00] text-[10px] font-bold uppercase tracking-widest mb-3">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>COOPERATIVE WORKER AUTHENTICATION</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black font-display uppercase tracking-tight text-white">
              CHOOSE PROFESSIONAL
            </h2>
            <p className="text-xs text-white/60 font-sans mt-1">
              Select a professional profile to continue into the Worker Operating Console.
            </p>
          </div>

          <div className="space-y-3">
            {professionals.map((pro) => (
              <div
                key={pro.id}
                className="p-4 sm:p-5 bg-white/5 hover:bg-white/10 border border-white/15 transition flex flex-col sm:flex-row sm:items-center justify-between gap-4 group"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-base sm:text-lg font-black font-display uppercase text-white group-hover:text-[#CCFF00] transition">
                      {pro.name}
                    </span>
                    <span className="px-2 py-0.5 bg-white/10 text-white/80 text-[10px] font-bold uppercase">
                      {pro.trade}
                    </span>
                  </div>
                  <div className="text-xs font-bold text-white/80">
                    {pro.businessName}
                  </div>
                  <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-[11px] text-white/60 pt-1">
                    <span className="flex items-center gap-1 text-amber-400">
                      <Star className="w-3.5 h-3.5 fill-current" />
                      <span>{pro.rating}</span>
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-[#CCFF00]" />
                      <span>{pro.locality}</span>
                    </span>
                    <span>•</span>
                    <span className="text-emerald-400 font-bold">Available Today</span>
                  </div>
                </div>

                <button
                  onClick={() => handleSelectWorker(pro.id)}
                  className="w-full sm:w-auto px-5 py-3 bg-[#CCFF00] hover:bg-[#D4FF00] text-black text-xs font-black uppercase tracking-wider transition flex items-center justify-center gap-2 shrink-0"
                >
                  <span>CONTINUE AS {pro.name.split(' ')[0]}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>

          <div className="p-3 bg-white/5 border border-white/10 text-[11px] text-white/50 font-sans text-center">
            Switching accounts simulates independent artisan access to local dispatch queues and direct escrow payout ledgers.
          </div>
        </div>
      </motion.div>
    </div>
  );
};
