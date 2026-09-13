import React, { useState } from 'react';
import { motion } from 'motion/react';
import { useApp } from '../context/AppContext';
import {
  TrendingUp,
  Award,
  ShieldCheck,
  Briefcase,
  Users,
  Coins,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  ExternalLink,
  Zap,
  Star,
  Check,
  BookOpen,
  Wrench,
  GraduationCap,
} from 'lucide-react';

interface ProgressionStage {
  stageNumber: number;
  id: string;
  title: string;
  subtitle: string;
  description: string;
  badge: string;
  requirements: string[];
  unlockedBenefits: string[];
  isCurrent?: boolean;
  isUnlocked?: boolean;
}

export const GigToGrowthView: React.FC = () => {
  const {
    worker,
    growthCredits,
    redeemGrowthCredits,
    redeemedGrowthItems,
    role,
    setRole,
    setActiveTab,
  } = useApp();

  const [activeStageId, setActiveStageId] = useState<string>('stage-3');

  const stages: ProgressionStage[] = [
    {
      stageNumber: 1,
      id: 'stage-1',
      title: 'GIG WORKER',
      subtitle: 'On-Demand Entry Level',
      description: 'Standard algorithmic dispatch. One-off transactional jobs without business equity or local community recognition.',
      badge: 'Level 1: Entry',
      requirements: ['Basic Identity Verification', 'Government ID Check'],
      unlockedBenefits: ['Single job booking notifications', 'Standard commission tier'],
      isUnlocked: true,
    },
    {
      stageNumber: 2,
      id: 'stage-2',
      title: 'VERIFIED PROFESSIONAL',
      subtitle: 'Trade & Safety Certified',
      description: 'In-person practical skill assessment passed with local trade federation. Background verified and insured.',
      badge: 'Level 2: Certified',
      requirements: ['Practical Trade Competency Exam', 'Zero Adverse Police Record', '50+ Verified 4.5+ Rated Jobs'],
      unlockedBenefits: ['FairMatch algorithmic priority', 'Direct client chat access', 'Tool library borrowing rights'],
      isUnlocked: true,
    },
    {
      stageNumber: 3,
      id: 'stage-3',
      title: 'TRUSTED LOCAL PROVIDER',
      subtitle: 'Arjun Raj Current Stage',
      description: 'A recognized neighborhood staple with established customer trust, high repeat retention, and democratic cooperative voting shares.',
      badge: 'Level 3: CURRENT MILESTONE',
      requirements: ['100+ Completed Services', '90%+ Repeat Customer Loyalty', 'Cooperative General Assembly Member'],
      unlockedBenefits: ['Custom Digital Business Homepage', 'Repeat Client Direct Inbound Line', 'Community Demand Cluster Priority Dispatch'],
      isUnlocked: true,
      isCurrent: true,
    },
    {
      stageNumber: 4,
      id: 'stage-4',
      title: 'MICRO-BUSINESS',
      subtitle: 'Autonomous Enterprise',
      description: 'Scale beyond solo operations. Employ apprentices, operate branded service vans, and access civic micro-credit for capital gear.',
      badge: 'Level 4: Next Target',
      requirements: ['200+ Completed Jobs', 'Apprenticeship Mentorship Completed', 'Zero Escalated Customer Disputes in 12 Months'],
      unlockedBenefits: ['Multi-artisan scheduling sub-accounts', 'Civic Equipment Financing Assistance', 'Community Commercial Contracts'],
      isUnlocked: false,
    },
    {
      stageNumber: 5,
      id: 'stage-5',
      title: 'COOPERATIVE TEAM LEAD',
      subtitle: 'Federated Guild Directorate',
      description: 'Lead multi-trade cooperative renovation alliances. Mentor incoming artisans and steward community service standards.',
      badge: 'Level 5: Guild Master',
      requirements: ['500+ Lifetime Services', 'Elected by Ward Cooperative Members', 'Master Craftsman Certification'],
      unlockedBenefits: ['Turnkey Multi-Trade Renovation Package Lead', 'Cooperative Dividend Allocation', 'Board Governance Voting'],
      isUnlocked: false,
    },
  ];

  const creditRedemptionCatalog = [
    {
      id: 'item-hvac-tool',
      title: 'Advanced Inverter HVAC Diagnostic Kit',
      category: 'Equipment Assistance',
      cost: 400,
      icon: <Wrench className="w-5 h-5 text-[#CCFF00]" />,
      description: 'High-precision digital manifold and micron gauge subsidized through cooperative bulk purchasing.',
    },
    {
      id: 'item-masterclass',
      title: 'Green Refrigerant & Heat Pump Masterclass',
      category: 'Skill Certification',
      cost: 350,
      icon: <GraduationCap className="w-5 h-5 text-cyan-400" />,
      description: 'Govt-recognized energy efficiency certification for modern VRF and inverter heat systems.',
    },
    {
      id: 'item-safety-gear',
      title: 'Arc-Flash & High-Rise Safety Harness Set',
      category: 'Safety Equipment',
      cost: 250,
      icon: <ShieldCheck className="w-5 h-5 text-emerald-400" />,
      description: 'Heavy-duty certified fall protection and insulated electrostatic boots.',
    },
    {
      id: 'item-apprentice',
      title: 'Apprenticeship Stipend Co-Funding (1 Month)',
      category: 'Business Growth',
      cost: 600,
      icon: <Briefcase className="w-5 h-5 text-amber-400" />,
      description: 'Stipend grant to onboard a polytechnic trade trainee to expand your daily service capacity.',
    },
  ];

  return (
    <div className="w-full bg-[#F5F5F2] text-[#0A0A0A] font-mono-code min-h-screen py-8 px-4 sm:px-6 lg:px-8 space-y-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Editorial Section Header */}
        <div className="bg-[#0A0A0A] text-[#F5F5F2] border border-black p-6 sm:p-10 space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-white/10">
            <div className="space-y-1">
              <div className="text-xs uppercase tracking-widest text-[#CCFF00] font-bold flex items-center gap-2">
                <TrendingUp className="w-4 h-4" />
                <span>CAREER PROGRESSION FRAMEWORK</span>
              </div>
              <h1 className="text-3xl sm:text-5xl font-black font-display text-white uppercase tracking-tight">
                GIG-TO-GROWTH JOURNEY
              </h1>
              <p className="text-xs text-white/70 font-sans max-w-2xl leading-relaxed">
                CoServe rejects the dead-end gig economy model where a worker with 5,000 rides has the exact same status as someone on Day 1.
                Here, workers build equity, verifiable reputation, cooperative voting shares, and evolve into autonomous local micro-businesses.
              </p>
            </div>

            {/* Growth Credits Pill */}
            <div className="p-4 bg-white/5 border border-white/15 text-right shrink-0">
              <div className="text-[10px] text-white/40 uppercase">ARJUN'S GROWTH CREDITS</div>
              <div className="text-3xl font-black font-display text-[#CCFF00] flex items-center justify-end gap-2">
                <Coins className="w-6 h-6" />
                <span>{growthCredits}</span>
              </div>
              <div className="text-[10px] text-white/60">Professional Development Equity</div>
            </div>
          </div>

          {/* ARJUN WORKER GROWTH PROFILE BAR */}
          <div className="bg-white/5 border border-white/10 p-6 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="text-[10px] text-[#CCFF00] uppercase font-bold tracking-widest">
                  ENTERPRISE IDENTITY
                </div>
                <h2 className="text-2xl font-black font-display uppercase text-white">
                  ARJUN AC SERVICES (ARJUN RAJ)
                </h2>
                <div className="text-xs text-white/60 font-sans">
                  Status: <strong className="text-[#CCFF00]">TRUSTED LOCAL PROVIDER</strong> (Stage 3 of 5) • Anna Nagar Ward 102 Service Cooperative
                </div>
              </div>

              <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-2 sm:gap-4 text-xs font-mono-code">
                <div className="px-3 py-1.5 bg-black border border-white/20 text-center">
                  <div className="text-[9px] text-white/40 uppercase">SERVICES</div>
                  <div className="text-lg font-black text-white">127</div>
                </div>
                <div className="px-3 py-1.5 bg-black border border-white/20 text-center">
                  <div className="text-[9px] text-white/40 uppercase">RATING</div>
                  <div className="text-lg font-black text-[#CCFF00]">4.8 ★</div>
                </div>
                <div className="px-3 py-1.5 bg-black border border-white/20 text-center">
                  <div className="text-[9px] text-white/40 uppercase">REPEAT RATE</div>
                  <div className="text-lg font-black text-white">92%</div>
                </div>
                <div className="px-3 py-1.5 bg-black border border-white/20 text-center">
                  <div className="text-[9px] text-white/40 uppercase">VERIFIED</div>
                  <div className="text-lg font-black text-emerald-400">100%</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 5-STAGE PROGRESSION LADDER */}
        <div className="bg-white border border-black/15 p-6 sm:p-10 space-y-8 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-black/10">
            <div>
              <div className="text-[10px] text-black/50 uppercase font-bold tracking-widest">
                CIVIC LADDER PROGRESSION
              </div>
              <h3 className="text-xl sm:text-2xl font-black font-display uppercase tracking-tight text-black">
                GIG WORKER → VERIFIED PRO → TRUSTED PROVIDER → MICRO-BUSINESS → COOPERATIVE TEAM
              </h3>
            </div>
            <span className="text-xs bg-black text-white px-3 py-1 uppercase font-bold tracking-wider">
              Stage 3 / 5 Active
            </span>
          </div>

          {/* Stepper Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {stages.map((stg) => {
              const isSelected = activeStageId === stg.id;
              return (
                <div
                  key={stg.id}
                  onClick={() => setActiveStageId(stg.id)}
                  className={`p-5 border transition cursor-pointer flex flex-col justify-between space-y-4 ${
                    stg.isCurrent
                      ? 'bg-black text-white border-black ring-2 ring-[#CCFF00]'
                      : stg.isUnlocked
                      ? 'bg-white text-black border-black/20 hover:border-black'
                      : 'bg-black/5 text-black/40 border-black/10'
                  }`}
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-[10px] font-bold uppercase">
                      <span className={stg.isCurrent ? 'text-[#CCFF00]' : ''}>STAGE 0{stg.stageNumber}</span>
                      {stg.isCurrent && (
                        <span className="px-1.5 py-0.5 bg-[#CCFF00] text-black font-black text-[9px]">
                          CURRENT
                        </span>
                      )}
                    </div>
                    <div className={`text-base font-black font-display uppercase tracking-tight ${stg.isCurrent ? 'text-white' : 'text-black'}`}>
                      {stg.title}
                    </div>
                    <div className="text-[10px] opacity-70">{stg.subtitle}</div>
                  </div>

                  <div className="space-y-2 pt-2 border-t border-current/15 text-[11px] font-sans">
                    <p className="leading-snug line-clamp-3">{stg.description}</p>
                    <div className="text-[10px] font-mono-code font-bold pt-1">
                      {stg.isUnlocked ? '✓ Requirements Met' : '🔒 Locked Requirements'}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Detailed Selected Stage Breakdown */}
          {(() => {
            const currentSelected = stages.find((s) => s.id === activeStageId) || stages[2];
            return (
              <div className="p-6 bg-[#0A0A0A] text-[#F5F5F2] border border-black space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
                  <div className="space-y-1">
                    <div className="text-[10px] text-[#CCFF00] font-bold uppercase">
                      SELECTED STAGE SPECIFICATION
                    </div>
                    <h4 className="text-2xl font-black font-display uppercase text-white">
                      {currentSelected.stageNumber}. {currentSelected.title} — {currentSelected.subtitle}
                    </h4>
                  </div>
                  <div className="px-3 py-1.5 bg-white/10 text-white text-xs font-bold uppercase border border-white/20">
                    {currentSelected.badge}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
                  <div className="space-y-3 p-4 bg-white/5 border border-white/10">
                    <div className="text-[10px] text-white/50 uppercase font-bold">
                      VERIFICATION & CRITERIA PREREQUISITES
                    </div>
                    <ul className="space-y-2">
                      {currentSelected.requirements.map((req, i) => (
                        <li key={i} className="flex items-start gap-2 text-white/80 font-sans">
                          <Check className="w-3.5 h-3.5 text-[#CCFF00] shrink-0 mt-0.5" />
                          <span>{req}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="space-y-3 p-4 bg-white/5 border border-white/10">
                    <div className="text-[10px] text-[#CCFF00] uppercase font-bold">
                      UNLOCKED ECONOMIC & BUSINESS PRIVILEGES
                    </div>
                    <ul className="space-y-2">
                      {currentSelected.unlockedBenefits.map((ben, i) => (
                        <li key={i} className="flex items-start gap-2 text-white/80 font-sans">
                          <Sparkles className="w-3.5 h-3.5 text-[#CCFF00] shrink-0 mt-0.5" />
                          <span>{ben}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            );
          })()}
        </div>

        {/* WORKER GROWTH CREDITS CATALOG (NON-MONETARY EQUITY) */}
        <div className="bg-white border border-black/15 p-6 sm:p-10 space-y-8 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-black/10">
            <div>
              <div className="text-[10px] text-black/50 uppercase font-bold tracking-widest">
                PARTICIPATION REWARD SYSTEM
              </div>
              <h3 className="text-xl sm:text-2xl font-black font-display uppercase tracking-tight text-black">
                GROWTH CREDITS REDEMPTION STORE
              </h3>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-xs text-black/60">Current Balance:</span>
              <span className="px-3 py-1 bg-[#CCFF00] text-black text-sm font-black font-display">
                {growthCredits} CREDITS
              </span>
            </div>
          </div>

          {/* Explicit Legal / Clarification Notice */}
          <div className="p-4 bg-black/5 border border-black/15 text-xs font-sans space-y-1">
            <div className="font-bold text-black uppercase font-mono-code text-[11px] flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-black" />
              <span>NON-MONETARY PROFESSIONAL DEVELOPMENT INVENTORY</span>
            </div>
            <p className="text-black/70 leading-relaxed">
              Growth Credits are NOT money. They represent participation and professional-development eligibility within the CoServe ecosystem.
              Credits are earned through punctual service fulfillment, community assembly attendance, apprentice coaching, and high repeat retention.
            </p>
          </div>

          {/* Catalog Items Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {creditRedemptionCatalog.map((item) => {
              const canAfford = growthCredits >= item.cost;
              const isAlreadyRedeemed = redeemedGrowthItems.includes(item.title);

              return (
                <div
                  key={item.id}
                  className="p-5 bg-black/5 border border-black/15 flex flex-col justify-between space-y-4 hover:border-black transition"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between pb-2 border-b border-black/10">
                      {item.icon}
                      <span className="text-[10px] text-black/50 font-bold uppercase">{item.category}</span>
                    </div>

                    <h4 className="text-base font-black font-display text-black uppercase tracking-tight">
                      {item.title}
                    </h4>

                    <p className="text-xs text-black/70 font-sans leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  <div className="space-y-3 pt-3 border-t border-black/10">
                    <div className="flex items-baseline justify-between">
                      <span className="text-[10px] text-black/50 uppercase">REQUIRED CREDITS</span>
                      <span className="text-xl font-black font-display text-black">{item.cost}</span>
                    </div>

                    <button
                      type="button"
                      disabled={!canAfford && !isAlreadyRedeemed}
                      onClick={() => redeemGrowthCredits(item.cost, item.title)}
                      className={`w-full py-2.5 text-xs font-bold uppercase tracking-wider transition flex items-center justify-center gap-2 ${
                        isAlreadyRedeemed
                          ? 'bg-emerald-700 text-white cursor-default'
                          : canAfford
                          ? 'bg-black hover:bg-neutral-800 text-white'
                          : 'bg-black/10 text-black/40 cursor-not-allowed'
                      }`}
                    >
                      {isAlreadyRedeemed ? (
                        <>
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#CCFF00]" />
                          <span>GRANT CLAIMED</span>
                        </>
                      ) : canAfford ? (
                        <>
                          <Coins className="w-3.5 h-3.5 text-[#CCFF00]" />
                          <span>APPLY {item.cost} CREDITS</span>
                        </>
                      ) : (
                        <span>NEED {item.cost - growthCredits} MORE</span>
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* DIGITAL MICRO-BUSINESS SHOWCASE (LOCAL HUBS) */}
        <div className="bg-[#0A0A0A] text-[#F5F5F2] border border-black p-6 sm:p-10 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
            <div>
              <div className="text-[10px] text-[#CCFF00] uppercase font-bold tracking-widest">
                DIGITAL MICRO-BUSINESS FOUNDATION
              </div>
              <h3 className="text-2xl font-black font-display uppercase tracking-tight text-white">
                VERIFIED LOCAL ENTERPRISES ON COSERVE
              </h3>
            </div>
            <div className="text-xs text-white/60">Independent Businesses • Community Verified</div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
            <div className="p-5 bg-white/5 border border-white/10 space-y-3">
              <div className="text-xs text-[#CCFF00] font-bold">HVAC INFRASTRUCTURE</div>
              <div className="text-xl font-black font-display uppercase text-white">ARJUN AC SERVICES</div>
              <div className="text-xs text-white/70 font-sans">
                Led by Arjun Raj. Specializes in multi-brand inverter split units, VRV diagnostics, and chemical jet sanitization.
              </div>
              <div className="pt-2 flex items-center justify-between text-xs text-white/50 border-t border-white/10">
                <span>92% Repeat Rate</span>
                <span className="text-[#CCFF00]">127 Services</span>
              </div>
            </div>

            <div className="p-5 bg-white/5 border border-white/10 space-y-3">
              <div className="text-xs text-[#CCFF00] font-bold">ELECTRICAL WORKS</div>
              <div className="text-xl font-black font-display uppercase text-white">RAVI ELECTRICAL WORKS</div>
              <div className="text-xs text-white/70 font-sans">
                Led by Ravi Kumar. 3-phase load calculation, earthing renewal, and domestic distribution box overhaul.
              </div>
              <div className="pt-2 flex items-center justify-between text-xs text-white/50 border-t border-white/10">
                <span>96% Repeat Rate</span>
                <span className="text-[#CCFF00]">92 Services</span>
              </div>
            </div>

            <div className="p-5 bg-white/5 border border-white/10 space-y-3">
              <div className="text-xs text-[#CCFF00] font-bold">PLUMBING & SANITATION</div>
              <div className="text-xl font-black font-display uppercase text-white">KUMAR PLUMBING WORKS</div>
              <div className="text-xs text-white/70 font-sans">
                Led by Kumar Raj. High-pressure pump overhaul, concealed pipeline leak acoustics, and valve manifolds.
              </div>
              <div className="pt-2 flex items-center justify-between text-xs text-white/50 border-t border-white/10">
                <span>89% Repeat Rate</span>
                <span className="text-[#CCFF00]">78 Services</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
