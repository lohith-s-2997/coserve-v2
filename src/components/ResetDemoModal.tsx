import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { RotateCcw, CheckCircle2, AlertTriangle, Sparkles } from 'lucide-react';

interface ResetDemoModalProps {
  isOpen: boolean;
  status: 'confirm' | 'resetting' | 'ready';
  onConfirm: () => void;
  onCancel: () => void;
}

export const ResetDemoModal: React.FC<ResetDemoModalProps> = ({
  isOpen,
  status,
  onConfirm,
  onCancel,
}) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm font-mono-code">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 8 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 8 }}
          transition={{ duration: 0.18 }}
          className="relative w-full max-w-md bg-[#0A0A0A] text-[#F5F5F2] border-2 border-white/20 shadow-2xl p-6 sm:p-8"
        >
          {/* Header Bar */}
          <div className="flex items-center justify-between pb-4 border-b border-white/10 text-xs text-white/50">
            <span className="flex items-center gap-2 text-[#CCFF00] font-bold uppercase tracking-wider">
              <RotateCcw className="w-3.5 h-3.5" />
              <span>COSERVE PROTOCOL RECOVERY</span>
            </span>
            <span className="text-[10px] uppercase">SIH DEMO HARNESS</span>
          </div>

          {/* CONFIRMATION STATE */}
          {status === 'confirm' && (
            <div className="space-y-6 pt-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
                  <AlertTriangle className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <h2 className="text-xl font-black font-display uppercase tracking-tight text-white">
                    RESET DEMO?
                  </h2>
                  <p className="text-xs text-white/70 font-sans leading-relaxed">
                    This will restore CoServe to its original demonstration state.
                  </p>
                </div>
              </div>

              {/* Scannable Scope of Reset */}
              <div className="bg-white/5 border border-white/10 p-3 text-[11px] text-white/70 space-y-1.5">
                <div className="text-[10px] text-[#CCFF00] font-bold uppercase tracking-wider">
                  CANONICAL RESTORATION INCLUDES:
                </div>
                <ul className="grid grid-cols-2 gap-x-2 gap-y-1 text-[10px] text-white/60">
                  <li>• Clear test bookings</li>
                  <li>• Reset dispute tickets</li>
                  <li>• Restore worker states</li>
                  <li>• Reset Growth Pool</li>
                  <li>• Clear FairMatch cache</li>
                  <li>• Reset demand cluster</li>
                  <li>• Reset customer credits</li>
                  <li>• Clean browser storage</li>
                </ul>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={onCancel}
                  className="px-5 py-2.5 bg-white/10 hover:bg-white/20 text-white text-xs font-bold uppercase tracking-wider transition border border-white/20"
                >
                  CANCEL
                </button>
                <button
                  type="button"
                  onClick={onConfirm}
                  className="px-5 py-2.5 bg-[#CCFF00] hover:bg-[#b8e600] text-black text-xs font-black uppercase tracking-wider transition shadow-lg flex items-center gap-2"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>RESET EVERYTHING</span>
                </button>
              </div>
            </div>
          )}

          {/* RESETTING STATE */}
          {status === 'resetting' && (
            <div className="py-8 text-center space-y-4">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-[#CCFF00]/10 border border-[#CCFF00]/40 text-[#CCFF00] animate-spin">
                <RotateCcw className="w-7 h-7" />
              </div>
              <div className="space-y-1">
                <h3 className="text-xl font-black font-display uppercase tracking-tight text-[#CCFF00]">
                  RESETTING COSERVE...
                </h3>
                <p className="text-xs text-white/60 font-mono-code">
                  Re-initializing canonical demo seed data & clearing mutations
                </p>
              </div>
            </div>
          )}

          {/* READY STATE */}
          {status === 'ready' && (
            <div className="py-8 text-center space-y-4">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-[#CCFF00] text-black">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <div className="space-y-1">
                <h3 className="text-xl font-black font-display uppercase tracking-tight text-white flex items-center justify-center gap-2">
                  <span className="text-[#CCFF00]">✓</span> DEMO READY
                </h3>
                <p className="text-xs text-white/80 font-sans leading-relaxed">
                  CoServe has been restored to its starting state.
                </p>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
