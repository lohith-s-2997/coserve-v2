import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import {
  Share2,
  RefreshCw,
  TrendingUp,
  Home,
  Users,
  Briefcase,
  Layers,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Zap,
} from 'lucide-react';

export const CommunityNetworkLoopView: React.FC = () => {
  const [activeLoopIndex, setActiveLoopIndex] = useState<number>(0);

  const loopSteps = [
    {
      title: '1. MORE HOUSEHOLDS',
      subtitle: 'Civic Adoption',
      desc: 'Local families join CoServe to request domestic repairs directly from verified neighborhood artisans without middlemen.',
      metric: '+48% Resident Density',
    },
    {
      title: '2. DENSER LOCAL DEMAND',
      subtitle: 'Zone Aggregation',
      desc: 'Requests cluster tightly within the same 1.5 km residential corridor and preferred time windows.',
      metric: '3-4 Homes / 500m',
    },
    {
      title: '3. LESS DUPLICATE TRAVEL',
      subtitle: 'Logistics Optimization',
      desc: 'Technicians service multiple adjacent apartments in one morning, eliminating 15+ km zig-zag city commutes.',
      metric: '-68% Fuel & Time Waste',
    },
    {
      title: '4. BETTER SERVICE ECONOMICS',
      subtitle: 'Shared Value Dividend',
      desc: 'Households enjoy fair community cluster rates (₹475 vs ₹550) while providers earn stable guaranteed batch revenue.',
      metric: '₹1,425 / 3-Hr Block',
    },
    {
      title: '5. MORE INDEPENDENT PROS',
      subtitle: 'Worker Dignity & Retention',
      desc: 'Fair work distribution and 0% predatory commission attract elite master craftspeople to form cooperative guilds.',
      metric: '100% Retained Guilds',
    },
    {
      title: '6. BETTER AVAILABILITY',
      subtitle: 'Resilient Neighborhood',
      desc: 'Residents access rapid 15-minute emergency response and coordinated multi-trade renovation support.',
      metric: '< 20 Min SLA',
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveLoopIndex((prev) => (prev + 1) % loopSteps.length);
    }, 3200);
    return () => clearInterval(timer);
  }, [loopSteps.length]);

  return (
    <div className="w-full bg-[#F5F5F2] text-[#0A0A0A] font-mono-code min-h-screen py-8 px-4 sm:px-6 lg:px-8 space-y-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Editorial Header */}
        <div className="bg-[#0A0A0A] text-[#F5F5F2] border border-black p-6 sm:p-10 space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-white/10">
            <div className="space-y-1">
              <div className="text-xs uppercase tracking-widest text-[#CCFF00] font-bold flex items-center gap-2">
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>SYSTEMIC PLATFORM DYNAMICS</span>
              </div>
              <h1 className="text-3xl sm:text-5xl font-black font-display text-white uppercase tracking-tight">
                THE POSITIVE NETWORK LOOP
              </h1>
              <p className="text-xs text-white/70 font-sans max-w-2xl leading-relaxed">
                Corporate platforms exploit extractive loops (more users → higher commission fees → suppressed worker wages).
                CoServe operates on a generative municipal fly-wheel: density directly generates logistical savings that are
                reinvested back into households and independent workers.
              </p>
            </div>

            <div className="p-4 bg-white/5 border border-white/15 text-right shrink-0">
              <div className="text-[10px] text-white/40 uppercase">CIVIC FLYWHEEL</div>
              <div className="text-2xl font-black font-display text-[#CCFF00]">
                ZERO EXTRACTION
              </div>
              <div className="text-[10px] text-white/60">100% Local Capital Retained</div>
            </div>
          </div>
        </div>

        {/* FOUR PILLARS INTERCONNECTED VISUAL MESH */}
        <div className="bg-white border border-black/15 p-6 sm:p-10 space-y-8 shadow-xs">
          <div className="pb-4 border-b border-black/10">
            <div className="text-[10px] text-black/50 uppercase font-bold tracking-widest">
              FOUR-PILLAR INTEGRATION
            </div>
            <h2 className="text-2xl font-black font-display uppercase tracking-tight text-black mt-0.5">
              HOUSEHOLDS ↔ PROFESSIONALS ↔ COOPERATIVE TEAMS ↔ COMMUNITY DEMAND
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 bg-black text-white space-y-4 flex flex-col justify-between">
              <div className="space-y-2">
                <div className="w-10 h-10 bg-white/10 flex items-center justify-center text-[#CCFF00]">
                  <Home className="w-5 h-5" />
                </div>
                <div className="text-xl font-black font-display uppercase">HOUSEHOLDS</div>
                <p className="text-xs text-white/70 font-sans leading-relaxed">
                  Book verified local technicians with zero platform surcharge. Access cooperative guarantees and transparent fair pricing.
                </p>
              </div>
              <div className="pt-4 border-t border-white/10 text-[10px] text-[#CCFF00] font-bold uppercase">
                Direct Inbound Bookings
              </div>
            </div>

            <div className="p-6 bg-black text-white space-y-4 flex flex-col justify-between">
              <div className="space-y-2">
                <div className="w-10 h-10 bg-white/10 flex items-center justify-center text-[#CCFF00]">
                  <Users className="w-5 h-5" />
                </div>
                <div className="text-xl font-black font-display uppercase">LOCAL PROS</div>
                <p className="text-xs text-white/70 font-sans leading-relaxed">
                  Autonomous craftspeople owning their digital micro-business homepages, building repeat customer equity and credit scores.
                </p>
              </div>
              <div className="pt-4 border-t border-white/10 text-[10px] text-[#CCFF00] font-bold uppercase">
                Digital Micro-Businesses
              </div>
            </div>

            <div className="p-6 bg-black text-white space-y-4 flex flex-col justify-between">
              <div className="space-y-2">
                <div className="w-10 h-10 bg-white/10 flex items-center justify-center text-[#CCFF00]">
                  <Briefcase className="w-5 h-5" />
                </div>
                <div className="text-xl font-black font-display uppercase">CO-OP TEAMS</div>
                <p className="text-xs text-white/70 font-sans leading-relaxed">
                  Cross-trade guilds handling complex domestic renovations under single escrow contracts with zero contractor markup.
                </p>
              </div>
              <div className="pt-4 border-t border-white/10 text-[10px] text-[#CCFF00] font-bold uppercase">
                Multi-Trade Alliances
              </div>
            </div>

            <div className="p-6 bg-black text-white space-y-4 flex flex-col justify-between">
              <div className="space-y-2">
                <div className="w-10 h-10 bg-white/10 flex items-center justify-center text-[#CCFF00]">
                  <Layers className="w-5 h-5" />
                </div>
                <div className="text-xl font-black font-display uppercase">COMMUNITY DEMAND</div>
                <p className="text-xs text-white/70 font-sans leading-relaxed">
                  Topological clustering engine that aggregates concurrent service demand to slash transit waste and unlock community pricing.
                </p>
              </div>
              <div className="pt-4 border-t border-white/10 text-[10px] text-[#CCFF00] font-bold uppercase">
                Corridor Aggregation
              </div>
            </div>
          </div>
        </div>

        {/* CONTINUOUS ANIMATED LOOP STEPPER */}
        <div className="bg-[#0A0A0A] text-[#F5F5F2] border border-black p-6 sm:p-10 space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
            <div>
              <div className="text-[10px] text-[#CCFF00] uppercase font-bold tracking-widest">
                STEP-BY-STEP VIRTUOUS CYCLE
              </div>
              <h3 className="text-2xl font-black font-display uppercase tracking-tight text-white mt-0.5">
                CONTINUOUS VALUE MULTIPLICATION
              </h3>
            </div>
            <div className="text-xs text-white/50 font-mono-code">
              Cycle Phase: {activeLoopIndex + 1} / 6
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3">
            {loopSteps.map((step, idx) => {
              const isActive = activeLoopIndex === idx;
              return (
                <div
                  key={idx}
                  onClick={() => setActiveLoopIndex(idx)}
                  className={`p-4 border transition cursor-pointer flex flex-col justify-between space-y-3 ${
                    isActive
                      ? 'bg-white text-black border-[#CCFF00] ring-2 ring-[#CCFF00]'
                      : 'bg-white/5 text-white/60 border-white/10 hover:bg-white/10'
                  }`}
                >
                  <div className="space-y-1">
                    <div className="text-[9px] font-bold uppercase opacity-60">PHASE 0{idx + 1}</div>
                    <div className="text-xs font-black font-display uppercase tracking-tight">
                      {step.title}
                    </div>
                  </div>

                  <div className="text-[10px] font-sans opacity-80 leading-tight">
                    {step.desc}
                  </div>

                  <div className="pt-2 border-t border-current/15 text-[10px] font-bold font-mono-code text-[#CCFF00]">
                    {step.metric}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
