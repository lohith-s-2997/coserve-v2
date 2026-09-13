import React, { useState } from 'react';
import { motion } from 'motion/react';
import { useApp } from '../context/AppContext';
import { TrustedNetworkItem } from '../types';
import {
  Users,
  Star,
  Clock,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Calendar,
  XCircle,
  HelpCircle,
  Repeat,
  Zap,
} from 'lucide-react';

export const TrustedNetworkView: React.FC = () => {
  const {
    trustedNetwork,
    createRepeatBooking,
    navigate,
    bookings,
    customer,
  } = useApp();

  const [selectedProForRebook, setSelectedProForRebook] = useState<TrustedNetworkItem | null>(null);

  // Check if Arjun AC Services is in bookings or trustedNetwork
  const arjunBooking = bookings.find((b) => b.businessName.includes('Arjun'));
  const hasArjunInNetwork = trustedNetwork.some((i) => i.businessName.includes('Arjun'));

  const handleBookAgainClick = (item: TrustedNetworkItem) => {
    setSelectedProForRebook(item);
  };

  const handleConfirmRepeatBooking = () => {
    if (!selectedProForRebook) return;
    createRepeatBooking(selectedProForRebook);
    setSelectedProForRebook(null);
    navigate('/bookings');
  };

  return (
    <div className="w-full bg-[#F5F5F2] text-[#0A0A0A] font-mono-code min-h-screen py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 pb-6 border-b border-black/15">
          <div>
            <div className="text-black/50 text-xs font-bold uppercase tracking-widest flex items-center gap-2">
              <span>[ RELATIONSHIP INFRASTRUCTURE ]</span>
              <span>•</span>
              <span>CUSTOMER: {customer.name}</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-black font-display text-black uppercase tracking-tight mt-2">
              MY TRUSTED NETWORK.
            </h1>
            <p className="text-xs text-black/60 font-sans mt-1 max-w-2xl">
              You already know the professional. CoServe provides the digital infrastructure—lower repeat fees (₹10), digital invoices, replacement backup, and warranty protection.
            </p>
          </div>

          <div className="px-4 py-2 bg-black text-white text-xs font-bold uppercase tracking-wider flex items-center gap-2">
            <Users className="w-4 h-4 text-[#CCFF00]" />
            <span>{trustedNetwork.length} Connected Professionals</span>
          </div>
        </div>

        {/* HERO PHILOSOPHY BANNER: WHY STAY ON COSERVE? */}
        <div className="bg-[#0A0A0A] text-[#F5F5F2] border border-black p-6 sm:p-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-10 font-display font-black text-8xl pointer-events-none select-none">
            REBOOK
          </div>

          <div className="max-w-3xl space-y-4 relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#CCFF00]/10 border border-[#CCFF00]/30 text-[#CCFF00] text-[10px] font-bold uppercase tracking-widest">
              <Sparkles className="w-3.5 h-3.5" />
              <span>THE COSERVE RETENTION THESIS</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-black font-display uppercase tracking-tight text-white">
              “AFTER A CUSTOMER MEETS A WORKER ONCE, WHY WOULD EITHER STAY ON COSERVE?”
            </h2>

            <p className="text-xs sm:text-sm text-white/80 font-sans leading-relaxed">
              We do <strong className="text-white">NOT</strong> use artificial communication restrictions, phone masking, or punitive platform lock-ins. Instead, CoServe makes direct rebooking through the cooperative significantly safer, cheaper, and more organized.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs">
              <div className="p-3 bg-white/5 border border-white/10">
                <span className="text-[#CCFF00] font-bold block mb-1">₹10 REPEAT FEE</span>
                <span className="text-white/60 text-[11px] font-sans">
                  60% discount on the platform protection fee for trusted repeat appointments.
                </span>
              </div>
              <div className="p-3 bg-white/5 border border-white/10">
                <span className="text-[#CCFF00] font-bold block mb-1">PEER BACKUP GUARANTEE</span>
                <span className="text-white/60 text-[11px] font-sans">
                  If your regular artisan falls sick, verified guild peers step in seamlessly.
                </span>
              </div>
              <div className="p-3 bg-white/5 border border-white/10">
                <span className="text-[#CCFF00] font-bold block mb-1">AUDIT-READY INVOICES</span>
                <span className="text-white/60 text-[11px] font-sans">
                  Permanent tax records, appliance warranty compliance, and +25 loyalty credits.
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* TRUSTED NETWORK ROSTER (CARDS & NODES) */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="text-xs uppercase font-bold text-black/50 tracking-wider">
              YOUR PERSONAL SERVICE GRAPH ({trustedNetwork.length} TRADES)
            </div>
            <div className="text-xs text-black/60 font-sans">
              Click <strong className="text-black">Book Again</strong> to rebook with ₹10 repeat fee
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {trustedNetwork.map((pro) => (
              <div
                key={pro.id}
                className="bg-white border border-black/15 shadow-xs p-6 flex flex-col justify-between space-y-5 hover:border-black transition"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-1 bg-black text-white text-[10px] font-bold uppercase tracking-wider">
                      {pro.category}
                    </span>
                    <span className="flex items-center gap-1 text-xs font-bold text-black">
                      <Star className="w-3.5 h-3.5 fill-black text-black" />
                      <span>{pro.rating.toFixed(1)}</span>
                    </span>
                  </div>

                  <div>
                    <h3 className="text-xl font-black font-display uppercase tracking-tight text-black">
                      {pro.businessName}
                    </h3>
                    <div className="text-xs text-black/60 font-sans">
                      Lead: <span className="font-bold text-black">{pro.professionalName}</span> ({pro.trade})
                    </div>
                  </div>

                  <div className="p-3 bg-black/5 border border-black/10 space-y-1 text-xs">
                    <div className="flex justify-between text-black/60 text-[11px]">
                      <span>Jobs with you:</span>
                      <span className="font-bold text-black">{pro.completedJobsWithYou} Completed</span>
                    </div>
                    <div className="flex justify-between text-black/60 text-[11px]">
                      <span>Last Service:</span>
                      <span className="font-bold text-black">{pro.lastServiceDate}</span>
                    </div>
                    <div className="flex justify-between text-black/60 text-[11px]">
                      <span>Availability:</span>
                      <span className="font-bold text-[#0A0A0A]">{pro.availability}</span>
                    </div>
                  </div>
                </div>

                {/* Pricing and Action */}
                <div className="pt-3 border-t border-black/10 space-y-3">
                  <div className="flex justify-between items-baseline">
                    <div>
                      <span className="text-[10px] text-black/50 uppercase block">REPEAT TARIFF</span>
                      <span className="text-xs text-black/70">
                        ₹{pro.baseServicePrice} + <strong className="text-black">₹{pro.repeatBookingFee} Fee</strong>
                      </span>
                    </div>
                    <div className="text-2xl font-black font-display text-black">
                      ₹{pro.totalRepeatPrice}
                    </div>
                  </div>

                  <button
                    onClick={() => handleBookAgainClick(pro)}
                    className="w-full py-3 bg-black hover:bg-neutral-800 text-white text-xs font-bold uppercase tracking-wider transition flex items-center justify-center gap-2 shadow-xs"
                  >
                    <Repeat className="w-3.5 h-3.5 text-[#CCFF00]" />
                    <span>Book {pro.professionalName.split(' ')[0]} Again</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* COMPARISON INTERACTION: DIRECT ARRANGEMENT VS COSERVE REBOOKING */}
        <div className="bg-white border border-black/15 p-6 sm:p-8 space-y-6">
          <div>
            <div className="text-[10px] uppercase font-bold text-black/50 tracking-wider">
              DECISION ARCHITECTURE
            </div>
            <h2 className="text-2xl sm:text-3xl font-black font-display uppercase tracking-tight text-black mt-1">
              DIRECT ARRANGEMENT VS. COSERVE REBOOKING
            </h2>
            <p className="text-xs text-black/60 font-sans mt-0.5">
              Why both customers and artisans choose to keep bookings registered on CoServe:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Direct Arrangement */}
            <div className="p-6 bg-red-500/5 border border-red-500/20 space-y-4">
              <div className="flex items-center gap-2 text-red-700 text-xs font-black uppercase tracking-wider">
                <XCircle className="w-4 h-4 text-red-600" />
                <span>DIRECT UNREGISTERED ARRANGEMENT</span>
              </div>

              <ul className="space-y-3 text-xs text-black/80 font-sans">
                <li className="flex items-start gap-2">
                  <span className="text-red-500 font-bold">✕</span>
                  <span><strong>Zero Warranty Recourse:</strong> No formal service history or verifiable digital invoice for appliance manufacturer guarantees.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 font-bold">✕</span>
                  <span><strong>No Emergency Backup:</strong> If the worker experiences transit breakdown or illness, you are left completely stranded.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 font-bold">✕</span>
                  <span><strong>Unassisted Disputes:</strong> If work fails 3 days later, awkward negotiations occur without cooperative mediation.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 font-bold">✕</span>
                  <span><strong>Zero Community Contribution:</strong> No reinvestment into local tool pools or safety gear for workers.</span>
                </li>
              </ul>
            </div>

            {/* CoServe Protected Rebooking */}
            <div className="p-6 bg-black text-white border border-black space-y-4">
              <div className="flex items-center gap-2 text-[#CCFF00] text-xs font-black uppercase tracking-wider">
                <CheckCircle2 className="w-4 h-4 text-[#CCFF00]" />
                <span>COSERVE PROTECTED REBOOKING (₹10 FEE)</span>
              </div>

              <ul className="space-y-3 text-xs text-white/80 font-sans">
                <li className="flex items-start gap-2">
                  <span className="text-[#CCFF00] font-bold">✓</span>
                  <span><strong>Auditable Digital Invoices:</strong> Permanent GST-compliant work records for warranty, insurance, and rental claims.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#CCFF00] font-bold">✓</span>
                  <span><strong>Ward Peer Backup:</strong> 84 verified cooperative artisans instantly back each other up under mutual-aid pacts.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#CCFF00] font-bold">✓</span>
                  <span><strong>Human Dispute Assistance:</strong> Ward 102 Steward reviews scope photos and guarantees free revisitations.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#CCFF00] font-bold">✓</span>
                  <span><strong>Community Growth & Loyalty:</strong> Generates +25 customer credits and funds democratic artisan tooling.</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Editorial Quotes Banner */}
          <div className="p-6 bg-black/5 border-t border-black/15 text-center space-y-2">
            <blockquote className="text-sm sm:text-base font-bold font-display uppercase tracking-tight text-black max-w-2xl mx-auto">
              “CoServe doesn't try to own the relationship. It makes the relationship more useful.”
            </blockquote>
            <p className="text-xs text-black/60 font-sans max-w-xl mx-auto">
              Existing platforms digitize the middleman. CoServe digitizes the cooperative.
            </p>
          </div>
        </div>

        {/* REPEAT BOOKING CONFIRMATION MODAL */}
        {selectedProForRebook && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-[#0A0A0A] text-[#F5F5F2] border border-white/20 p-4 sm:p-8 max-w-lg w-full max-h-[90vh] overflow-y-auto font-mono-code space-y-6"
            >
              <div>
                <div className="text-[10px] text-[#CCFF00] font-bold uppercase tracking-widest mb-1">
                  1-CLICK REPEAT BOOKING CONFIRMATION
                </div>
                <h3 className="text-2xl font-black font-display uppercase tracking-tight text-white">
                  REBOOK {selectedProForRebook.businessName}
                </h3>
                <p className="text-xs text-white/60 font-sans mt-1">
                  Scheduling next appointment with Lead Artisan <strong className="text-white">{selectedProForRebook.professionalName}</strong>.
                </p>
              </div>

              <div className="p-4 bg-white/5 border border-white/10 space-y-3 text-xs">
                <div className="flex justify-between">
                  <span className="text-white/60">Base Service Rate:</span>
                  <span className="font-bold text-white">₹{selectedProForRebook.baseServicePrice}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/60">Discounted Repeat Fee:</span>
                  <span className="font-bold text-[#CCFF00]">₹{selectedProForRebook.repeatBookingFee} (Saved ₹15)</span>
                </div>
                <div className="flex justify-between items-baseline pt-2 border-t border-white/10">
                  <span className="font-bold uppercase text-white">Total Demonstration Amount:</span>
                  <span className="text-2xl font-black font-display text-white">
                    ₹{selectedProForRebook.totalRepeatPrice}
                  </span>
                </div>
              </div>

              <p className="text-[11px] text-white/60 font-sans italic">
                *Demonstration pricing. This will generate a new requested order in your escrow book.
              </p>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-end gap-3 pt-2">
                <button
                  onClick={() => setSelectedProForRebook(null)}
                  className="w-full sm:w-auto px-4 py-2.5 border border-white/20 hover:bg-white/10 text-white text-xs font-bold uppercase tracking-wider text-center"
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirmRepeatBooking}
                  className="w-full sm:w-auto justify-center px-6 py-2.5 bg-[#CCFF00] hover:bg-[#D4FF00] text-black text-xs font-black uppercase tracking-wider flex items-center gap-2 text-center"
                >
                  <span>CONFIRM REPEAT BOOKING</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
};
