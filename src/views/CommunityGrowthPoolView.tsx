import React, { useState } from 'react';
import { motion } from 'motion/react';
import { useApp } from '../context/AppContext';
import {
  Coins,
  ShieldCheck,
  Building2,
  Users,
  Award,
  ArrowRight,
  TrendingUp,
  Sparkles,
  Layers,
  HeartHandshake,
  CheckCircle2,
  Wrench,
  Calculator,
} from 'lucide-react';

export const CommunityGrowthPoolView: React.FC = () => {
  const {
    growthPoolBalance,
    growthPoolContributions,
    growthPoolAllocations,
    navigate,
  } = useApp();

  const [selectedSupportAmount, setSelectedSupportAmount] = useState<number>(2000);

  const totalAllocated = growthPoolAllocations.reduce((acc, a) => acc + a.allocatedAmount, 0);
  const unallocatedBalance = Math.max(0, growthPoolBalance - totalAllocated);

  const skillAllocCategory = growthPoolAllocations.find((a) => a.category.includes('Skill')) || growthPoolAllocations[0];
  const allocationPoolSize = skillAllocCategory?.allocatedAmount || 18000;
  const estimatedBeneficiaries = Math.floor(allocationPoolSize / selectedSupportAmount);

  return (
    <div className="w-full bg-[#F5F5F2] text-[#0A0A0A] font-mono-code min-h-screen py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 pb-6 border-b border-black/15">
          <div>
            <div className="text-black/50 text-xs font-bold uppercase tracking-widest flex items-center gap-2">
              <span>[ TRANSPARENT COOPERATIVE TREASURY ]</span>
              <span>•</span>
              <span>ZONE VI • WARD 102</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-black font-display text-black uppercase tracking-tight mt-2">
              COMMUNITY GROWTH POOL.
            </h1>
            <p className="text-xs text-black/60 font-sans mt-1 max-w-2xl">
              A transparent cooperative development fund supporting professional skills, tool upgrades, safety gear, and emergency assistance based on democratic governance rules.
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

        {/* SECTION 1: WHAT IS THE COMMUNITY GROWTH POOL? */}
        <div className="bg-white border border-black/15 p-6 sm:p-10 space-y-6">
          <div className="space-y-2">
            <div className="text-xs font-bold uppercase tracking-widest text-emerald-700">
              COOPERATIVE INFRASTRUCTURE
            </div>
            <h2 className="text-2xl sm:text-3xl font-black font-display uppercase text-black">
              WHAT IS THE COMMUNITY GROWTH POOL?
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-black/80 font-sans leading-relaxed">
            Unlike corporate gig platforms that extract 25–30% commissions for private shareholders, CoServe is structured as a non-extractive artisan cooperative. A small transparent portion of eligible booking fees is allocated to a cooperative development pool. The pool supports professional skills, safety equipment, and training based on transparent eligibility rules rather than algorithmic favoritism.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
            <div className="p-4 bg-black/5 border border-black/10">
              <span className="font-bold text-black block mb-1 uppercase text-xs">Zero Corporate Extractivism</span>
              <span className="text-[11px] text-black/70 font-sans">100% of service tariffs go directly to artisan payout ledgers.</span>
            </div>
            <div className="p-4 bg-black/5 border border-black/10">
              <span className="font-bold text-black block mb-1 uppercase text-xs">Democratic Oversight</span>
              <span className="text-[11px] text-black/70 font-sans">Allocations are co-governed by registered ward artisans and stewards.</span>
            </div>
            <div className="p-4 bg-black/5 border border-black/10">
              <span className="font-bold text-black block mb-1 uppercase text-xs">Verifiable Transparency</span>
              <span className="text-[11px] text-black/70 font-sans">Every contribution and support allocation is recorded on a public ledger.</span>
            </div>
          </div>
        </div>

        {/* SECTION 2: WHERE DOES MONEY ENTER THE POOL? (Illustrative Booking Example) */}
        <div className="bg-[#0A0A0A] text-white border border-black p-6 sm:p-10 space-y-6">
          <div className="space-y-2">
            <div className="text-[#CCFF00] text-xs font-bold uppercase tracking-widest">
              FEE DISTRIBUTION MODEL
            </div>
            <h2 className="text-2xl sm:text-3xl font-black font-display uppercase text-white">
              HOW MONEY ENTERS THE POOL
            </h2>
            <p className="text-xs text-white/60 font-sans">
              *Illustrative booking example for a standard ₹500 home service order with protection fee.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-center">
            <div className="p-5 bg-white/5 border border-white/10 space-y-2">
              <div className="text-[10px] uppercase font-bold text-white/50">Customer Pays</div>
              <div className="text-3xl font-black font-display text-white">₹525</div>
              <div className="text-[10px] text-white/60 font-sans">₹500 tariff + ₹25 protection fee</div>
            </div>
            <div className="p-5 bg-emerald-950/40 border border-emerald-500/40 space-y-2">
              <div className="text-[10px] uppercase font-bold text-emerald-400">Professional Payout</div>
              <div className="text-3xl font-black font-display text-emerald-400">₹500</div>
              <div className="text-[10px] text-emerald-300 font-sans">100% direct artisan tariff</div>
            </div>
            <div className="p-5 bg-white/5 border border-white/10 space-y-2">
              <div className="text-[10px] uppercase font-bold text-white/50">CoServe Operations</div>
              <div className="text-3xl font-black font-display text-white">₹15</div>
              <div className="text-[10px] text-white/60 font-sans">Hosting & SMS infrastructure</div>
            </div>
            <div className="p-5 bg-[#CCFF00]/10 border border-[#CCFF00]/40 space-y-2">
              <div className="text-[10px] uppercase font-bold text-[#CCFF00]">Community Growth Pool</div>
              <div className="text-3xl font-black font-display text-[#CCFF00]">₹10</div>
              <div className="text-[10px] text-[#CCFF00]/80 font-sans">Direct cooperative allocation</div>
            </div>
          </div>
        </div>

        {/* TREASURY HERO BALANCE */}
        <div className="bg-white border border-black/15 p-6 sm:p-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
          <div className="space-y-3">
            <div className="text-xs font-bold uppercase tracking-widest text-black/50">CURRENT DEMO POOL BALANCE</div>
            <div className="flex items-baseline gap-4">
              <span className="text-5xl sm:text-6xl font-black font-display text-black tracking-tight">
                ₹{growthPoolBalance.toLocaleString('en-IN')}
              </span>
              <span className="text-xs text-emerald-700 font-bold uppercase">
                Active Ward Treasury
              </span>
            </div>
            <p className="text-xs text-black/70 font-sans max-w-lg">
              Co-governed by 84 registered artisans in Anna Nagar Ward 102. Available for approved skill certifications, safety gear, and tool grants.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 shrink-0">
            <div className="p-4 bg-black/5 border border-black/10">
              <div className="text-black/50 text-[10px] uppercase font-bold">Allocated Funds</div>
              <div className="text-2xl font-black font-display text-black mt-1">
                ₹{totalAllocated.toLocaleString('en-IN')}
              </div>
            </div>
            <div className="p-4 bg-emerald-50 border border-emerald-200">
              <div className="text-emerald-800 text-[10px] uppercase font-bold">Liquid Reserves</div>
              <div className="text-2xl font-black font-display text-emerald-800 mt-1">
                ₹{unallocatedBalance.toLocaleString('en-IN')}
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 3: SKILL CERTIFICATION & BENEFICIARY CALCULATOR */}
        <div className="bg-white border border-black/15 p-6 sm:p-10 space-y-8">
          <div className="space-y-2">
            <div className="text-xs font-bold uppercase tracking-widest text-emerald-700">
              CAPACITY MODELING
            </div>
            <h2 className="text-2xl sm:text-3xl font-black font-display uppercase text-black">
              SKILL DEVELOPMENT & BENEFICIARY CAPACITY
            </h2>
            <p className="text-xs text-black/70 font-sans">
              Interactive calculator showing how cooperative pool allocations translate into artisan capacity based on illustrative support amounts.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-black/5 p-6 border border-black/10">
            <div className="lg:col-span-6 space-y-4">
              <div className="text-xs font-bold uppercase text-black">
                Available Skill-Development Allocation: <span className="text-emerald-700 font-mono text-sm">₹{allocationPoolSize.toLocaleString('en-IN')}</span>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] uppercase font-bold text-black/60 block">
                  Select Illustrative Support Amount Per Professional: ₹{selectedSupportAmount}
                </label>
                <input
                  type="range"
                  min="1000"
                  max="5000"
                  step="500"
                  value={selectedSupportAmount}
                  onChange={(e) => setSelectedSupportAmount(parseInt(e.target.value, 10))}
                  className="w-full accent-black cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-black/50 font-mono">
                  <span>₹1,000 (Basic Gear)</span>
                  <span>₹3,000 (Advanced Course)</span>
                  <span>₹5,000 (Major Kit)</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6 p-6 bg-[#0A0A0A] text-white flex items-center justify-between gap-6 border border-black">
              <div>
                <div className="text-[10px] uppercase font-bold text-[#CCFF00]">Illustrative Capacity</div>
                <div className="text-4xl sm:text-5xl font-black font-display text-white mt-1">
                  UP TO {estimatedBeneficiaries} PROFESSIONALS
                </div>
                <p className="text-[11px] text-white/60 font-sans mt-1">
                  Could receive ₹{selectedSupportAmount} support from the ₹{allocationPoolSize.toLocaleString('en-IN')} skill allocation.
                </p>
              </div>
              <Calculator className="w-12 h-12 text-[#CCFF00] shrink-0" />
            </div>
          </div>

          {/* Allocation Categories */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              {
                title: 'Skill Certification',
                amount: '₹18,000',
                desc: 'Government ITI & manufacturer certifications for advanced HVAC and electrical work.',
              },
              {
                title: 'Equipment Support',
                amount: '₹12,000',
                desc: 'Subsidized professional hand tools, vacuum pumps, and diagnostic meters.',
              },
              {
                title: 'Safety Gear',
                amount: '₹7,000',
                desc: 'Insulated gloves, safety harnesses, voltage detectors, and protective eyewear.',
              },
              {
                title: 'Emergency Assistance',
                amount: '₹5,000',
                desc: 'Cooperative medical or transit hardship support for registered members.',
              },
              {
                title: 'Apprentice Training',
                amount: '₹9,500',
                desc: 'Mentorship stipends for junior neighborhood apprentices paired with master artisans.',
              },
            ].map((cat, i) => (
              <div key={i} className="p-5 bg-white border border-black/15 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-black uppercase text-xs">{cat.title}</span>
                  <span className="font-bold text-emerald-700 text-xs">{cat.amount}</span>
                </div>
                <p className="text-[11px] text-black/70 font-sans leading-relaxed">{cat.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* SECTION 4: PROFESSIONAL BENEFIT EXAMPLE & GOVERNANCE */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Professional Benefit Example */}
          <div className="bg-white border border-black/15 p-6 sm:p-8 space-y-6">
            <div className="space-y-1">
              <span className="text-[10px] uppercase font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 border border-emerald-200">
                Illustrative Example
              </span>
              <h3 className="text-xl font-black font-display uppercase text-black mt-1">
                RAVI — ELECTRICIAN
              </h3>
            </div>
            <div className="space-y-3 text-xs font-sans text-black/80">
              <div className="flex justify-between border-b border-black/10 pb-2">
                <span className="text-black/60">Completed Jobs:</span>
                <span className="font-bold text-black font-mono">42 Verified</span>
              </div>
              <div className="flex justify-between border-b border-black/10 pb-2">
                <span className="text-black/60">Rating & Standing:</span>
                <span className="font-bold text-black font-mono">★ 4.8 • Active Member</span>
              </div>
              <div className="flex justify-between border-b border-black/10 pb-2">
                <span className="text-black/60">Training Requested:</span>
                <span className="font-bold text-black">Advanced Electrical Safety</span>
              </div>
              <div className="flex justify-between border-b border-black/10 pb-2">
                <span className="text-black/60">Example Course Cost:</span>
                <span className="font-bold text-black font-mono">₹3,000</span>
              </div>
              <div className="flex justify-between border-b border-black/10 pb-2">
                <span className="text-black/60">Growth Pool Support:</span>
                <span className="font-bold text-emerald-700 font-mono">₹2,000 (Approved)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-black/60">Artisan Contribution:</span>
                <span className="font-bold text-black font-mono">₹1,000</span>
              </div>
            </div>
          </div>

          {/* Governance Workflow */}
          <div className="bg-[#0A0A0A] text-white border border-black p-6 sm:p-8 space-y-6">
            <div className="space-y-1">
              <span className="text-[10px] uppercase font-bold text-[#CCFF00] bg-[#CCFF00]/10 px-2 py-0.5 border border-[#CCFF00]/30">
                Democratic Protocol
              </span>
              <h3 className="text-xl font-black font-display uppercase text-white mt-1">
                HOW SUPPORT IS DECIDED
              </h3>
            </div>
            <div className="space-y-4 text-xs font-sans text-white/80">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-[#CCFF00] text-black flex items-center justify-center font-bold text-xs shrink-0">1</div>
                <div>
                  <strong className="text-white block">Eligibility & Criteria</strong>
                  <span className="text-[11px] text-white/60">Minimum 30 completed orders and clean cooperative standing.</span>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-[#CCFF00] text-black flex items-center justify-center font-bold text-xs shrink-0">2</div>
                <div>
                  <strong className="text-white block">Cooperative Review</strong>
                  <span className="text-[11px] text-white/60">Ward steward and peer council evaluate relevance and fund balance.</span>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-[#CCFF00] text-black flex items-center justify-center font-bold text-xs shrink-0">3</div>
                <div>
                  <strong className="text-white block">Recorded Allocation</strong>
                  <span className="text-[11px] text-white/60">Approved support is logged on the public ledger and disbursed upon certificate completion.</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* RECENT POOL ACTIVITY LEDGER */}
        <div className="bg-white border border-black/15 p-6 sm:p-8 space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-black/10">
            <div>
              <div className="text-[10px] uppercase font-bold text-black/50">PUBLIC LEDGER</div>
              <h3 className="text-xl font-black font-display uppercase tracking-tight text-black">
                RECENT POOL ACTIVITY
              </h3>
            </div>
            <span className="text-[10px] text-emerald-700 uppercase font-mono font-bold">VERIFIED CO-OP LEDGER</span>
          </div>

          <div className="divide-y divide-black/10 space-y-3">
            {growthPoolContributions.map((c) => (
              <div key={c.id} className="pt-3 flex items-start justify-between gap-4 text-xs">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-black">{c.service}</span>
                    {c.isLatest && (
                      <span className="px-2 py-0.5 bg-[#CCFF00] text-black text-[9px] font-black uppercase">
                        CONTRIBUTION
                      </span>
                    )}
                  </div>
                  <div className="text-[11px] text-black/60 font-sans mt-0.5">
                    Customer: {c.customerName} • Pro: {c.workerName}
                  </div>
                </div>
                <div className="text-right">
                  <span className="font-bold text-emerald-700 font-mono-code">+{c.amount}</span>
                  <div className="text-[10px] text-black/50">{c.poolShare} to pool</div>
                </div>
              </div>
            ))}
            <div className="pt-3 flex items-start justify-between gap-4 text-xs">
              <div>
                <span className="font-bold text-black block">Advanced Electrical Training Support</span>
                <span className="text-[11px] text-black/60 font-sans">Disbursed to Ravi Kumar (Electrician)</span>
              </div>
              <div className="text-right">
                <span className="font-bold text-red-600 font-mono-code">-₹2,000</span>
                <div className="text-[10px] text-emerald-700 font-bold">Completed</div>
              </div>
            </div>
            <div className="pt-3 flex items-start justify-between gap-4 text-xs">
              <div>
                <span className="font-bold text-black block">Safety Gear & Insulated Toolkit Subsidy</span>
                <span className="text-[11px] text-black/60 font-sans">Disbursed to Kumar (Plumber)</span>
              </div>
              <div className="text-right">
                <span className="font-bold text-red-600 font-mono-code">-₹1,200</span>
                <div className="text-[10px] text-emerald-700 font-bold">Approved</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
