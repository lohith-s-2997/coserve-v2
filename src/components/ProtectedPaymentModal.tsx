import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useApp } from '../context/AppContext';
import { Booking } from '../types';
import {
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  FileText,
  Star,
  Coins,
  Building2,
  UserCheck,
  X,
  Layers,
} from 'lucide-react';

interface ProtectedPaymentModalProps {
  booking: Booking;
  onClose: () => void;
  onOpenInvoice?: (booking: Booking) => void;
  onOpenRating?: (booking: Booking) => void;
}

export const ProtectedPaymentModal: React.FC<ProtectedPaymentModalProps> = ({
  booking,
  onClose,
  onOpenInvoice,
  onOpenRating,
}) => {
  const { completeProtectedPayment, navigate, growthPoolBalance, customerCredits } = useApp();

  const isRepeat = booking.isRepeatBooking;
  const servicePrice = booking.price || 500;
  const bookingFee = isRepeat ? 10 : (booking.protectedBookingFee || 25);
  const totalAmount = servicePrice + bookingFee;
  const workerCut = servicePrice;
  const coserveOps = isRepeat ? 5 : 15;
  const communityPool = isRepeat ? 5 : 10;

  const [phase, setPhase] = useState<'review' | 'animating' | 'settled'>(
    booking.paymentStatus === 'Paid' ? 'settled' : 'review'
  );

  const handleStartPayment = () => {
    setPhase('animating');
    // Animate the split for 2.4 seconds, then finalize
    setTimeout(() => {
      completeProtectedPayment(booking.id);
      setPhase('settled');
    }, 2400);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 12 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 12 }}
        className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-[#0A0A0A] text-[#F5F5F2] border border-white/20 shadow-2xl p-4 sm:p-8 font-mono-code my-8"
      >
        {/* Background Grid Accent */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 sm:top-5 sm:right-5 p-2 text-white/50 hover:text-white hover:bg-white/10 transition z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {/* PHASE 1: REVIEW BEFORE EXECUTION */}
        {phase === 'review' && (
          <div className="space-y-6 relative z-10">
            {/* Header */}
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#CCFF00]/10 border border-[#CCFF00]/30 text-[#CCFF00] text-[10px] font-bold uppercase tracking-widest mb-3">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>COSERVE PROTECTED ESCROW SETTLEMENT</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black font-display uppercase tracking-tight text-white">
                COMPLETE PROTECTED PAYMENT
              </h2>
              <p className="text-xs text-white/60 font-sans mt-1">
                Direct tariff settlement for <strong className="text-white">{booking.serviceName}</strong> delivered by{' '}
                <strong className="text-white">{booking.businessName}</strong>.
              </p>
            </div>

            {/* Bill Breakdown Box */}
            <div className="bg-white/5 border border-white/10 p-5 space-y-4">
              <div className="flex justify-between items-center text-xs pb-3 border-b border-white/10">
                <span className="text-white/60">Service Tariff (Worker Base Rate)</span>
                <span className="font-bold text-white text-sm">₹{servicePrice}</span>
              </div>

              <div className="flex justify-between items-center text-xs pb-3 border-b border-white/10">
                <div>
                  <span className="text-white/80 font-bold block">
                    {isRepeat ? 'Repeat Customer Protection Fee' : 'CoServe Protected Booking Fee'}
                  </span>
                  <span className="text-[10px] text-[#CCFF00] font-sans">
                    {isRepeat
                      ? '✓ Repeat Discount Applied (₹10 instead of ₹25)'
                      : 'Includes Escrow, Dispute Cover, & Community Pool'}
                  </span>
                </div>
                <span className="font-bold text-[#CCFF00] text-sm">₹{bookingFee}</span>
              </div>

              <div className="flex justify-between items-baseline pt-1">
                <div>
                  <span className="text-xs font-bold uppercase text-white/60 block">Total Booking Amount</span>
                  <span className="text-[10px] text-white/40">Demonstration Pricing Parameters</span>
                </div>
                <div className="text-3xl font-black font-display text-white">₹{totalAmount}</div>
              </div>
            </div>

            {/* Protection Guarantees Pill Array */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[10px] uppercase font-bold text-white/70">
              <div className="p-2.5 bg-white/5 border border-white/10 text-center">
                <span className="text-[#CCFF00] block mb-0.5">✓ 100% TARIFF</span>
                <span>TO ARTISAN</span>
              </div>
              <div className="p-2.5 bg-white/5 border border-white/10 text-center">
                <span className="text-[#CCFF00] block mb-0.5">✓ ₹{communityPool} CO-OP</span>
                <span>GROWTH POOL</span>
              </div>
              <div className="p-2.5 bg-white/5 border border-white/10 text-center">
                <span className="text-[#CCFF00] block mb-0.5">✓ DIGITAL</span>
                <span>INVOICE ISSUED</span>
              </div>
              <div className="p-2.5 bg-white/5 border border-white/10 text-center">
                <span className="text-[#CCFF00] block mb-0.5">✓ +25 CREDITS</span>
                <span>CUSTOMER REWARD</span>
              </div>
            </div>

            {/* CTA Button */}
            <button
              onClick={handleStartPayment}
              className="w-full py-4 bg-[#CCFF00] hover:bg-[#D4FF00] text-[#0A0A0A] text-sm font-black uppercase tracking-wider transition flex items-center justify-center gap-2 shadow-lg"
            >
              <span>PAY ₹{totalAmount} & EXECUTE TRANSPARENT SPLIT</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* PHASE 2: ANIMATED MONEY FLOW SPLIT (WOW MOMENT) */}
        {phase === 'animating' && (
          <div className="py-6 space-y-8 text-center relative z-10">
            <div className="space-y-1">
              <div className="text-[#CCFF00] text-[10px] font-bold uppercase tracking-widest flex items-center justify-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#CCFF00] animate-ping" />
                <span>REAL-TIME CAPITAL ROUTING PROTOCOL</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black font-display uppercase tracking-tight text-white">
                DISBURSING ₹{totalAmount} ALONG TRANSPARENT ESCROW STREAMS
              </h3>
            </div>

            {/* Central Total Node */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="inline-flex flex-col items-center justify-center px-8 py-4 bg-white text-black font-display font-black text-3xl shadow-2xl border-2 border-[#CCFF00]"
            >
              <span className="text-[10px] font-mono-code font-bold uppercase text-black/60 tracking-wider">
                INCOMING CUSTOMER PAYMENT
              </span>
              <span>₹{totalAmount}</span>
            </motion.div>

            {/* Visual Vector Divergence */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 text-left">
              {/* Stream 1: Worker */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="p-4 bg-white/10 border border-white/20 relative overflow-hidden"
              >
                <div className="absolute top-0 left-0 h-1 bg-[#CCFF00] w-full animate-pulse" />
                <div className="flex items-center gap-2 text-white/60 text-[10px] uppercase font-bold mb-1">
                  <UserCheck className="w-3.5 h-3.5 text-[#CCFF00]" />
                  <span>Stream 01 • Worker Earnings</span>
                </div>
                <div className="text-2xl font-black font-display text-white">₹{workerCut}</div>
                <p className="text-[11px] text-white/70 font-sans mt-1">
                  100% of the service tariff transfers directly to{' '}
                  <strong className="text-white">{booking.providerName}</strong> without platform cuts.
                </p>
              </motion.div>

              {/* Stream 2: CoServe Operations */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="p-4 bg-white/10 border border-white/20 relative overflow-hidden"
              >
                <div className="absolute top-0 left-0 h-1 bg-white/60 w-full animate-pulse" />
                <div className="flex items-center gap-2 text-white/60 text-[10px] uppercase font-bold mb-1">
                  <Building2 className="w-3.5 h-3.5 text-white" />
                  <span>Stream 02 • Operations</span>
                </div>
                <div className="text-2xl font-black font-display text-white">₹{coserveOps}</div>
                <p className="text-[11px] text-white/70 font-sans mt-1">
                  Covers servers, SMS OTP verification, KYC checks, and cooperative dispatch infrastructure.
                </p>
              </motion.div>

              {/* Stream 3: Community Growth Pool (Highlight!) */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 }}
                className="p-4 bg-[#CCFF00]/10 border-2 border-[#CCFF00] relative overflow-hidden"
              >
                <div className="absolute top-0 left-0 h-1 bg-[#CCFF00] w-full" />
                <div className="flex items-center gap-2 text-[#CCFF00] text-[10px] uppercase font-bold mb-1">
                  <Coins className="w-3.5 h-3.5 text-[#CCFF00] animate-bounce" />
                  <span>Stream 03 • Community Pool</span>
                </div>
                <div className="text-2xl font-black font-display text-[#CCFF00]">₹{communityPool}</div>
                <p className="text-[11px] text-white/90 font-sans mt-1">
                  Deposited into local ward treasury! Funds member tooling, safety kits, and certifications.
                </p>
              </motion.div>
            </div>

            <div className="text-xs text-white/60 font-mono-code animate-pulse">
              [ SYNCHRONIZING WITH WARD COOPERATIVE LEDGER... ]
            </div>
          </div>
        )}

        {/* PHASE 3: SETTLED / CONFIRMATION */}
        {phase === 'settled' && (
          <div className="space-y-6 relative z-10">
            {/* Success Header */}
            <div className="text-center space-y-2">
              <div className="w-12 h-12 rounded-full bg-[#CCFF00] text-[#0A0A0A] flex items-center justify-center mx-auto mb-2">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <div className="text-[#CCFF00] text-xs font-bold uppercase tracking-widest">
                [ ESCROW SETTLEMENT COMPLETE • CS-INV-1042 ]
              </div>
              <h2 className="text-2xl sm:text-3xl font-black font-display uppercase tracking-tight text-white">
                PAYMENT SUCCESSFUL
              </h2>
              <p className="text-xs text-white/70 font-sans max-w-md mx-auto">
                ₹{totalAmount} settled cleanly. Worker earnings disbursed, invoice recorded, and community growth fund credited.
              </p>
            </div>

            {/* Split Recap Card */}
            <div className="p-4 bg-white/5 border border-white/10 space-y-3">
              <div className="text-[10px] uppercase font-bold text-white/40 tracking-wider">
                TRANSACTION LEDGER BREAKDOWN
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-center">
                <div className="p-2.5 bg-white/5">
                  <div className="text-[10px] text-white/60 uppercase">Worker Disbursed</div>
                  <div className="text-lg font-black font-display text-white mt-0.5">₹{workerCut}</div>
                  <div className="text-[9px] text-white/40">100% of tariff</div>
                </div>
                <div className="p-2.5 bg-white/5">
                  <div className="text-[10px] text-white/60 uppercase">CoServe Ops</div>
                  <div className="text-lg font-black font-display text-white mt-0.5">₹{coserveOps}</div>
                  <div className="text-[9px] text-white/40">Platform upkeep</div>
                </div>
                <div className="p-2.5 bg-[#CCFF00]/10 border border-[#CCFF00]/30">
                  <div className="text-[10px] text-[#CCFF00] uppercase font-bold">Community Pool</div>
                  <div className="text-lg font-black font-display text-[#CCFF00] mt-0.5">+₹{communityPool}</div>
                  <div className="text-[9px] text-white/60">New Balance: ₹{growthPoolBalance.toLocaleString('en-IN')}</div>
                </div>
              </div>
            </div>

            {/* Customer Reward Notification */}
            <div className="p-4 bg-[#CCFF00]/10 border border-[#CCFF00]/30 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-[#CCFF00] text-black flex items-center justify-center shrink-0">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white uppercase tracking-wider">
                    +25 COSERVE LOYALTY CREDITS EARNED!
                  </div>
                  <p className="text-[11px] text-white/70 font-sans">
                    Customer loyalty reward credited to Arun Kumar. New Balance: <strong className="text-[#CCFF00]">{customerCredits} Credits</strong>.
                  </p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              <button
                onClick={() => {
                  onClose();
                  if (onOpenInvoice) onOpenInvoice(booking);
                }}
                className="py-3 px-4 bg-white/10 hover:bg-white/20 text-white text-xs font-bold uppercase tracking-wider transition flex items-center justify-center gap-2"
              >
                <FileText className="w-4 h-4 text-[#CCFF00]" />
                <span>View Invoice</span>
              </button>

              <button
                onClick={() => {
                  onClose();
                  if (onOpenRating) onOpenRating(booking);
                }}
                className="py-3 px-4 bg-white/10 hover:bg-white/20 text-white text-xs font-bold uppercase tracking-wider transition flex items-center justify-center gap-2"
              >
                <Star className="w-4 h-4 text-[#CCFF00]" />
                <span>Rate Service</span>
              </button>

              <button
                onClick={() => {
                  onClose();
                  navigate('/community');
                }}
                className="py-3 px-4 bg-[#CCFF00] hover:bg-[#D4FF00] text-black text-xs font-bold uppercase tracking-wider transition flex items-center justify-center gap-2"
              >
                <Coins className="w-4 h-4" />
                <span>View Pool</span>
              </button>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};
