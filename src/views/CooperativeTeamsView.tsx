import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useApp } from '../context/AppContext';
import { CooperativeTeam } from '../types';
import {
  Users2,
  ShieldCheck,
  Award,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Clock,
  Hammer,
  Zap,
  Droplets,
  Paintbrush,
  Check,
  Phone,
  FileCheck,
  Layers,
} from 'lucide-react';

export const CooperativeTeamsView: React.FC = () => {
  const {
    cooperativeTeams,
    requestCoopTeam,
    teamRequests,
    customer,
    role,
    setRole,
    setActiveTab,
  } = useApp();

  const [selectedTeam, setSelectedTeam] = useState<CooperativeTeam>(cooperativeTeams[0]);
  const [requestModalOpen, setRequestModalOpen] = useState<boolean>(false);
  const [selectedPackage, setSelectedPackage] = useState<any>(null);
  const [requestSuccess, setRequestSuccess] = useState<boolean>(false);

  const handleRequestSubmit = () => {
    if (!selectedPackage) return;
    requestCoopTeam({
      teamId: selectedTeam.id,
      packageName: selectedPackage.title,
      price: selectedPackage.startingPrice,
    });
    setRequestSuccess(true);
    setTimeout(() => {
      setRequestSuccess(false);
      setRequestModalOpen(false);
    }, 2000);
  };

  const getMemberTradeIcon = (trade: string) => {
    const t = trade.toLowerCase();
    if (t.includes('electric')) return <Zap className="w-4 h-4 text-[#CCFF00]" />;
    if (t.includes('plumb')) return <Droplets className="w-4 h-4 text-cyan-400" />;
    if (t.includes('carpenter') || t.includes('wood')) return <Hammer className="w-4 h-4 text-amber-400" />;
    if (t.includes('paint')) return <Paintbrush className="w-4 h-4 text-emerald-400" />;
    return <Sparkles className="w-4 h-4 text-[#CCFF00]" />;
  };

  return (
    <div className="w-full bg-[#F5F5F2] text-[#0A0A0A] font-mono-code min-h-screen py-8 px-4 sm:px-6 lg:px-8 space-y-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Editorial Section Header */}
        <div className="bg-[#0A0A0A] text-[#F5F5F2] border border-black p-6 sm:p-10 space-y-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-white/10">
            <div className="space-y-1">
              <div className="text-xs uppercase tracking-widest text-[#CCFF00] font-bold flex items-center gap-2">
                <Users2 className="w-4 h-4" />
                <span>FEDERATED SKILL ALLIANCES</span>
              </div>
              <h1 className="text-3xl sm:text-5xl font-black font-display text-white uppercase tracking-tight">
                COOPERATIVE MULTI-TRADE TEAMS
              </h1>
              <p className="text-xs text-white/70 font-sans max-w-2xl leading-relaxed">
                Independent licensed trade masters collaborate to form verified multi-disciplinary guilds.
                Households can contract an integrated renovation team with unified escrow, shared warranty,
                and zero agency markup.
              </p>
            </div>

            <div className="p-4 bg-white/5 border border-white/15 text-right shrink-0">
              <div className="text-[10px] text-white/40 uppercase">ACTIVE GUILD TEAMS</div>
              <div className="text-2xl font-black font-display text-[#CCFF00]">
                {cooperativeTeams.length} Formed
              </div>
              <div className="text-[10px] text-white/60">Democratic Work Sharing</div>
            </div>
          </div>

          {/* Teams Selector Pill Bar */}
          <div className="flex flex-wrap items-center gap-2 pt-1">
            <span className="text-xs text-white/50 uppercase mr-2">SELECT GUILD TEAM:</span>
            {cooperativeTeams.map((team) => (
              <button
                key={team.id}
                type="button"
                onClick={() => setSelectedTeam(team)}
                className={`px-4 py-2 text-xs font-bold uppercase tracking-wider transition border ${
                  selectedTeam.id === team.id
                    ? 'bg-[#CCFF00] text-[#0A0A0A] border-[#CCFF00]'
                    : 'bg-white/5 text-white/80 border-white/15 hover:bg-white/10'
                }`}
              >
                <span>{team.name}</span>
                <span className="ml-2 text-[10px] opacity-70 font-normal">({team.members.length} Pros)</span>
              </button>
            ))}
          </div>
        </div>

        {/* TEAM MASTER PROFILE: OVERLAPPING COOPERATIVE COMPOSITION */}
        <div className="bg-white border border-black/15 shadow-xs overflow-hidden">
          {/* Guild Composite Header Banner */}
          <div className="p-6 sm:p-10 bg-[#0A0A0A] text-[#F5F5F2] border-b border-black space-y-6">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              <div className="space-y-2">
                <div className="text-[10px] font-mono-code text-[#CCFF00] uppercase tracking-widest flex items-center gap-2">
                  <span>CIVIC GUILD FEDERATION</span>
                  <span>•</span>
                  <span>ZONE: {selectedTeam.locality.toUpperCase()}</span>
                </div>
                <h2 className="text-3xl sm:text-5xl font-black font-display uppercase tracking-tight text-white">
                  {selectedTeam.name}
                </h2>
                <p className="text-xs text-white/70 font-sans max-w-2xl leading-relaxed">
                  {selectedTeam.tagline}
                </p>
                <div className="text-[10px] text-white/40 font-mono-code pt-1">
                  * Note: "{selectedTeam.locality}" is demo scenario data, reflecting local community operations.
                </div>
              </div>

              {/* Aggregated Team Stats */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 shrink-0">
                <div className="p-3 bg-white/5 border border-white/10 text-center">
                  <div className="text-[9px] text-white/40 uppercase">TEAM RATING</div>
                  <div className="text-2xl font-black font-display text-[#CCFF00]">
                    {selectedTeam.rating} ★
                  </div>
                  <div className="text-[9px] text-white/60 font-mono-code">100% Verified</div>
                </div>

                <div className="p-3 bg-white/5 border border-white/10 text-center">
                  <div className="text-[9px] text-white/40 uppercase">COMBINED JOBS</div>
                  <div className="text-2xl font-black font-display text-white">
                    {selectedTeam.completedJobs}
                  </div>
                  <div className="text-[9px] text-white/60 font-mono-code">Zero Disputes</div>
                </div>

                <div className="p-3 bg-white/5 border border-white/10 text-center col-span-2 sm:col-span-1">
                  <div className="text-[9px] text-white/40 uppercase">GUILD PROS</div>
                  <div className="text-2xl font-black font-display text-white">
                    {selectedTeam.members.length} Masters
                  </div>
                  <div className="text-[9px] text-white/60 font-mono-code">Cross-Trade</div>
                </div>
              </div>
            </div>

            {/* UNIFIED ARTISAN NETWORK: OVERLAPPING FOUR-PRO COMPOSITION */}
            <div className="pt-6 border-t border-white/10 space-y-3">
              <div className="text-[11px] text-[#CCFF00] uppercase font-bold tracking-widest flex items-center justify-between">
                <span>INTERCONNECTED ARTISAN ROSTER: 4 PROFESSIONALS FORMING ONE UNIT</span>
                <span className="text-white/40 text-[10px]">UNIFIED ESCROW WARRANTY</span>
              </div>

              {/* Non-Generic Overlapping Composition */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
                {selectedTeam.members.map((m, idx) => (
                  <div
                    key={m.id}
                    className="p-5 bg-white/5 hover:bg-white/10 border border-white/15 transition relative group"
                  >
                    {/* Interconnection Vector Indicator */}
                    <div className="flex items-center justify-between pb-3 border-b border-white/10 text-xs">
                      <div className="flex items-center gap-2">
                        {getMemberTradeIcon(m.trade)}
                        <span className="font-bold text-[#CCFF00] uppercase text-[11px] font-mono-code">
                          {m.trade}
                        </span>
                      </div>
                      <span className="text-[10px] text-white/40 font-mono-code">#PRO-0{idx + 1}</span>
                    </div>

                    <div className="pt-3 space-y-1">
                      <div className="text-lg font-black font-display text-white uppercase tracking-tight">
                        {m.name}
                      </div>
                      <div className="text-xs text-white/60 font-mono-code">
                        {m.businessName}
                      </div>
                    </div>

                    <div className="pt-4 mt-3 border-t border-white/10 flex items-center justify-between text-xs font-mono-code">
                      <span className="text-white font-bold">{m.rating} ★</span>
                      <span className="text-white/50">{m.completedJobs} Jobs</span>
                    </div>

                    {/* Verification Badges */}
                    <div className="pt-3 flex items-center gap-1.5 text-[9px] text-white/70 font-mono-code">
                      <ShieldCheck className="w-3 h-3 text-[#CCFF00]" />
                      <span>Id & Skill Certified</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* TEAM PACKAGES & DIRECT HIRE SECTION */}
          <div className="p-6 sm:p-10 space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-black/10">
              <div>
                <div className="text-[10px] text-black/50 font-bold uppercase tracking-widest">
                  COMPOSITE ALL-INCLUSIVE PACKAGES
                </div>
                <h3 className="text-2xl font-black font-display uppercase tracking-tight text-black mt-0.5">
                  AVAILABLE COOPERATIVE PACKAGES
                </h3>
              </div>
              <span className="text-xs bg-black text-white px-3 py-1 uppercase font-bold tracking-wider">
                Direct Cooperative Booking
              </span>
            </div>

            {/* Packages Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {selectedTeam.combinedPackages.map((pkg) => (
                <div
                  key={pkg.id}
                  className="bg-black/5 border border-black/15 p-6 flex flex-col justify-between space-y-6 hover:border-black transition"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-[10px] font-bold uppercase text-black/50">
                      <span>EST. {pkg.estimatedDays}</span>
                      <span className="text-emerald-700">Multi-Trade</span>
                    </div>
                    <h4 className="text-xl font-black font-display text-black uppercase tracking-tight">
                      {pkg.title}
                    </h4>
                    <p className="text-xs text-black/70 font-sans leading-relaxed">
                      {pkg.description}
                    </p>

                    <div className="pt-3 border-t border-black/10">
                      <div className="text-[10px] text-black/40 font-bold uppercase mb-1.5">
                        INCLUDED TRADES:
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {pkg.includedTrades.map((trade: string, i: number) => (
                          <span
                            key={i}
                            className="px-2 py-0.5 bg-white border border-black/15 text-[10px] font-bold text-black uppercase"
                          >
                            {trade}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-black/10 space-y-3">
                    <div className="flex items-baseline justify-between">
                      <span className="text-[10px] text-black/50 uppercase">Starting From</span>
                      <span className="text-2xl font-black font-display text-black">₹{pkg.startingPrice}</span>
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        setSelectedPackage(pkg);
                        setRequestModalOpen(true);
                      }}
                      className="w-full py-3 bg-black hover:bg-neutral-800 text-white text-xs font-bold uppercase tracking-wider transition flex items-center justify-center gap-2"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-[#CCFF00]" />
                      <span>REQUEST TEAM</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CUSTOMER ACTIVE TEAM REQUESTS LIST */}
        {teamRequests.length > 0 && (
          <div className="bg-white border border-black/15 p-6 sm:p-8 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-black/10">
              <h4 className="text-base font-black font-display uppercase tracking-tight text-black">
                YOUR PENDING COOPERATIVE TEAM ORDERS ({teamRequests.length})
              </h4>
              <span className="text-[10px] bg-emerald-100 text-emerald-900 border border-emerald-300 px-2 py-0.5 font-bold uppercase">
                Escrow Protected
              </span>
            </div>

            <div className="space-y-3">
              {teamRequests.map((tr) => (
                <div
                  key={tr.id}
                  className="p-4 bg-black/5 border border-black/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs"
                >
                  <div className="space-y-1">
                    <div className="text-[10px] text-black/40 font-mono-code uppercase font-bold">
                      ORDER #{tr.id} • {tr.createdAt}
                    </div>
                    <div className="text-base font-black font-display uppercase text-black">
                      {tr.packageName}
                    </div>
                    <div className="text-xs text-black/60 font-sans">
                      Assigned Guild: <span className="font-bold text-black">{tr.teamName}</span> • Doorstep: {tr.location}
                    </div>
                  </div>

                  <div className="flex items-center gap-4 shrink-0">
                    <div className="text-right">
                      <div className="text-[10px] text-black/40 uppercase">ESCROW QUOTE</div>
                      <div className="text-xl font-black font-display text-black">₹{tr.price}</div>
                    </div>
                    <div className="px-3 py-1 bg-black text-white text-xs font-bold uppercase tracking-wider">
                      {tr.status}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* REQUEST TEAM MODAL */}
        <AnimatePresence>
          {requestModalOpen && selectedPackage && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs font-mono-code">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-[#0A0A0A] text-[#F5F5F2] border border-[#CCFF00] w-full max-w-lg max-h-[90vh] overflow-y-auto p-4 sm:p-8 space-y-6 shadow-2xl"
              >
                <div className="flex items-center justify-between border-b border-white/15 pb-4">
                  <div>
                    <div className="text-[10px] text-[#CCFF00] font-bold uppercase">
                      DIRECT GUILD CONTRACT
                    </div>
                    <h3 className="text-2xl font-black font-display uppercase text-white">
                      HIRE COOPERATIVE TEAM
                    </h3>
                  </div>
                  <button
                    type="button"
                    onClick={() => setRequestModalOpen(false)}
                    className="text-white/40 hover:text-white text-xs uppercase"
                  >
                    Close
                  </button>
                </div>

                <div className="p-4 bg-white/5 border border-white/10 space-y-2 text-xs">
                  <div className="text-[10px] text-white/40 uppercase">SELECTED PACKAGE:</div>
                  <div className="text-lg font-black font-display text-white uppercase">
                    {selectedPackage.title}
                  </div>
                  <div className="text-white/70 font-sans text-xs">
                    Guild: {selectedTeam.name} ({selectedTeam.members.length} master artisans)
                  </div>
                  <div className="flex justify-between pt-2 border-t border-white/10">
                    <span className="text-white/50">Turnkey Escrow Tariff:</span>
                    <span className="text-xl font-black font-display text-[#CCFF00]">
                      ₹{selectedPackage.startingPrice}
                    </span>
                  </div>
                </div>

                <div className="space-y-2 text-xs">
                  <div className="text-white/50 text-[10px] uppercase">CUSTOMER LOCATION & PREMISES:</div>
                  <div className="p-3 bg-white/5 border border-white/10 font-bold text-white">
                    {customer.name} • {customer.address}
                  </div>
                </div>

                {requestSuccess ? (
                  <div className="p-4 bg-[#CCFF00] text-black text-center font-bold text-xs uppercase flex items-center justify-center gap-2">
                    <CheckCircle2 className="w-5 h-5" />
                    <span>TEAM REQUEST SENT! COOPERATIVE NOTIFIED.</span>
                  </div>
                ) : (
                  <div className="flex flex-col sm:flex-row gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => setRequestModalOpen(false)}
                      className="w-full sm:w-1/2 py-3 bg-white/10 text-white font-bold text-xs uppercase tracking-wider hover:bg-white/20 transition text-center"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick={handleRequestSubmit}
                      className="w-full sm:w-1/2 py-3 bg-[#CCFF00] text-[#0A0A0A] font-bold text-xs uppercase tracking-wider hover:bg-[#D4FF00] transition flex items-center justify-center gap-2 text-center"
                    >
                      <Sparkles className="w-4 h-4" />
                      <span>CONFIRM & DISPATCH</span>
                    </button>
                  </div>
                )}
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
