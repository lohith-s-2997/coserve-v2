import React from 'react';
import { motion } from 'motion/react';
import { useApp } from '../context/AppContext';
import {
  Sparkles,
  Gift,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Layers,
} from 'lucide-react';

export const CustomerCreditsView: React.FC = () => {
  const { customerCredits, customerCreditHistory, customer, showToast, navigate } = useApp();

  const redeemOffers = [
    {
      id: 'red-1',
      title: '₹50 Off Next Booking Fee',
      cost: 100,
      description: 'Deduct ₹50 directly from the platform fee or service tariff on your next appointment.',
    },
    {
      id: 'red-2',
      title: 'Cluster Participation Fee Waiver',
      cost: 60,
      description: 'Zero platform fee when joining an active apartment or street demand cluster.',
    },
    {
      id: 'red-3',
      title: 'Monsoon Preventive HVAC Check Voucher',
      cost: 80,
      description: 'Free digital health inspection checklist with verified cooperative HVAC technician.',
    },
  ];

  const handleRedeem = (offerTitle: string, cost: number) => {
    if (customerCredits < cost) {
      showToast('Insufficient customer loyalty credits balance.');
      return;
    }
    showToast(`Redeemed ${cost} CoServe Credits for "${offerTitle}"! Applied to your profile.`);
  };

  return (
    <div className="w-full bg-[#F5F5F2] text-[#0A0A0A] font-mono-code min-h-screen py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-12">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 pb-6 border-b border-black/15">
          <div>
            <div className="text-black/50 text-xs font-bold uppercase tracking-widest flex items-center gap-2">
              <span>[ CUSTOMER REWARDS LEDGER ]</span>
              <span>•</span>
              <span>MEMBER: {customer.name}</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-black font-display text-black uppercase tracking-tight mt-2">
              COSERVE CREDITS.
            </h1>
            <p className="text-xs text-black/60 font-sans mt-1 max-w-xl">
              Loyalty credits earned exclusively by keeping bookings registered under CoServe's protected escrow and verification protocol.
            </p>
          </div>

          <button
            onClick={() => navigate('/network')}
            className="px-6 py-3 bg-black hover:bg-neutral-800 text-white text-xs font-bold uppercase tracking-wider transition flex items-center gap-2 shrink-0"
          >
            <span>My Trusted Network</span>
            <ArrowRight className="w-4 h-4 text-[#CCFF00]" />
          </button>
        </div>

        {/* BALANCE HERO */}
        <div className="bg-[#0A0A0A] text-[#F5F5F2] border border-black p-6 sm:p-10 relative overflow-hidden shadow-2xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-8 relative z-10">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#CCFF00]/10 border border-[#CCFF00]/30 text-[#CCFF00] text-[10px] font-bold uppercase tracking-widest">
                <Sparkles className="w-3.5 h-3.5" />
                <span>CUSTOMER LOYALTY BALANCE</span>
              </div>
              <div className="text-xs text-white/50 uppercase font-bold">AVAILABLE COSERVE CREDITS</div>
              <div className="flex items-baseline gap-4">
                <span className="text-5xl sm:text-7xl font-black font-display text-[#CCFF00] tracking-tight">
                  {customerCredits}
                </span>
                <span className="text-xs text-white/70 font-bold uppercase tracking-wider">
                  PTS EARNED
                </span>
              </div>
              <p className="text-xs text-white/70 font-sans max-w-md">
                Earned +25 Credits for every completed protected booking. Use them for booking discounts and cluster priority booking.
              </p>
            </div>

            <div className="p-4 bg-white/5 border border-white/10 sm:w-72 shrink-0 space-y-2 text-xs">
              <div className="text-[10px] text-[#CCFF00] font-bold uppercase">REWARD PROTOCOL</div>
              <div className="text-white/80 font-sans text-[11px]">
                Unlike worker Gig-to-Growth credits (which fund cooperative equipment and certifications), customer credits reward repeat verified transactions.
              </div>
            </div>
          </div>
        </div>

        {/* REDEMPTION OFFERS */}
        <div className="space-y-6">
          <div className="text-xs uppercase font-bold text-black/50 tracking-wider">
            AVAILABLE REWARDS & VOUCHERS
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {redeemOffers.map((offer) => (
              <div
                key={offer.id}
                className="bg-white border border-black/15 p-6 flex flex-col justify-between space-y-4 hover:border-black transition"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="px-2 py-0.5 bg-black text-[#CCFF00] text-[10px] font-bold uppercase">
                      {offer.cost} CREDITS
                    </span>
                    <Gift className="w-4 h-4 text-black/50" />
                  </div>
                  <h3 className="text-lg font-black font-display uppercase tracking-tight text-black">
                    {offer.title}
                  </h3>
                  <p className="text-xs text-black/60 font-sans leading-relaxed">
                    {offer.description}
                  </p>
                </div>

                <button
                  onClick={() => handleRedeem(offer.title, offer.cost)}
                  disabled={customerCredits < offer.cost}
                  className={`w-full py-2.5 text-xs font-bold uppercase tracking-wider transition ${
                    customerCredits >= offer.cost
                      ? 'bg-black hover:bg-neutral-800 text-white'
                      : 'bg-black/10 text-black/30 cursor-not-allowed'
                  }`}
                >
                  {customerCredits >= offer.cost ? 'Redeem Voucher' : 'Insufficient Credits'}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* RECENT REWARD TRANSACTIONS */}
        <div className="bg-white border border-black/15 p-6 space-y-6">
          <div className="text-[10px] uppercase font-bold text-black/50 tracking-wider">
            TRANSACTION HISTORY
          </div>

          <div className="divide-y divide-black/10 space-y-3">
            {customerCreditHistory.map((tx) => (
              <div key={tx.id} className="pt-3 flex items-center justify-between gap-4 text-xs">
                <div className="space-y-0.5">
                  <div className="font-bold text-black">{tx.description}</div>
                  <div className="text-[10px] text-black/50">{tx.date}</div>
                </div>
                <div className="text-right font-black font-display text-sm text-black">
                  +{tx.amount} pts
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
