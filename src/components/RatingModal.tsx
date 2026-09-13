import React, { useState } from 'react';
import { motion } from 'motion/react';
import { useApp } from '../context/AppContext';
import { Booking } from '../types';
import {
  Star,
  CheckCircle2,
  X,
  Users,
  ShieldCheck,
  ArrowRight,
  Sparkles,
} from 'lucide-react';

interface RatingModalProps {
  booking: Booking;
  onClose: () => void;
}

export const RatingModal: React.FC<RatingModalProps> = ({ booking, onClose }) => {
  const { rateBooking, addToTrustedNetwork, navigate } = useApp();

  const [rating, setRating] = useState<number>(5);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [selectedTags, setSelectedTags] = useState<string[]>([
    'Professional',
    'On Time',
    'Good Quality',
  ]);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [addedToNetwork, setAddedToNetwork] = useState<boolean>(false);

  const availableTags = [
    'Professional',
    'On Time',
    'Good Quality',
    'Clear Communication',
    'Fair Tariff',
    'Would Book Again',
  ];

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const handleSubmit = () => {
    rateBooking(booking.id, rating, selectedTags);
    setSubmitted(true);
  };

  const handleAddToNetwork = () => {
    addToTrustedNetwork(booking);
    setAddedToNetwork(true);
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

        {!submitted ? (
          <div className="space-y-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#CCFF00]/10 border border-[#CCFF00]/30 text-[#CCFF00] text-[10px] font-bold uppercase tracking-widest mb-3">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>COOPERATIVE REPUTATION RECORDING</span>
              </div>
              <h2 className="text-2xl font-black font-display uppercase tracking-tight text-white">
                RATE YOUR SERVICE
              </h2>
              <p className="text-xs text-white/60 font-sans mt-1">
                How was your experience with <strong className="text-white">{booking.businessName}</strong> ({booking.providerName})?
              </p>
            </div>

            {/* Star Rating Selector */}
            <div className="bg-white/5 border border-white/10 p-6 text-center space-y-3">
              <div className="text-[10px] uppercase font-bold text-white/40 tracking-wider">
                OVERALL SERVICE QUALITY
              </div>
              <div className="flex justify-center items-center gap-3">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    onClick={() => setRating(star)}
                    className="p-1 transition transform hover:scale-125 focus:outline-hidden"
                  >
                    <Star
                      className={`w-8 h-8 transition-colors ${
                        (hoverRating || rating) >= star
                          ? 'text-[#CCFF00] fill-[#CCFF00]'
                          : 'text-white/20'
                      }`}
                    />
                  </button>
                ))}
              </div>
              <div className="text-xs font-bold text-[#CCFF00] uppercase tracking-wider">
                {rating === 5 && 'Outstanding • Highly Recommended'}
                {rating === 4 && 'Good • Quality Workmanship'}
                {rating === 3 && 'Average • Met Expectations'}
                {rating === 2 && 'Below Average'}
                {rating === 1 && 'Unsatisfactory'}
              </div>
            </div>

            {/* Quick Experience Tags */}
            <div className="space-y-2">
              <div className="text-[10px] uppercase font-bold text-white/60 tracking-wider">
                HIGHLIGHT PRO'S QUALITIES
              </div>
              <div className="flex flex-wrap gap-2">
                {availableTags.map((tag) => {
                  const active = selectedTags.includes(tag);
                  return (
                    <button
                      key={tag}
                      type="button"
                      onClick={() => toggleTag(tag)}
                      className={`px-3 py-1.5 text-xs font-bold uppercase transition flex items-center gap-1.5 border ${
                        active
                          ? 'bg-[#CCFF00] text-black border-[#CCFF00]'
                          : 'bg-white/5 text-white/70 border-white/15 hover:border-white/40'
                      }`}
                    >
                      <span>{active ? '✓' : '+'}</span>
                      <span>{tag}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Submit Button */}
            <button
              onClick={handleSubmit}
              className="w-full py-3.5 bg-[#CCFF00] hover:bg-[#D4FF00] text-black text-xs font-black uppercase tracking-wider transition flex items-center justify-center gap-2 shadow-lg"
            >
              <span>SUBMIT COOPERATIVE RATING</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <div className="py-4 space-y-6 text-center">
            <div className="w-12 h-12 rounded-full bg-[#CCFF00] text-black flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-7 h-7" />
            </div>

            <div className="space-y-1">
              <div className="text-[#CCFF00] text-xs font-bold uppercase tracking-widest">
                [ REPUTATION LEDGER UPDATED ]
              </div>
              <h2 className="text-2xl font-black font-display uppercase tracking-tight text-white">
                THANK YOU FOR YOUR REVIEW!
              </h2>
              <p className="text-xs text-white/70 font-sans max-w-xs mx-auto">
                Your rating has been permanently recorded in Arjun's cooperative reputation profile.
              </p>
            </div>

            {/* TRUSTED NETWORK PROMPT (CRITICAL STAGE 3 INTERACTION) */}
            <div className="p-5 bg-white/10 border-2 border-[#CCFF00] text-left space-y-3">
              <div className="flex items-center gap-2 text-[#CCFF00] text-xs font-bold uppercase tracking-wider">
                <Users className="w-4 h-4" />
                <span>ADD ARJUN TO YOUR TRUSTED NETWORK?</span>
              </div>
              <p className="text-xs text-white/80 font-sans leading-relaxed">
                Why search from scratch next time? Add <strong className="text-white">Arjun AC Services</strong> to your personal network for 1-click repeat bookings, direct scheduling, and a discounted <strong className="text-[#CCFF00]">₹10 repeat protection fee</strong>!
              </p>

              {!addedToNetwork ? (
                <button
                  onClick={handleAddToNetwork}
                  className="w-full py-3 bg-[#CCFF00] hover:bg-[#D4FF00] text-black text-xs font-black uppercase tracking-wider transition flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>ADD ARJUN TO MY TRUSTED NETWORK</span>
                </button>
              ) : (
                <div className="p-3 bg-[#CCFF00]/20 border border-[#CCFF00] text-[#CCFF00] text-xs font-bold uppercase text-center">
                  ✓ ADDED TO YOUR TRUSTED NETWORK!
                </div>
              )}
            </div>

            <div className="flex items-center justify-between gap-3 pt-2">
              <button
                onClick={() => {
                  onClose();
                  navigate('/network');
                }}
                className="flex-1 py-2.5 px-4 bg-white/10 hover:bg-white/20 text-white text-xs font-bold uppercase tracking-wider transition"
              >
                View My Network
              </button>
              <button
                onClick={onClose}
                className="py-2.5 px-5 border border-white/20 hover:bg-white/10 text-white text-xs font-bold uppercase tracking-wider transition"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};
