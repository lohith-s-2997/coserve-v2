import React from 'react';
import { useApp } from '../context/AppContext';
import {
  Users2,
  ShieldCheck,
  Scale,
  TrendingUp,
  MapPin,
  CheckCircle2,
  ChevronRight,
  Sparkles,
} from 'lucide-react';

export const CooperativeDashboardView: React.FC = () => {
  const { admin, providers, setSelectedProvider, navigate, growthPoolBalance, growthPoolAllocations } = useApp();

  return (
    <div className="w-full bg-[#F5F5F2] text-[#0A0A0A] font-mono-code min-h-screen py-8 px-4 sm:px-6 lg:px-8 space-y-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Cooperative Federation Header */}
        <div className="bg-[#0A0A0A] text-[#F5F5F2] border border-black p-6 sm:p-10 space-y-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-white/10">
            <div className="space-y-1">
              <div className="text-xs uppercase tracking-widest text-[#CCFF00] font-bold">
                CIVIC TRADE GUILD FEDERATION
              </div>
              <h1 className="text-3xl sm:text-5xl font-black font-display text-white uppercase tracking-tight">
                {admin.cooperativeName}
              </h1>
              <div className="text-xs text-white/70 font-sans">
                Democratic Assembly & Non-Extractive Work Distribution Council • {admin.memberCount} Certified Guild Members
              </div>
            </div>

            <div className="p-3 bg-white/5 border border-white/15 text-right shrink-0">
              <div className="text-[10px] text-white/40 uppercase">FAIR ROTATION INDEX</div>
              <div className="text-2xl font-black font-display text-[#CCFF00]">98.4%</div>
              <div className="text-[10px] text-white/60">Zero Monopoly Saturation</div>
            </div>
          </div>

          {/* Federation Macro Metrics */}
          <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
            <div className="p-4 bg-white/5 border border-white/10">
              <div className="text-[10px] text-white/40 uppercase">VERIFIED GUILD ARTISANS</div>
              <div className="text-3xl font-black font-display text-white mt-1">84 Trades</div>
              <div className="text-[10px] text-white/60 mt-1">100% Identity & Skill Vetted</div>
            </div>

            <div className="p-4 bg-white/5 border border-white/10">
              <div className="text-[10px] text-white/40 uppercase">GROSS WORKER PAYOUTS</div>
              <div className="text-3xl font-black font-display text-[#CCFF00] mt-1">₹4,82,000</div>
              <div className="text-[10px] text-white/60 mt-1">Zero Platform Intermediary Skim</div>
            </div>

            <div className="p-4 bg-white/5 border border-white/10">
              <div className="text-[10px] text-white/40 uppercase">ESCROW DISPUTE RATIO</div>
              <div className="text-3xl font-black font-display text-white mt-1">0.02%</div>
              <div className="text-[10px] text-white/60 mt-1">Resolved via Peer Council</div>
            </div>

            <div className="p-4 bg-white/5 border border-white/10">
              <div className="text-[10px] text-white/40 uppercase">MUTUAL EMERGENCY RESERVE</div>
              <div className="text-3xl font-black font-display text-white mt-1">₹1,14,500</div>
              <div className="text-[10px] text-white/60 mt-1">0% Interest Tooling Loans</div>
            </div>
          </div>
        </div>

        {/* STAGE 3: COMMUNITY GROWTH POOL OVERSIGHT BANNER */}
        <div className="bg-[#0A0A0A] text-[#F5F5F2] border border-black p-6 sm:p-8 flex flex-col lg:flex-row lg:items-center justify-between gap-6 shadow-xs">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-2.5 py-0.5 bg-[#CCFF00]/10 border border-[#CCFF00]/30 text-[#CCFF00] text-[10px] font-bold uppercase tracking-widest">
              <span className="w-1.5 h-1.5 rounded-full bg-[#CCFF00] animate-pulse" />
              <span>COOPERATIVE TREASURY LEDGER</span>
            </div>
            <h3 className="text-2xl font-black font-display uppercase tracking-tight text-white">
              COMMUNITY GROWTH POOL: ₹{growthPoolBalance.toLocaleString('en-IN')}
            </h3>
            <p className="text-xs text-white/70 font-sans max-w-2xl">
              Transparent accumulation from ₹10 allocations per protected booking across Ward 102. Funds shared diagnostic tooling, safety equipment, and BEE artisan skill certifications.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
            <button
              onClick={() => navigate('/community')}
              className="w-full sm:w-auto justify-center px-5 py-3 bg-[#CCFF00] hover:bg-[#D4FF00] text-black text-xs font-black uppercase tracking-wider transition flex items-center gap-2 text-center"
            >
              <span>Inspect Treasury Ledger</span>
              <ChevronRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => navigate('/network')}
              className="w-full sm:w-auto justify-center px-5 py-3 bg-white/10 hover:bg-white/20 text-white text-xs font-bold uppercase tracking-wider transition text-center"
            >
              Trusted Network
            </button>
          </div>
        </div>

        {/* Certified Guild Roster Table */}
        <div className="bg-white border border-black/15 p-6 sm:p-8 space-y-6 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-black/10">
            <div>
              <h2 className="text-2xl font-black font-display uppercase tracking-tight text-black">
                CERTIFIED LOCAL PROFESSIONALS ROSTER
              </h2>
              <p className="text-xs text-black/60 font-sans">
                Real-time workload rotation, certification audits, and algorithmic fairness index.
              </p>
            </div>
            <span className="text-xs bg-black text-white px-3 py-1 uppercase font-bold tracking-wider self-start sm:self-auto">
              Anti-Monopoly Rules Active
            </span>
          </div>

          <div className="overflow-x-auto -mx-6 sm:mx-0 px-6 sm:px-0">
            <table className="w-full min-w-[640px] text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-black/15 text-black/50 uppercase text-[10px]">
                  <th className="pb-3 font-bold">PROFESSIONAL & TRADE</th>
                  <th className="pb-3 font-bold">CATEGORY</th>
                  <th className="pb-3 font-bold">LOCALITY</th>
                  <th className="pb-3 font-bold">RATING & REPEAT</th>
                  <th className="pb-3 font-bold">FAIRMATCH</th>
                  <th className="pb-3 font-bold">RECENT LOAD</th>
                  <th className="pb-3 font-bold text-right">ACTION</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-black/10">
                {providers.map((p) => (
                  <tr key={p.id} className="hover:bg-black/5 transition">
                    <td className="py-4 pr-3">
                      <div className="font-bold text-black uppercase font-sans text-sm">{p.businessName}</div>
                      <div className="text-black/50 text-[11px] font-mono-code">{p.professionalName}</div>
                    </td>
                    <td className="py-4 pr-3">
                      <span className="text-black/80 font-bold uppercase">{p.category}</span>
                    </td>
                    <td className="py-4 pr-3">
                      <span className="text-black font-medium">{p.location}</span>
                      <span className="text-[10px] text-black/40 block">({p.distanceKm} km away)</span>
                    </td>
                    <td className="py-4 pr-3">
                      <span className="font-bold text-black">{p.rating} ★</span>
                      <span className="text-black/60 text-[10px] block font-mono-code">
                        {p.repeatCustomerRate}% repeat
                      </span>
                    </td>
                    <td className="py-4 pr-3">
                      <span className="font-bold bg-black text-white px-2 py-0.5 text-[11px]">
                        {p.fairMatch.overall}%
                      </span>
                    </td>
                    <td className="py-4 pr-3">
                      <span className="text-black/70 text-[11px] font-sans">{p.recentWorkload}</span>
                    </td>
                    <td className="py-4 text-right">
                      <button
                        onClick={() => {
                          setSelectedProvider(p);
                          navigate(`/provider/${p.id}`);
                        }}
                        className="px-3 py-1 bg-black/5 hover:bg-black text-black hover:text-white text-[10px] uppercase font-bold tracking-wider transition"
                      >
                        Inspect Profile
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
