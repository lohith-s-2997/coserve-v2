import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Scale,
  Sparkles,
  Info,
  CheckCircle2,
  Users,
  Layers,
  ArrowRight,
  ShieldCheck,
  RotateCcw,
  Zap,
  Activity,
  Award,
} from 'lucide-react';

interface WorkerAllocation {
  id: string;
  name: string;
  trade: string;
  capacity: number;
  allocated: number;
  recentWorkload: 'Low' | 'Medium' | 'High';
  reliability: 'High' | 'Elite';
  proximityKm: number;
  color: string;
}

export const FairWorkDistributionView: React.FC = () => {
  const [isDistributing, setIsDistributing] = useState<boolean>(false);
  const [distributionComplete, setDistributionComplete] = useState<boolean>(true);
  const [whyModalOpen, setWhyModalOpen] = useState<boolean>(false);
  const [activeStep, setActiveStep] = useState<number>(15);

  const initialWorkers: WorkerAllocation[] = [
    {
      id: 'w-ravi',
      name: 'Ravi Kumar',
      trade: 'Master Electrician',
      capacity: 5,
      allocated: 5,
      recentWorkload: 'Medium',
      reliability: 'Elite',
      proximityKm: 0.6,
      color: '#CCFF00',
    },
    {
      id: 'w-kumar',
      name: 'Kumar Raj',
      trade: 'Licensed Plumber / Electric Tech',
      capacity: 4,
      allocated: 4,
      recentWorkload: 'Low',
      reliability: 'High',
      proximityKm: 0.9,
      color: '#38BDF8',
    },
    {
      id: 'w-dinesh',
      name: 'Dinesh',
      trade: 'Artisan Carpenter / Electric Tech',
      capacity: 3,
      allocated: 3,
      recentWorkload: 'Low',
      reliability: 'High',
      proximityKm: 1.2,
      color: '#F59E0B',
    },
    {
      id: 'w-manoj',
      name: 'Manoj',
      trade: 'Precision Painter / Wiring Tech',
      capacity: 3,
      allocated: 3,
      recentWorkload: 'Medium',
      reliability: 'High',
      proximityKm: 1.4,
      color: '#10B981',
    },
  ];

  const [workers, setWorkers] = useState<WorkerAllocation[]>(initialWorkers);

  const runDistributionAnimation = () => {
    setIsDistributing(true);
    setDistributionComplete(false);
    setActiveStep(0);
    setWorkers(initialWorkers.map((w) => ({ ...w, allocated: 0 })));

    let current = 0;
    const interval = setInterval(() => {
      current += 1;
      setActiveStep(current);

      setWorkers((prev) => {
        // Sequentially route 15 requests
        // 1-5 to Ravi
        // 6-9 to Kumar
        // 10-12 to Dinesh
        // 13-15 to Manoj
        return prev.map((w) => {
          if (w.id === 'w-ravi') return { ...w, allocated: Math.min(5, current) };
          if (w.id === 'w-kumar') return { ...w, allocated: Math.min(4, Math.max(0, current - 5)) };
          if (w.id === 'w-dinesh') return { ...w, allocated: Math.min(3, Math.max(0, current - 9)) };
          if (w.id === 'w-manoj') return { ...w, allocated: Math.min(3, Math.max(0, current - 12)) };
          return w;
        });
      });

      if (current >= 15) {
        clearInterval(interval);
        setIsDistributing(false);
        setDistributionComplete(true);
      }
    }, 160);
  };

  return (
    <div className="w-full bg-[#F5F5F2] text-[#0A0A0A] font-mono-code min-h-screen py-8 px-4 sm:px-6 lg:px-8 space-y-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Editorial Header */}
        <div className="bg-[#0A0A0A] text-[#F5F5F2] border border-black p-6 sm:p-10 space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-white/10">
            <div className="space-y-1">
              <div className="text-xs uppercase tracking-widest text-[#CCFF00] font-bold flex items-center gap-2">
                <Scale className="w-4 h-4" />
                <span>DEMOCRATIC DISPATCH MATHEMATICS</span>
              </div>
              <h1 className="text-3xl sm:text-5xl font-black font-display text-white uppercase tracking-tight">
                FAIR WORK DISTRIBUTION
              </h1>
              <p className="text-xs text-white/70 font-sans max-w-2xl leading-relaxed">
                Corporate gig algorithms concentrate 90% of requests onto the top 1% rated workers, burning them out
                while starving qualified local peers. CoServe uses capacity-balanced multi-factor fairness:
                availability, proximity, reliability, and anti-monopoly opportunity equilibrium.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
              <button
                type="button"
                onClick={runDistributionAnimation}
                disabled={isDistributing}
                className="px-5 py-3.5 bg-[#CCFF00] hover:bg-[#D4FF00] text-black font-bold text-xs uppercase tracking-wider transition flex items-center justify-center gap-2"
              >
                <RotateCcw className={`w-4 h-4 ${isDistributing ? 'animate-spin' : ''}`} />
                <span>{isDistributing ? 'DISPATCHING 15 REQUESTS...' : 'REPLAY FAIR DISPATCH'}</span>
              </button>

              <button
                type="button"
                onClick={() => setWhyModalOpen(true)}
                className="px-5 py-3.5 bg-white/10 hover:bg-white/20 text-white font-bold text-xs uppercase tracking-wider transition flex items-center justify-center gap-2 border border-white/20"
              >
                <Info className="w-4 h-4 text-[#CCFF00]" />
                <span>WHY THIS DISTRIBUTION?</span>
              </button>
            </div>
          </div>

          {/* Scenario Clarification Notice */}
          <div className="p-4 bg-white/5 border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs font-sans">
            <div className="text-white/80">
              <span className="font-bold text-[#CCFF00] font-mono-code uppercase mr-2">LIVE SCENARIO:</span>
              15 Concurrent Domestic Electrical Requests routed across 4 verified cooperative professionals.
            </div>
            <div className="text-white/50 text-[10px] font-mono-code shrink-0">
              * Does NOT blindly equalize income. Maximizes capacity and service reliability.
            </div>
          </div>
        </div>

        {/* INTERACTIVE ANIMATED FLOW CANVAS */}
        <div className="bg-white border border-black/15 p-6 sm:p-10 space-y-8 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-black/10">
            <div>
              <div className="text-[10px] text-black/50 uppercase font-bold tracking-widest">
                STREAM DISPATCH PIPELINE
              </div>
              <h2 className="text-xl sm:text-2xl font-black font-display uppercase tracking-tight text-black">
                15 REQUESTS → 4 COOPERATIVE PROFESSIONALS
              </h2>
            </div>

            <div className="flex items-center gap-4 text-xs">
              <span className="text-black/60">
                Routed: <span className="font-black text-black text-base">{activeStep} / 15</span>
              </span>
              <span className="px-2.5 py-1 bg-black text-white text-[10px] font-bold uppercase">
                {distributionComplete ? '100% BALANCED' : 'IN STREAM'}
              </span>
            </div>
          </div>

          {/* Node Flow Canvas */}
          <div className="relative w-full min-h-[380px] bg-[#0A0A0A] border border-black p-6 sm:p-10 flex flex-col lg:flex-row items-center justify-between gap-8 overflow-hidden">
            {/* Background mesh */}
            <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:20px_20px]" />

            {/* Source Ingestion Pool (Left) */}
            <div className="z-10 w-full lg:w-1/3 bg-white/5 border border-white/15 p-6 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <div className="text-xs uppercase font-bold text-white flex items-center gap-2">
                  <Activity className="w-4 h-4 text-[#CCFF00]" />
                  <span>DEMAND INGESTION POOL</span>
                </div>
                <span className="text-[10px] text-[#CCFF00] font-mono-code font-bold">15 INCOMING</span>
              </div>

              <div className="grid grid-cols-5 gap-2">
                {Array.from({ length: 15 }).map((_, i) => {
                  const isProcessed = i < activeStep;
                  return (
                    <motion.div
                      key={i}
                      animate={{
                        scale: isProcessed ? 0.9 : 1,
                        opacity: isProcessed ? 0.35 : 1,
                      }}
                      className={`h-8 rounded-none flex items-center justify-center text-[10px] font-bold border transition ${
                        isProcessed
                          ? 'bg-white/10 border-white/20 text-white/40 line-through'
                          : 'bg-[#CCFF00] border-[#CCFF00] text-black shadow-xs'
                      }`}
                    >
                      #{i + 1}
                    </motion.div>
                  );
                })}
              </div>

              <div className="text-[10px] text-white/50 font-sans leading-relaxed pt-2">
                Incoming calls from Ward 102 corridor. Normalized by verified electrical trade criteria.
              </div>
            </div>

            {/* Central Mathematical Filter / Router Engine (Center) */}
            <div className="z-10 flex flex-col items-center justify-center text-center space-y-2 py-4">
              <div className="w-16 h-16 rounded-full bg-[#0A0A0A] border-2 border-[#CCFF00] flex items-center justify-center text-[#CCFF00] shadow-[0_0_20px_rgba(204,255,0,0.2)]">
                <Scale className="w-8 h-8 animate-pulse" />
              </div>
              <div className="text-xs font-bold text-white uppercase tracking-wider">FAIRMATCH MATRIX</div>
              <div className="text-[10px] text-[#CCFF00] font-mono-code">Capacity × Workload × Proximity</div>
            </div>

            {/* Worker Nodes Pool (Right) */}
            <div className="z-10 w-full lg:w-1/2 space-y-3">
              {workers.map((w) => {
                const percent = (w.allocated / w.capacity) * 100;
                return (
                  <div
                    key={w.id}
                    className="p-4 bg-white/5 border border-white/15 space-y-2 hover:bg-white/10 transition"
                  >
                    <div className="flex items-center justify-between text-xs">
                      <div>
                        <span className="font-bold text-white text-sm uppercase">{w.name}</span>
                        <span className="text-[10px] text-white/60 ml-2 font-mono-code font-normal">
                          ({w.trade.split('/')[0]})
                        </span>
                      </div>
                      <div className="font-mono-code text-right">
                        <span className="text-lg font-black text-[#CCFF00]">{w.allocated}</span>
                        <span className="text-white/40 text-xs"> / {w.capacity} cap</span>
                      </div>
                    </div>

                    {/* Progress Fill */}
                    <div className="w-full h-2 bg-white/10 overflow-hidden">
                      <motion.div
                        className="h-full bg-[#CCFF00]"
                        initial={{ width: 0 }}
                        animate={{ width: `${percent}%` }}
                        transition={{ duration: 0.3 }}
                      />
                    </div>

                    <div className="flex items-center justify-between text-[10px] text-white/50 pt-1">
                      <span>Recent Load: <strong className="text-white">{w.recentWorkload}</strong></span>
                      <span>Reliability: <strong className="text-white">{w.reliability}</strong></span>
                      <span>Proximity: <strong className="text-white">{w.proximityKm} km</strong></span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Allocation Breakdown Table */}
          <div className="overflow-x-auto pt-4">
            <table className="w-full min-w-[640px] text-left text-xs border border-black/10">
              <thead className="bg-black text-white uppercase text-[10px] tracking-wider">
                <tr>
                  <th className="p-3">Professional</th>
                  <th className="p-3">Trade Specialization</th>
                  <th className="p-3">Recent Workload</th>
                  <th className="p-3">Max Capacity</th>
                  <th className="p-3">Allocated Jobs</th>
                  <th className="p-3">Allocation Rationale</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-black/10">
                <tr className="hover:bg-black/5">
                  <td className="p-3 font-bold text-black">Ravi Kumar</td>
                  <td className="p-3 text-black/70">Master Electrician</td>
                  <td className="p-3">Medium</td>
                  <td className="p-3 font-bold">5</td>
                  <td className="p-3 font-black text-emerald-700 text-sm">5 (100%)</td>
                  <td className="p-3 text-black/60 font-sans">
                    Highest historical rating; capped at 5 to prevent overload.
                  </td>
                </tr>
                <tr className="hover:bg-black/5">
                  <td className="p-3 font-bold text-black">Kumar Raj</td>
                  <td className="p-3 text-black/70">Licensed Plumber / Electric Tech</td>
                  <td className="p-3">Low</td>
                  <td className="p-3 font-bold">4</td>
                  <td className="p-3 font-black text-emerald-700 text-sm">4 (100%)</td>
                  <td className="p-3 text-black/60 font-sans">
                    Lower recent weekly load prioritized to prevent market starvation.
                  </td>
                </tr>
                <tr className="hover:bg-black/5">
                  <td className="p-3 font-bold text-black">Dinesh</td>
                  <td className="p-3 text-black/70">Artisan Carpenter / Electric Tech</td>
                  <td className="p-3">Low</td>
                  <td className="p-3 font-bold">3</td>
                  <td className="p-3 font-black text-emerald-700 text-sm">3 (100%)</td>
                  <td className="p-3 text-black/60 font-sans">
                    Full trade verification; routed according to 3-job morning schedule limit.
                  </td>
                </tr>
                <tr className="hover:bg-black/5">
                  <td className="p-3 font-bold text-black">Manoj</td>
                  <td className="p-3 text-black/70">Precision Painter / Wiring Tech</td>
                  <td className="p-3">Medium</td>
                  <td className="p-3 font-bold">3</td>
                  <td className="p-3 font-black text-emerald-700 text-sm">3 (100%)</td>
                  <td className="p-3 text-black/60 font-sans">
                    Balances geographic quadrant with zero duplicate travel overlap.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* WHY THIS DISTRIBUTION MODAL */}
        <AnimatePresence>
          {whyModalOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs font-mono-code">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-[#0A0A0A] text-[#F5F5F2] border border-[#CCFF00] w-full max-w-2xl max-h-[90vh] overflow-y-auto p-4 sm:p-10 space-y-6 shadow-2xl"
              >
                <div className="flex items-center justify-between border-b border-white/15 pb-4">
                  <div className="space-y-1">
                    <div className="text-[10px] text-[#CCFF00] font-bold uppercase">
                      ALGORITHMIC EXPLAINABILITY AUDIT
                    </div>
                    <h3 className="text-2xl font-black font-display uppercase text-white">
                      WHY THIS WORK DISTRIBUTION?
                    </h3>
                  </div>
                  <button
                    type="button"
                    onClick={() => setWhyModalOpen(false)}
                    className="text-white/40 hover:text-white text-xs uppercase"
                  >
                    Close
                  </button>
                </div>

                <div className="space-y-4 text-xs font-sans leading-relaxed text-white/80">
                  <div className="p-4 bg-white/5 border border-white/10 space-y-2">
                    <div className="font-bold text-[#CCFF00] font-mono-code uppercase text-[11px]">
                      Why did Kumar Raj & Dinesh receive allocations?
                    </div>
                    <p>
                      In corporate algorithmic marketplaces, a winner-take-all feedback loop traps the ecosystem:
                      the top 2% of reviewed workers capture all new inquiries. As a result, competent, certified
                      craftspeople who joined later or had lower recent volumes are permanently starved of work.
                    </p>
                    <p>
                      CoServe solves this by setting <strong>hard capacity ceilings</strong> for top providers (Ravi was capped at 5)
                      and introducing <strong>opportunity re-balancing</strong> for high-reliability providers with lower recent load.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                    <div className="p-4 bg-white/5 border border-white/10 space-y-1">
                      <div className="font-bold text-white uppercase text-[11px] font-mono-code">
                        1. Anti-Burnout Ceilings
                      </div>
                      <p className="text-white/60 text-xs">
                        Ravi cannot receive 15 requests in one day. Excessive volume creates delayed arrivals and degraded craftsmanship.
                      </p>
                    </div>

                    <div className="p-4 bg-white/5 border border-white/10 space-y-1">
                      <div className="font-bold text-white uppercase text-[11px] font-mono-code">
                        2. Democratic Sustainability
                      </div>
                      <p className="text-white/60 text-xs">
                        All 4 professionals remain active, solvent, and cooperative contributors in the neighbourhood service zone.
                      </p>
                    </div>
                  </div>

                  <div className="p-3 bg-[#CCFF00]/10 border border-[#CCFF00]/30 text-[#CCFF00] font-mono-code text-[11px] font-bold">
                    FairMatch is transparent, open to civic inspection, and auditable by local cooperative boards.
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => setWhyModalOpen(false)}
                    className="w-full py-3 bg-[#CCFF00] text-black font-bold text-xs uppercase tracking-wider hover:bg-[#D4FF00] transition"
                  >
                    UNDERSTOOD
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
