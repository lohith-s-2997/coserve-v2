import React, { useState } from 'react';
import { motion } from 'motion/react';
import { useApp } from '../context/AppContext';
import { Booking } from '../types';
import {
  ShieldAlert,
  UserCheck,
  RotateCcw,
  PhoneCall,
  X,
  CheckCircle2,
  ArrowRight,
  Sparkles,
} from 'lucide-react';

interface ReplacementSupportModalProps {
  booking: Booking;
  onClose: () => void;
}

export const ReplacementSupportModal: React.FC<ReplacementSupportModalProps> = ({
  booking,
  onClose,
}) => {
  const { providers, requestReplacement, updateBookingStatus, showToast } = useApp();
  const [selectedOption, setSelectedOption] = useState<'replacement' | 'cancel' | 'support'>('replacement');
  const [confirmedAction, setConfirmedAction] = useState<string | null>(null);

  // Find a verified alternative provider in the same category
  const alternativePro =
    providers.find(
      (p) => p.category === booking.category && p.businessName !== booking.businessName
    ) || providers[1] || providers[0];

  const handleConfirmReplacement = () => {
    requestReplacement(booking.id, alternativePro);
    setConfirmedAction('replacement');
  };

  const handleConfirmCancel = () => {
    updateBookingStatus(booking.id, 'Requested'); // or cancel
    showToast('Booking cancelled. Escrow held released back to payment source.');
    setConfirmedAction('cancelled');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 12 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 12 }}
        className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto bg-[#0A0A0A] text-[#F5F5F2] border border-white/20 shadow-2xl p-4 sm:p-8 font-mono-code my-8"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 sm:top-5 sm:right-5 p-2 text-white/50 hover:text-white hover:bg-white/10 transition z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {!confirmedAction ? (
          <div className="space-y-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#CCFF00]/10 border border-[#CCFF00]/30 text-[#CCFF00] text-[10px] font-bold uppercase tracking-widest mb-3">
                <ShieldAlert className="w-3.5 h-3.5" />
                <span>COOPERATIVE RELIABILITY SAFETY NET</span>
              </div>
              <h2 className="text-2xl font-black font-display uppercase tracking-tight text-white">
                REPLACEMENT & ASSISTANCE
              </h2>
              <p className="text-xs text-white/60 font-sans mt-1">
                If <strong className="text-white">{booking.businessName}</strong> faces a delay or emergency, CoServe's cooperative peer-backup guarantees immediate continuity.
              </p>
            </div>

            {/* Option Tabs */}
            <div className="grid grid-cols-3 gap-2 text-xs">
              <button
                type="button"
                onClick={() => setSelectedOption('replacement')}
                className={`p-3 text-center transition border ${
                  selectedOption === 'replacement'
                    ? 'bg-[#CCFF00] text-black border-[#CCFF00] font-bold'
                    : 'bg-white/5 text-white/70 border-white/10 hover:border-white/30'
                }`}
              >
                <UserCheck className="w-4 h-4 mx-auto mb-1" />
                <span className="text-[10px] uppercase block">Replacement</span>
              </button>

              <button
                type="button"
                onClick={() => setSelectedOption('cancel')}
                className={`p-3 text-center transition border ${
                  selectedOption === 'cancel'
                    ? 'bg-red-500 text-white border-red-500 font-bold'
                    : 'bg-white/5 text-white/70 border-white/10 hover:border-white/30'
                }`}
              >
                <RotateCcw className="w-4 h-4 mx-auto mb-1" />
                <span className="text-[10px] uppercase block">Cancel & Refund</span>
              </button>

              <button
                type="button"
                onClick={() => setSelectedOption('support')}
                className={`p-3 text-center transition border ${
                  selectedOption === 'support'
                    ? 'bg-blue-500 text-white border-blue-500 font-bold'
                    : 'bg-white/5 text-white/70 border-white/10 hover:border-white/30'
                }`}
              >
                <PhoneCall className="w-4 h-4 mx-auto mb-1" />
                <span className="text-[10px] uppercase block">Ward Desk</span>
              </button>
            </div>

            {/* Replacement Details View */}
            {selectedOption === 'replacement' && (
              <div className="p-4 bg-white/5 border border-white/10 space-y-4">
                <div className="text-[10px] uppercase font-bold text-[#CCFF00] tracking-wider">
                  VERIFIED PEER BACKUP ARTISAN AVAILABLE
                </div>

                <div className="flex items-center justify-between p-3 bg-white/5 border border-white/10">
                  <div>
                    <div className="text-sm font-bold text-white uppercase">{alternativePro.businessName}</div>
                    <div className="text-xs text-white/60 font-sans">
                      Lead: {alternativePro.professionalName} • {alternativePro.locality}
                    </div>
                    <div className="text-[10px] text-[#CCFF00] mt-1 font-bold">
                      ★ {alternativePro.rating} ({alternativePro.completedJobs} jobs) • FairMatch: {alternativePro.fairMatch.overallScore}%
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-bold text-white block">₹{booking.price}</span>
                    <span className="text-[10px] text-white/50">Same Tariff</span>
                  </div>
                </div>

                <p className="text-[11px] text-white/70 font-sans leading-relaxed">
                  Under the Anna Nagar Ward 102 Mutual Cooperative Pact, peers seamlessly cover orders when unexpected delays arise. No price surges or extra fees.
                </p>

                <button
                  onClick={handleConfirmReplacement}
                  className="w-full py-3 bg-[#CCFF00] hover:bg-[#D4FF00] text-black text-xs font-black uppercase tracking-wider transition flex items-center justify-center gap-2 shadow-lg"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>CONFIRM REASSIGNMENT TO {alternativePro.professionalName.toUpperCase()}</span>
                </button>
              </div>
            )}

            {/* Cancel Details View */}
            {selectedOption === 'cancel' && (
              <div className="p-4 bg-red-500/10 border border-red-500/30 space-y-3">
                <div className="text-[10px] uppercase font-bold text-red-400 tracking-wider">
                  ESCROW RELEASE & INSTANT CANCELLATION
                </div>
                <p className="text-xs text-white/80 font-sans leading-relaxed">
                  Because CoServe holds funds in secure transparent escrow rather than paying workers before service verification, you can cancel whenever a provider fails to arrive on schedule.
                </p>
                <button
                  onClick={handleConfirmCancel}
                  className="w-full py-3 bg-red-600 hover:bg-red-500 text-white text-xs font-bold uppercase tracking-wider transition"
                >
                  CANCEL BOOKING & RELEASE ESCROW
                </button>
              </div>
            )}

            {/* Support Desk Details View */}
            {selectedOption === 'support' && (
              <div className="p-4 bg-white/5 border border-white/10 space-y-3">
                <div className="text-[10px] uppercase font-bold text-blue-400 tracking-wider">
                  ANNA NAGAR WARD 102 COOPERATIVE DESK
                </div>
                <div className="text-xs text-white/80 font-sans space-y-1">
                  <div>Coordinator: <strong className="text-white">Murugan K. (Zone Steward)</strong></div>
                  <div>Direct Phone: <strong className="text-white">+91 94440 19283</strong></div>
                  <div>Hours: 8:00 AM – 8:00 PM (Daily)</div>
                </div>
                <p className="text-[11px] text-white/60 font-sans">
                  The cooperative desk handles routing discrepancies, multi-artisan coordination, and equipment logistics directly.
                </p>
              </div>
            )}
          </div>
        ) : (
          <div className="py-6 space-y-6 text-center">
            <div className="w-12 h-12 rounded-full bg-[#CCFF00] text-black flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-7 h-7" />
            </div>

            <div className="space-y-1">
              <div className="text-[#CCFF00] text-xs font-bold uppercase tracking-widest">
                [ SAFETY NET ACTION EXECUTED ]
              </div>
              <h2 className="text-2xl font-black font-display uppercase tracking-tight text-white">
                {confirmedAction === 'replacement' ? 'REPLACEMENT CONFIRMED' : 'BOOKING CANCELLED'}
              </h2>
              <p className="text-xs text-white/70 font-sans max-w-xs mx-auto">
                {confirmedAction === 'replacement'
                  ? `Your appointment has been reassigned to ${alternativePro.businessName}. They have been notified.`
                  : 'Your booking has been cancelled and escrow funds released.'}
              </p>
            </div>

            <button
              onClick={onClose}
              className="w-full py-3 bg-white/10 hover:bg-white/20 text-white text-xs font-bold uppercase tracking-wider transition"
            >
              CLOSE
            </button>
          </div>
        )}
      </motion.div>
    </div>
  );
};
